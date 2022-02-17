import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ViewArticle from "../components/ViewArticle";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, loadBlogs } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs } = useSelector((state) => state.blogs);

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
  return (
    <div className="homeWrapper">
      <Navbar />
      <div className="createDiv">
        <h2>Add a new blog:</h2>
        {/* <button className="addButton" onClick={() => navigate("/add-blog")}>
          Add blog
        </button> */}
      </div>
      <div className="blogsWrapper">
        {blogs &&
          blogs.map((blog) => (
            <ViewArticle
              key={blog.id}
              blog={blog}
              deleteHandler={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
