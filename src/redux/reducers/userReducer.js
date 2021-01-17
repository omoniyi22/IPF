import {
  LOGIN_REQUEST_SUCCESS,
  DEFAULT_PASSWORD_CHANGED_SUCCESS,
  SET_CURRENT_USER,
  LOGOUT
} from "../types";

const INITIAL_STATE = {
  isAuth: false,
  isDefaultPassword: false,
  currentUser: { role: undefined }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,

      }
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isDefaultPassword: action.payload.default_password,
        isAuth: true
      };

    case DEFAULT_PASSWORD_CHANGED_SUCCESS:
      return {
        ...state,
        isDefaultPassword: action.payload,
      };
    // case AUTH_ERROR:
    // case REGISTER_FAIL:
    // case LOGIN_FAIL:
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state
  }
};