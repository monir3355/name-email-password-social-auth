import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);
const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // email password and name authentication
  const handleRegister = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    // console.log(event.target);
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("You have successfully submitted");
        updateUserData(loggedUser, name);
        sendVerifyEmail(loggedUser);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  // verification email
  const sendVerifyEmail = (user) => {
    sendEmailVerification(user).then(() => {
      alert("Email verification sent!");
    });
  };
  // User name Updated
  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log("User Name Updated");
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Please Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
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
            If you have account please <Link to="/login">Login</Link>
          </small>
        </p>
        <p className="text-danger">
          <small>{error}</small>
        </p>
        <p className="text-success">
          <small>{success}</small>
        </p>
      </Form>
    </div>
  );
};

export default Register;
