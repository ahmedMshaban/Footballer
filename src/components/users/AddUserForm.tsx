import React, { useState } from "react";
import Button from "../../components/ui/Button";
import useFetch from "../../hooks/useFetch";
import styles from "./AddUserForm.module.css";
import { User } from "../../types";

interface AddUserResponse {
  createdAt?: string;
  id: number;
}

interface AddUserFormProps {
  onAddUser: (user: User) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const { post, loading } = useFetch("https://reqres.in");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const target = e.target as typeof e.target & {
      email: { value: string };
      firstName: { value: string };
      lastName: { value: string };
      avatar: { value: string };
    };

    const email = target.email.value;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const avatar = target.avatar.value;

    if (!(firstName && lastName && avatar && email)) return;

    post<AddUserResponse>("/api/users", {
      name: `${firstName} ${lastName}`,
      job: "Footballer",
    })
      .then((response) => {
        if (response?.createdAt) {
          onAddUser({
            avatar,
            email,
            first_name: firstName,
            last_name: lastName,
            id: response.id,
          });
        }
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    console.log(name, value);
    if (name === "email") setEmail(value);
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "avatar") setAvatar(value);
  };

  return (
    <>
      <form name="form" className={styles.form} onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={changeHandler}
            disabled={loading}
          />
          {isSubmitted && !firstName && (
            <div className="error-block firstName">First Name is required.</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={changeHandler}
            disabled={loading}
          />
          {isSubmitted && !lastName && (
            <div className="error-block lastName">Last Name is required.</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Your email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
          />
          {isSubmitted && !email && (
            <div className="error-block">
              Please enter a valid email address
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar Url</label>
          <input
            type="text"
            name="avatar"
            value={avatar}
            onChange={changeHandler}
            disabled={loading}
            placeholder="https://example.com/mypic.jpg"
          />
          {isSubmitted && !avatar && (
            <div className="error-block avatar">Avatar is required.</div>
          )}
        </div>
        <div className="form-group">
          <Button aria-label="Add user" type="submit" disabled={loading}>
            {loading ? <>loading ...</> : "Add User"}
          </Button>
        </div>
      </form>
      {isError &&
        "Something went wrong! Please try again later. If the problem persists, please contact us."}
    </>
  );
};

export default AddUserForm;
