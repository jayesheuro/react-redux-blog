import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addBlog, loadBlogs } from "../redux/actions";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get all blogs
  useEffect(() => {
    dispatch(loadBlogs());
  }, []);

  const { blogs, loading } = useSelector((state) => state.blogs);
  const [blog, setBlog] = useState({
    id: 0,
    title: "",
    content: "",
    authorId: 1,
    authorName: "Jayesh Singh",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setBlog({ ...blog, [name]: value, id: blogs.length + 1 });
    console.log(blog);
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
          authorId: 1, //hardcoded
          authorName: "Jayesh Singh", //hardcoded
        })
      );
      setError("");
      navigate("/home");
    }
  };
  return (
    <div className="blogFormWrapper">
      <Navbar />
      <div className="backButton">
        <button onClick={() => navigate("/home")}>Back</button>
      </div>
      <h2>AddBlog - (blog #{loading ? 0 : blogs.length + 1})</h2>
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
