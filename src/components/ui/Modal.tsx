import React from "react";

import Card from "./Card";
import Button from "./Button";
import styles from "./Modal.module.css";

interface ModalProps {
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  noActions?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div>
      <div className={styles.backdrop} onClick={props.onConfirm} />
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <div> {props.children}</div>
        </div>
        {!props.noActions && (
          <footer className={styles.actions}>
            <Button onClick={props.onConfirm}>Okay</Button>
          </footer>
        )}
      </Card>
    </div>
  );
};

export default Modal;
