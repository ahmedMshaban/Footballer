import React from "react";
import styles from "./CenteredHeader.module.css";

const logo = require("../../assets/images/logo.png");

const Header: React.FC = () => {
  return (
    <header>
      <img src={logo} alt="Footballer logo" className={styles.logo} />
    </header>
  );
};

export default Header;
