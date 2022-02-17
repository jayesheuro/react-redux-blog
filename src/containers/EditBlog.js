import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getSingleBlog, updateBlog } from "../redux/actions";

const EditBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});

  //get single blog
  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, []);

  //get current blog
  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user) {
      setUser({ ...JSON.parse(user) });
    } else {
      navigate("/login");
    }
  }, []);
  const { blog: targetBlog } = useSelector((state) => state.blogs);

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
    setBlog({ ...blog, [name]: value, id: id });
  };

  useEffect(() => {
    if (targetBlog) {
      setBlog({ ...targetBlog });
    }
  }, [targetBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blog.title.length === 0 || blog.content.length === 0) {
      setError("Please fill in all the fields.");
    } else {
      dispatch(
        updateBlog(
          {
            id: id,
            title: blog.title,
            content: blog.content,
            authorId: user.id,
            authorName: user.name,
          },
          id
        )
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
      <h2>Edit a blog:</h2>
      <form className="blogForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add a title"
          value={blog.title || ""}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Add content"
          value={blog.content || ""}
          onChange={handleInputChange}
        />
        <button className="SubmitFormButton" type="submit">
          Update
        </button>
        {error}
      </form>
    </div>
  );
};

export default EditBlog;
