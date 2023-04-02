import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import useReqres from "../hooks/useReqres";
import useFetch from "../hooks/useFetch";
import Loader from "../components/ui/Loader";
import Modal from "../components/ui/Modal";
import styles from "./Users.module.css";
import UserCard from "../components/users/UserCard";
import AddUserButton from "../components/icons/AddUser";
import { User } from "../types";

const AddUserForm = lazy(() => import("../components/users/AddUserForm"));

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isInfoModal, setIsInfoModal] = useState(false);
  const [isUserModal, setIsUserModal] = useState(false);
  const { deleteItem } = useFetch("https://reqres.in");
  const { isLoading, fetchData, status, responseData } = useReqres();

  useEffect(() => {
    if (status === "idle") {
      fetchData("/api/users");
    }
  }, [status, fetchData]);

  useEffect(() => {
    if (status === "succeed" && responseData?.data) {
      setUsers(responseData?.data);
    }
  }, [status, responseData]);

  const deleteHandler = useCallback(
    (id: number) => {
      deleteItem(`/api/users/${id}`)
        .then((response) => {
          if (response === "deleted") {
            setUsers((prevUsers) => {
              return prevUsers.filter((user) => user.id !== id);
            });
          }
        })
        .catch((error) => {
          setIsInfoModal(true);
          console.log(error);
        });
    },
    [deleteItem]
  );

  const modalHandler = useCallback(() => {
    setIsInfoModal(false);
    setIsUserModal(false);
  }, []);

  const addUserModalHandler = useCallback(() => {
    setIsUserModal(true);
  }, []);

  const addUserHandler = useCallback((user: User) => {
    setUsers((prevUsers) => {
      return [user, ...prevUsers];
    });
    setIsUserModal(false);
  }, []);

  if (isLoading) {
    return (
      <div className={styles["loader-container"]} key="loader">
        <Loader />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <>
        <h1>Opps! Somthing went wrong</h1>
        <h3>
          {responseData?.error ||
            "Failed to fetch data! Try again in a few seconds."}
        </h3>
      </>
    );
  }

  return (
    <>
      {isInfoModal && (
        <Modal title={"Oops"} onConfirm={modalHandler}>
          {"Something went wrong! Could not delete user."}
        </Modal>
      )}
      <AddUserButton onAddUser={addUserModalHandler} />
      {isUserModal && (
        <Modal title={"Add new user"} onConfirm={modalHandler} noActions>
          <Suspense fallback={<Loader />}>
            <AddUserForm onAddUser={addUserHandler} />
          </Suspense>
        </Modal>
      )}
      {status === "succeed" && users.length === 0 && (
        <h1>Your list of users is empty, add new users.</h1>
      )}
      {users.map((user) => {
        return <UserCard key={user.id} user={user} onDelete={deleteHandler} />;
      })}
    </>
  );
};

export default Users;
