import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    let currUser = window.localStorage.getItem("user");
    if (currUser) {
      setUser(JSON.parse(currUser));
    }
  }, []);

  return (
    <div className="navbarWrapper">
      <img
        src="https://admin.viztown.in/upload/partner/testimonial/1628766696_031d677eac82f08c3a4a.png"
        alt="logo"
      />
      <div className="navRight">
        {user && <span>{user.name}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
