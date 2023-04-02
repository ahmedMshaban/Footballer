import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import useFetch from "../../hooks/useFetch";
import Modal from "../../components/ui/Modal";

const Menu: React.FC = () => {
  const [isModal, setIsModal] = useState(false);
  const { post } = useFetch("https://reqres.in");

  const navigate = useNavigate();

  const logoutHandler = () => {
    post("/api/logout", {})
      .then(() => {
        localStorage.removeItem("userToekn");
        navigate("/login");
      })
      .catch((error) => {
        setIsModal(true);
        console.log(error);
      });
  };

  const modalHandler = () => {
    setIsModal(false);
  };

  return (
    <>
      {isModal && (
        <Modal title={"Oops"} onConfirm={modalHandler}>
          <p>Something went wrong!</p>
        </Modal>
      )}{" "}
      <nav className={styles.navigation}>
        <Button onClick={logoutHandler}>Log out</Button>
      </nav>
    </>
  );
};

export default Menu;
