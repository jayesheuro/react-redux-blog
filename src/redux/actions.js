import axios from "axios";
import * as types from "./actionTypes";

const getBlogs = (blogs) => ({
  type: types.GET_BLOGS,
  payload: blogs,
});
const blogDeleted = () => ({
  type: types.DELETE_BLOG,
});
const blogAdded = () => ({
  type: types.ADD_BLOG,
});

export const loadBlogs = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((res) => {
        // console.log("blogs", res.data);
        dispatch(getBlogs(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const deleteBlog = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((res) => {
        dispatch(blogDeleted());
        dispatch(loadBlogs());
      })
      .catch((err) => console.log(err));
  };
};

export const addBlog = (blog) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, blog)
      .then((res) => {
        dispatch(blogAdded());
        dispatch(loadBlogs());
      })
      .catch((err) => console.log(err));
  };
};
