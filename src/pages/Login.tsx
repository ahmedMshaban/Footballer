import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import Header from "../components/ui/CenteredHeader";
import useReqres from "../hooks/useReqres";
import styles from "./Logins.module.css";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { isLoading, fetchData, status, responseData } = useReqres();
  const navigate = useNavigate();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    if (!(email && password)) return;

    fetchData("/api/login", email, password);
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const modalHandler = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (status === "succeed" && responseData?.token) {
      localStorage.setItem("userToekn", responseData.token);
      navigate("/");
    } else if (status === "failed") {
      setIsModal(true);
    }
  }, [navigate, status, responseData]);

  if (localStorage.getItem("userToekn")) {
    return <Navigate to="/users" replace />;
  }

  return (
    <div className={styles.container}>
      {isModal && (
        <Modal title={"Oops"} onConfirm={modalHandler}>
          {responseData?.error || "Something went wrong!"}
        </Modal>
      )}
      <Header />
      <div>
        <h1 className={styles.title}>Welcome Back.</h1>
        <p>
          New to Footballer?
          <Link to="/signup" className={styles["inline-link"]}>
            Sign up
          </Link>
        </p>
      </div>
      <form name="form" onSubmit={submitHandler}>
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
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
          />
          {isSubmitted && !password && (
            <div className="error-block">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <Button aria-label="Log in" type="submit" disabled={isLoading}>
            {isLoading ? <>loading ...</> : "Log in"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
