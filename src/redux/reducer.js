import * as types from "./actionTypes";

const initialState = {
  blogs: [],
  blog: {},
  loading: true,
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    case types.DELETE_BLOG:
    case types.ADD_BLOG:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default blogsReducer;
