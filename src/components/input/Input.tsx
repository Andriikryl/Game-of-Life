import React from "react";
import styles from "./style.module.css";

type InputProps = {
  label: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputElement["type"];
  variant?: "inline" | "block";
  [key: string]: unknown;
};

export function Input({
  label,
  value,
  onChange,
  type = "text",
  variant = "inline",
  ...rest
}: InputProps) {
  return (
    <label className={styles.label} htmlFor={label}>
      <span className={styles.label__name}>{label}</span>
      <input
        className={styles.input}
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </label>
  );
}

export const useInput = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return [value, onChange, setValue] as const;
};

export const useNumberInput = (initialValue: string | number) => {
  const [value, setValue] = React.useState(Number(initialValue));

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
    },
    []
  );

  return [value, onChange, setValue] as const;
};
