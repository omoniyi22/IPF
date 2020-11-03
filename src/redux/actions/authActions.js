import {
  LOGIN_REQUEST_SUCCESS,
  DEFAULT_PASSWORD_CHANGED_SUCCESS,
  USER_DETAILS_FETCHED,
  SET_CURRENT_USER, LOGOUT
} from "../types";

const loginSuccessAction = (payload, the) => {
  return {
    type: LOGIN_REQUEST_SUCCESS, payload
  };
};

const isDefaultPasswordAction = (payload = true) => {
  return {
    type: DEFAULT_PASSWORD_CHANGED_SUCCESS, payload
  };
};


export { loginSuccessAction, isDefaultPasswordAction };



export const setCurrentUser = (payload) => {
  return {
    type: SET_CURRENT_USER,
    payload
  }
}

export const logout = (the) => (dispatch) => {
  localStorage.clear();
  the.push("/");
  dispatch({
    type: LOGOUT
  })
};