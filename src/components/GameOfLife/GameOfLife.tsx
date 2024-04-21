"use client";
import React from "react";
import { Button } from "../button/Button";
import styles from "./style.module.css";
import clsx from "clsx";
import { Input } from "../input/Input";
import { createSim } from "@/game-logic/createSim";
import { DragModal } from "../dragModal/DragModal";
import useBool from "@/hooks/useBool";
import VisuallyHidden from "../visuallyHidden/VisuallyHidden";
import Refrash from "@/icons/Refrash";
import Reloade from "@/icons/Reloade";
import Play from "@/icons/Play";
import Pause from "@/icons/Pause";
import Description from "@/icons/Description";
import Info from "../info/Info";

export default function GameOfLife() {
  const simRef = React.useRef(createSim());
  const [grid, setGrid] = React.useState(simRef.current.getState());
  const [gameState, setGameState] = React.useState("paused");
  const [interval, setNewInterval] = React.useState(150);
  const [isOpen, handlers] = useBool(false);

  React.useEffect(() => {
    if (gameState === "paused") return;

    const intervalId = setInterval(() => {
      setGrid(simRef.current.tick().getState());
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameState, interval]);

  const handleCellClick = React.useCallback(
    (rowIdx: number, colIdx: number) => () => {
      setGrid(simRef.current.toggleCell(rowIdx, colIdx).getState());
    },
    []
  );
  const handleGameToggle = React.useCallback(() => {
    setGameState((s) => (s === "paused" ? "running" : "paused"));
  }, []);

  const randomizeCells = React.useCallback(() => {
    setGrid(simRef.current.randomize().getState());
  }, []);

  const resetSim = React.useCallback(() => {
    simRef.current = createSim();
    setGrid(simRef.current.getState());
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Game of Life</h1>
      <div className={styles.game__filde}>
        <div>
          {grid.map((row, rowIdx) => (
            <div className={styles.cell} key={rowIdx}>
              {row.map((cellState, colIdx) => (
                <button
                  key={colIdx}
                  onClick={handleCellClick(rowIdx, colIdx)}
                  className={clsx(styles.cell__control, {
                    [styles.bgAccent]: cellState,
                    [styles.bgGray300]: !cellState,
                  })}
                  type="button"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.control__group}>
        <Button onClick={handleGameToggle}>
          {gameState === "paused" ? (
            <>
              <VisuallyHidden>Play</VisuallyHidden>
              <Play />
            </>
          ) : (
            <>
              <VisuallyHidden>Stop</VisuallyHidden>
              <Pause />
            </>
          )}
        </Button>
        <Button onClick={randomizeCells}>
          <>
            <VisuallyHidden>Randomize</VisuallyHidden>
            <Refrash />
          </>
        </Button>
        <Button onClick={resetSim}>
          <>
            <VisuallyHidden>refresh</VisuallyHidden>
            <Reloade />
          </>
        </Button>
        <Button onClick={handlers.toggle}>
          <>
            <VisuallyHidden>Info</VisuallyHidden>
            <Description />
          </>
        </Button>
        <div>
          <Input
            label="interval"
            value={interval}
            onChange={(e) => setNewInterval(Number(e.target.value))}
            type="number"
          />
        </div>
      </div>
      <DragModal open={isOpen} setOpen={handlers.toggle}>
        <Info />
      </DragModal>
    </div>
  );
}
