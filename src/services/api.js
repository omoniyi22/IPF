import axios from "axios";
import { AUTH_TOKEN_KEY } from "./constants";
import { PROD_URL } from "../config/api";

const api = axios.create({
  baseURL: `${PROD_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const attachApiToken = async (api) => {
  try {
    const apiToken = localStorage.getItem(AUTH_TOKEN_KEY);
    console.log({ AUTH_TOKEN_KEY, apiToken })
    if (apiToken) {
      api.defaults.headers.common["x-access-token"] = apiToken;
    }
    return api;
  } catch (error) {
    console.error(error);
    return api;
  }
};

export { api, attachApiToken };
