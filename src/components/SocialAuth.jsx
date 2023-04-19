import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import "./SocialAuth.css";

const auth = getAuth();
const SocialAuth = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
        setSuccess("Successfully logged!");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  const handleGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
        setSuccess("Successfully logged!");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <>
      <div className="d-flex gap-2">
        <div
          onClick={handleGoogle}
          className="border p-1 inline-block rounded cursor-pointer"
        >
          <img src="/images/google.png" alt="" /> <span>Login with google</span>
        </div>
        <div
          onClick={handleGithub}
          className="border p-1 inline-block rounded cursor-pointer"
        >
          <img src="/images/GitHub-Mark.png" alt="" />{" "}
          <span>Login with GitHub</span>
        </div>
      </div>
      <p className="text-danger">
        <small>{error}</small>
      </p>
      <p className="text-success">
        <small>{success}</small>
      </p>
    </>
  );
};

export default SocialAuth;
