import React from "react";
import { Outlet } from "react-router-dom";
import HeaderWMenu from "../components/ui/HeaderWMenu";
import styles from './NoSidebar.module.css';

const NoWidthLayout: React.FC = () => {
  return (
    <>
      <HeaderWMenu />
      <main className={`container ${styles.main}`}>
        <Outlet />
      </main>
    </>
  );
};

export default NoWidthLayout;
