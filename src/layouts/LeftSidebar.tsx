import { Outlet } from "react-router-dom";
import styles from "./LeftSidebar.module.css";

const LeftSidebar = () => {
  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}></aside>
      <section className={styles.main}>
        <Outlet />
      </section>
    </main>
  );
};

export default LeftSidebar;
