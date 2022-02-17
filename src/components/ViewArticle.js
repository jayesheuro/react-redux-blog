import React from "react";

const ViewArticle = ({ blog, deleteHandler }) => {
  return (
    <div className="articleWrapper">
      <div className="title">{blog && blog.title}</div>
      <div className="content">{blog && blog.content}</div>
      <div className="authorName">{blog && blog.authorName}</div>
      <button className="deleteButton" onClick={() => deleteHandler(blog.id)}>
        Delete
      </button>
      <button className="editButton">Edit</button>
    </div>
  );
};

export default ViewArticle;
