import { combineReducers } from "redux";
import blogsReducer from "./reducer";

const rootReducer = combineReducers({
  blogs: blogsReducer,
});

export default rootReducer;
