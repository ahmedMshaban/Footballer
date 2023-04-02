import React from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={styles.button}
      type={props.type || "button"}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
