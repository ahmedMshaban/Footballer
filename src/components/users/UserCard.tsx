import React, { memo } from "react";
import { User } from "../../types";
import styles from "./UserCard.module.css";
import DeleteUser from "../icons/DeleteUser";

interface UserProps {
  user: User;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserProps> = ({ user, onDelete }) => {
  return (
    <div className={styles.container}>
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className={styles.image}
      />
      <div className={styles.info}>
        <p>{`${user.first_name} ${user.last_name}`}</p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>
      <div className={styles.actions}>
        <button onClick={() => onDelete(user.id)}>
          <DeleteUser />
        </button>
      </div>
    </div>
  );
};

export default memo(UserCard);
