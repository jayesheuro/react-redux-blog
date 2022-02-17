import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addBlog, loadBlogs } from "../redux/actions";
import "./AddBlog.scss";
const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  //get all blogs
  useEffect(() => {
    dispatch(loadBlogs());
  }, []);

  //get current user from localstorage
  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user) {
      setUser({ ...JSON.parse(user) });
    } else {
      navigate("/login");
    }
  }, []);

  const { blogs } = useSelector((state) => state.blogs);
  const [blog, setBlog] = useState({
    id: 0,
    title: "",
    content: "",
    authorId: user.id,
    authorName: user.name,
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setBlog({ ...blog, [name]: value, id: blogs.length + 1 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blog.title.length === 0 || blog.content.length === 0) {
      setError("Please fill in all the fields.");
    } else {
      dispatch(
        addBlog({
          id: blogs.length + 1,
          title: blog.title,
          content: blog.content,
          authorId: user.id,
          authorName: user.name,
        })
      );
      setError("");
      navigate("/home");
    }
  };
  return (
    <div className="blogFormWrapper">
      <Navbar />
      <button className="backButton" onClick={() => navigate("/home")}>
        Back
      </button>
      <h2>Add a blog </h2>
      <form className="blogForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add a title"
          value={blog.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Add content"
          value={blog.content}
          onChange={handleInputChange}
        />
        <button className="SubmitFormButton" type="submit">
          Add
        </button>
        {error}
      </form>
    </div>
  );
};

export default AddBlog;
