import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.config";
import SocialAuth from "./SocialAuth";

const auth = getAuth(app);
const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("at least one uppercase");
      return;
    } else if (!/(?=.*[!#$%&? "])/.test(password)) {
      setError("at least special key");
      return;
    } else if (password.length < 6) {
      setError("please input 6 or more letter");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("Login Successfully!");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  const handleResetPass = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please inter your email");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Please Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <Form.Check
            onClick={() => setShowPass(!showPass)}
            type="checkbox"
            label="Show password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <p>
          <small>
            If you forget password then{" "}
            <Link onClick={handleResetPass}>Reset Password</Link>
          </small>
        </p>
        <p>
          <small>
            If you don,t have account please{" "}
            <Link to="/register">Register</Link>
          </small>
        </p>
        <p className="text-danger">
          <small>{error}</small>
        </p>
        <p className="text-success">
          <small>{success}</small>
        </p>
      </Form>
      <div>
        <SocialAuth />
      </div>
    </div>
  );
};

export default Login;
