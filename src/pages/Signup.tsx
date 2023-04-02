import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import useReqres from "../hooks/useReqres";
import Header from "../components/ui/CenteredHeader";
import styles from "./Signup.module.css";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
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
      repassword: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;
    const repassword = target.repassword.value;

    if (!(email && password) || password !== repassword) return;

    fetchData("/api/register", email, password, );
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "repassword") setRepassword(value);
  };

  const modalHandler = () => {
    setIsModal(false);
    if (status === "succeed") {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (status !== "idle") {
      setIsModal(true);
    } 
  }, [navigate, status, responseData]);

  if (localStorage.getItem("userToekn")) {
    return <Navigate to="/users" replace />;
  }

  return (
    <div className={styles.container}>
      {isModal && status === "succeed" && (
        <Modal title={"Success"} onConfirm={modalHandler}>
          {"Account created successfully!"}
        </Modal>
      )}
      {isModal && status === "failed" && (
        <Modal title={"Oops"} onConfirm={modalHandler}>
          {responseData?.error || "Something went wrong!"}
        </Modal>
      )}
      <Header />
      <div>
        <h1 className={styles.title}>Create your Footballer account</h1>
        <p>
          Already have an account?
          <Link to="/login" className={styles["inline-link"]}>
            Log in
          </Link>
        </p>
      </div>
      <form name="form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email"> Email address</label>
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="repassword">Retype Password</label>
          <input
            type="password"
            name="repassword"
            value={repassword}
            onChange={changeHandler}
          />
          {isSubmitted && !repassword && (
            <div className="error-block repassword">
              Retype password is required
            </div>
          )}
          {isSubmitted && repassword !== password && (
            <div className="error-block repassword">Passwords don't match</div>
          )}
        </div>
        <div className="form-group">
          <Button aria-label="Sign up" type="submit" disabled={isLoading}>
            {isLoading ? <>loading ...</> : "Sign up"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
