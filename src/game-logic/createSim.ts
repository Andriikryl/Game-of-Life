import { randomBool } from "@/utils/utils";

export function createSim() {
    let state = Array(10)
      .fill(undefined)
      .map(() => Array(10).fill(false));
  
    function getNumberOfNeighbors(rowIdx: number, colIdx: number) {
      const neighborIndices = [
        [rowIdx - 1, colIdx - 1],
        [rowIdx - 1, colIdx],
        [rowIdx - 1, colIdx + 1],
        [rowIdx, colIdx - 1],
        [rowIdx, colIdx + 1],
        [rowIdx + 1, colIdx - 1],
        [rowIdx + 1, colIdx],
        [rowIdx + 1, colIdx + 1],
      ];
  
      const neighbors = neighborIndices
        .map(([row, col]) => state?.[row]?.[col])
        .filter(Boolean);
  
      return neighbors.length;
    }
  
    return {
      tick() {
        const nextState = state.map((row, rowIdx) =>
          row.map((cellState, colIdx) => {
            const neighbors = getNumberOfNeighbors(rowIdx, colIdx);
  
            if (!cellState) return neighbors === 3;
  
            switch (neighbors) {
              case 2:
              case 3:
                return true;
              default:
                return false;
            }
          })
        );
        state = nextState;
        return this;
      },
      toggleCell(rowIdx: number, colIdx: number) {
        state[rowIdx][colIdx] = !state[rowIdx][colIdx];
        state = state.map((row) => row.map((x) => x));
        return this;
      },
      randomize() {
        const nextState = state.map((row) => row.map(randomBool));
        state = nextState;
        return this;
      },
      getState() {
        return state;
      },
    };
  }