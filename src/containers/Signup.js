import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, loadUsers } from "../redux/actions";
import "./Auth.scss";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
  });
  const [cpass, setCpass] = useState("");
  const [error, setError] = useState("");

  //load users to get the new user id
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const { users, loading } = useSelector((state) => state.users);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value, id: users.length + 1 });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formInput.email === "" || formInput.password === "") {
      setError("Please fill all the fields");
    } else {
      if (formInput.password === cpass) {
        dispatch(
          addUser({
            id: users.length + 1,
            name: formInput.name,
            email: formInput.email,
            password: formInput.password,
          })
        );
        window.localStorage.setItem("user", JSON.stringify(formInput));
        setError("");
        navigate("/home");
      } else {
        setError("Passwords do not match");
      }
    }
  };

  return (
    <div className="signupWrapper">
      <h1>Sign up for an account</h1>
      <form className="loginForm" onSubmit={handleSignup} autoComplete="off">
        <input
          type="name"
          placeholder="Full Name"
          name="name"
          value={formInput.name}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
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
        <input
          type="password"
          placeholder="confirm password"
          name="cpassword"
          value={cpass}
          onChange={(e) => setCpass(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">SIGN UP</button>
        {error}
      </form>
      <div className="loginLine" onClick={() => navigate("/login")}>
        Already have an account? LOGIN!
      </div>
    </div>
  );
};

export default Signup;
