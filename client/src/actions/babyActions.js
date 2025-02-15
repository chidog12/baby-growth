import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// add new Baby
export const newBaby = (newBaby) => dispatch => {
    axios
      .post("/api/babies/post", newBaby)
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };


