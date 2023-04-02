import React from "react";
import Menu from "./Menu";
import styles from "./HeaderWMenu.module.css";

const logo = require("../../assets/images/logo.png");

const HeaderWMenu: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.wrapper}`}>
        <img src={logo} alt="Footballer logo" className={styles.logo} />
        <Menu />
      </div>
    </header>
  );
};

export default HeaderWMenu;
