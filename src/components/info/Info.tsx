import React from "react";
import styles from "./style.module.css";
import clsx from "clsx";
import Cell, { CellType } from "../cell/Cell";
import Arrow from "@/icons/Arrow";
import {
  aliveCell,
  deadCell,
  fourAliveCell,
  oneAliveCell,
  overCrowding,
  threeAlive,
  threeAliveNeighbors,
  threeAliveY,
} from "@/app/data/info";

export default function Info() {
  return (
    <div className={clsx(styles.info__wrapper, styles.flow)}>
      <h1 className={clsx(styles.title)}>What is Game of Life?</h1>
      <p className={clsx(styles.description)}>
        Game of Life is a cellular automaton invented by British mathematician
        John Horton Conway in 1970. It consists of a 2-dimensional grid of
        cells, each having an alive or dead (or on or off) state. An initial
        state of the grid can be selected by assigning a state to each cell. New
        generations of cells can then be created based on the state of the
        current cells and their neighbouring cells with some dead simple rules.
        It is a zero-player game, which means that its evolution is determined
        by just its initial state, requiring no further input.
      </p>
      <h2 className={styles.sub__title}>Rules</h2>
      <p className={clsx(styles.description)}>
        It has 3 pretty straightforward rules, which dictate the evolution of
        one generation of cells to another. But before we dive into the rules,
        let is look at some basic terminology that would be required for
        understanding the rules.
      </p>
      <ul role="list" className={styles.list}>
        <li className={clsx(styles.list__item, styles.item__flow)}>
          <Cell cellType={"alive"} />
          <h3 className={styles.item__tilte}>Alive cell</h3>
          <p className={styles.item__description}>
            A cell with tomato background is considered alive
          </p>
        </li>
        <li className={clsx(styles.list__item, styles.item__flow)}>
          <Cell cellType={"dead"} />
          <h3 className={styles.item__tilte}>Dead cell</h3>
          <p className={styles.item__description}>
            A cell with white background is considered dead
          </p>
        </li>
        <li className={clsx(styles.list__item, styles.item__flow)}>
          <div className={styles.neighbours__wrapper}>
            <Cell cellType={"dead"} />
            <Cell cellType={"dead"} />
            <Cell cellType={"dead"} />
            <Cell cellType={"dead"} />
            <Cell cellType={"alive"} />
            <Cell cellType={"dead"} />
            <Cell cellType={"dead"} />
            <Cell cellType={"dead"} />
            <Cell cellType={"dead"} />
          </div>
          <h3 className={styles.item__tilte}>Cell neighbours</h3>
          <p className={styles.item__description}>
            The 8 cells surrounding a cell are called its neighbours
          </p>
        </li>
      </ul>
      <p className={styles.description}>
        Here are the rules for going from one generation to the next:
      </p>
      <p className={styles.description}>
        1. A dead cell with exactly three alive neighbors becomes alive.
      </p>
      <div className={styles.flex__group}>
        <div className={styles.neighbours__wrapper}>
          {deadCell.map((cell, index) => {
            return (
              <Cell
                key={index}
                cellType={cell.cellType as CellType}
                activeCell={cell.activeCell}
              />
            );
          })}
        </div>
        <Arrow />
        <div className={styles.neighbours__wrapper}>
          {threeAliveNeighbors.map((cell, index) => {
            return (
              <Cell
                key={index}
                cellType={cell.cellType as CellType}
                activeCell={cell.activeCell}
              />
            );
          })}
        </div>
      </div>
      <p className={styles.description}>
        2. An alive cell with zero or one alive neighbor dies as if by
        underpopulation, and an alive cell with four or more alive neighbors
        dies as by overcrowding.
      </p>
      <div className={styles.flex__group}>
        <div className={styles.neighbours__wrapper}>
          {aliveCell.map((cell, index) => {
            return (
              <Cell
                key={index}
                cellType={cell.cellType as CellType}
                activeCell={cell.activeCell}
              />
            );
          })}
        </div>
        <Arrow />
        <div className={styles.neighbours__wrapper}>
          {oneAliveCell.map((cell, index) => {
            return (
              <Cell
                key={index}
                cellType={cell.cellType as CellType}
                activeCell={cell.activeCell}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.flex__group}>
        <div className={styles.neighbours__wrapper}>
          {fourAliveCell.map((cell, index) => {
            return (
              <Cell
                key={index}
                cellType={cell.cellType as CellType}
                activeCell={cell.activeCell}
              />
            );
          })}
        </div>
        <Arrow />
        <div className={styles.neighbours__wrapper}>
          {overCrowding.map((cell, index) => {
            return (
              <Cell
                key={index}
                cellType={cell.cellType as CellType}
                activeCell={cell.activeCell}
              />
            );
          })}
        </div>
      </div>
      <p className={styles.description}>
        3. An alive cell with two or three alive neighbors continues to live.
      </p>
      <div className={styles.flex__group}>
        <div className={styles.neighbours__wrapper}>
          {threeAlive.map((cell, index) => {
            return (
              <Cell
                key={index}
                cellType={cell.cellType as CellType}
                activeCell={cell.activeCell}
              />
            );
          })}
        </div>
        <Arrow />
        <div className={styles.neighbours__wrapper}>
          {threeAliveY.map((cell, index) => {
            return (
              <Cell
                key={index}
                cellType={cell.cellType as CellType}
                activeCell={cell.activeCell}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
