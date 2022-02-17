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
const getBlog = (blog) => ({
  type: types.GET_BLOG,
  payload: blog,
});
const blogUpdated = () => ({
  type: types.UPDATE_BLOG,
});
const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});
const userAdded = () => ({
  type: types.ADD_USER,
});

export const loadBlogs = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_BLOGS_API}`)
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
      .delete(`${process.env.REACT_APP_BLOGS_API}/${id}`)
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
      .post(`${process.env.REACT_APP_BLOGS_API}`, blog)
      .then((res) => {
        dispatch(blogAdded());
        dispatch(loadBlogs());
      })
      .catch((err) => console.log(err));
  };
};

export const getSingleBlog = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_BLOGS_API}/${id}`)
      .then((res) => {
        dispatch(getBlog(res.data));
        // dispatch(loadBlogs());
      })
      .catch((err) => console.log(err));
  };
};

export const updateBlog = (blog, id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_BLOGS_API}/${id}`, blog)
      .then((res) => {
        dispatch(blogUpdated());
        dispatch(loadBlogs());
      })
      .catch((err) => console.log(err));
  };
};

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_USERS_API}`)
      .then((res) => {
        // console.log("blogs", res.data);
        dispatch(getUsers(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_USERS_API}`, user)
      .then((res) => {
        dispatch(userAdded());
        dispatch(loadUsers());
      })
      .catch((err) => console.log(err));
  };
};
