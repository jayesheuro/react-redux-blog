import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="navbarWrapper">
      <h3>Logo</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
