import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";


import {
  getAccessToken,
  getRefreshToken,
  getUser,
} from "../hooks/user.actions";


const baseURL = 'http://localhost:8000/api'

const axiosService = axios.create({
  baseURL: baseURL,
  //  process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use(async (config) => {
  /**
   * Retrieving the access and refresh tokens from the local storage
   */
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
});

axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

const refreshAuthLogic = async (failedRequest) => {
  return axios
    .post(
      `${baseURL}/auth/refresh/`,
      {
        refresh: getRefreshToken(),
      },
      {
        baseURL: baseURL,
        // process.env.REACT_APP_API_URL,
      }
    )
    .then((resp) => {
      const { access } = resp.data;
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + access;
      localStorage.setItem(
        "auth",
        JSON.stringify({ access, refresh: getRefreshToken(), user: getUser() })
      );
    })
    .catch(() => {
      localStorage.removeItem("auth");
    });
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url) {
  return axiosService.get(url).then((res) => res.data);
}

export default axiosService;
