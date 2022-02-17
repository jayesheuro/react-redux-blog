import React from "react";
import { useNavigate } from "react-router-dom";

const ViewArticle = ({ blog, deleteHandler, user }) => {
  const navigate = useNavigate();
  return (
    <div className="articleWrapper">
      <div className="title">{blog && blog.title}</div>
      <div className="content">{blog && blog.content}</div>
      <div className="authorName">{blog && blog.authorName}</div>
      {blog.authorId === user.id && (
        <>
          <button
            className="deleteButton"
            onClick={() => deleteHandler(blog.id)}
          >
            Delete
          </button>
          <button
            className="editButton"
            onClick={() => navigate(`/edit-blog/${blog.id}`)}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default ViewArticle;
