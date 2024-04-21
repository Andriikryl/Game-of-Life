import React from "react";
import styles from "./style.module.css";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: HTMLButtonElement["type"];
  value?: string;
  id?: string;
}

export function Button({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  value,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.butoon, className)}
      disabled={disabled}
      type={type}
      onClick={onClick}
      value={value}
      {...rest}
    >
      {children}
    </button>
  );
}
