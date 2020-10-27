import {
  LOGIN_REQUEST_SUCCESS,
  DEFAULT_PASSWORD_CHANGED_SUCCESS,
} from "../types";

const loginSuccessAction = (payload) => {
  return { type: LOGIN_REQUEST_SUCCESS, payload };
};

const isDefaultPasswordAction = (payload = true) => {
  return { type: DEFAULT_PASSWORD_CHANGED_SUCCESS, payload };
};

export { loginSuccessAction, isDefaultPasswordAction };
