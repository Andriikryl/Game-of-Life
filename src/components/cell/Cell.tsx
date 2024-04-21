import React from "react";
import styles from "./style.module.css";
import clsx from "clsx";

export type CellType = "alive" | "dead";
type ActiveCell = true | false;

export default function Cell({
  cellType,
  activeCell,
}: {
  cellType: CellType;
  activeCell?: ActiveCell;
}) {
  return (
    <div
      className={clsx(styles.cell, {
        [styles.alive]: cellType === "alive",
        [styles.dead]: cellType === "dead",
        [styles.active]: activeCell === true,
      })}
    ></div>
  );
}
