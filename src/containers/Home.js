import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ViewArticle from "../components/ViewArticle";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, loadBlogs } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const [user, setUser] = useState({});
  //get all blogs
  useEffect(() => {
    dispatch(loadBlogs());
  }, []);

  //delete blog handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteBlog(id));
    }
  };
  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user) {
      setUser({ ...JSON.parse(user) });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="homeWrapper">
      <Navbar />
      {user && (
        <div className="createDiv">
          <h2>Add a new blog:</h2>
          <button className="addButton" onClick={() => navigate("/add-blog")}>
            Add blog
          </button>
        </div>
      )}

      <div className="blogsWrapper">
        {blogs &&
          blogs.map((blog) => (
            <ViewArticle
              key={blog.id}
              blog={blog}
              deleteHandler={handleDelete}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
