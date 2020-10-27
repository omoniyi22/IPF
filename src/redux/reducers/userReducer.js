import {
  LOGIN_REQUEST_SUCCESS,
  DEFAULT_PASSWORD_CHANGED_SUCCESS,
} from "../types";
const INITIAL_STATE = {
  isDefaultPassword: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isDefaultPassword: action.payload.default_password,
      };

    case DEFAULT_PASSWORD_CHANGED_SUCCESS:
      return {
        ...state,
        isDefaultPassword: action.payload,
      };

    default:
      return state;
  }
};
