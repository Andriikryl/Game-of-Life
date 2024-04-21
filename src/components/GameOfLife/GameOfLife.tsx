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
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Question from "@/icons/Question";

export default function GameOfLife() {
  const simRef = React.useRef(createSim());
  const [grid, setGrid] = React.useState(simRef.current.getState());
  const [gameState, setGameState] = React.useState("paused");
  const [interval, setNewInterval] = React.useState(150);
  const [isOpen, handlers] = useBool(false);

  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#filde",
        popover: {
          title: "Game filde",
          description: "This is where your game will take place",
        },
      },
      {
        element: "#cell",
        popover: {
          title: "Game cell",
          description: "This is a game cage that can take one of two positions",
        },
      },
      {
        element: ".play",
        popover: {
          title: "Play button",
          description: "Сlick on it to start the game.",
        },
      },
      {
        element: ".randomize",
        popover: {
          title: "Randomize button",
          description:
            "Сlick on it to generate a random position of squares on the board",
        },
      },
      {
        element: ".refresh",
        popover: {
          title: "Refresh button",
          description:
            "Сlick on it to update or reset the current position of cells on the board",
        },
      },
      {
        element: ".info",
        popover: {
          title: "Info button",
          description:
            "Сlick on it to get information about the rules of the game",
        },
      },
      {
        element: ".input",
        popover: {
          title: "Interval controler",
          description: "Here you can set the speed of the game",
        },
      },
    ],
  });

  const handleCellClickQaf = () => {
    driverObj.drive();
  };

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
      <div className={clsx(styles.game__filde)} id="filde">
        <div>
          {grid.map((row, rowIdx) => (
            <div className={styles.cell} key={rowIdx}>
              {row.map((cellState, colIdx) => (
                <button
                  id="cell"
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
        <Button onClick={handleGameToggle} className="play">
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
        <Button onClick={randomizeCells} className="randomize">
          <>
            <VisuallyHidden>Randomize</VisuallyHidden>
            <Refrash />
          </>
        </Button>
        <Button onClick={resetSim} className="refresh">
          <>
            <VisuallyHidden>refresh</VisuallyHidden>
            <Reloade />
          </>
        </Button>
        <Button onClick={handlers.toggle} className="info">
          <>
            <VisuallyHidden>Info</VisuallyHidden>
            <Description />
          </>
        </Button>
        <Button onClick={handleCellClickQaf}>
          <>
            <VisuallyHidden>How it work?</VisuallyHidden>
            <Question />
          </>
        </Button>
        <div className="input">
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
