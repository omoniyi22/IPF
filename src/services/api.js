import axios from "axios";
import { AUTH_TOKEN_KEY } from "./constants";

const api = axios.create({
  baseURL: "https://6db5d714690f.ngrok.io/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const attachApiToken = async (api) => {
  try {
    const apiToken = localStorage.getItem(AUTH_TOKEN_KEY);
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
