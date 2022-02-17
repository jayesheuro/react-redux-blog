import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";

const Login = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.users);

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  //get all users
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleLogin = (e) => {
    let shouldLogin = false;
    e.preventDefault();
    if (formInput.email === "" || formInput.password === "") {
      setError("Please fill both fields");
    } else {
      users.forEach((element) => {
        if (
          element.email === formInput.email &&
          element.password === formInput.password
        ) {
          shouldLogin = true;
          window.localStorage.setItem("user", JSON.stringify(element));
          navigate("/home");
        }
      });
      setFormInput({
        email: "",
        password: "",
      });
      setError("");
      if (shouldLogin === false) {
        setError("Invalid Credentials");
      }
    }
  };
  if (loading === true) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="loginWrapper">
      <h1>Login to your account</h1>
      <form className="loginForm" onSubmit={handleLogin} autoComplete="off">
        <input
          id="username"
          type="email"
          placeholder="email"
          name="email"
          value={formInput.email}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formInput.password}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <button type="submit">LOGIN</button>
        {error}
      </form>
      <div className="signupLine" onClick={() => navigate("/sign-up")}>
        Don't have an account? SIGN UP!
      </div>
    </div>
  );
};

export default Login;
