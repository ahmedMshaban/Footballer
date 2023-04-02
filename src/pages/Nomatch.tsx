import React from "react";
import styles from "./Nomatch.module.css";

const Error: React.FC = () => {
  return (
    <div className={styles.error}>
      <h1>Oops! 404</h1>
      <p>Page not found</p>
    </div>
  );
};

export default Error;
