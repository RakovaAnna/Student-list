import { combineReducers } from "redux";
import students from "./students";
import progress from "./progress";

export default combineReducers({
  students,
  progress
});


