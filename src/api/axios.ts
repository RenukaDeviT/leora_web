import axios, { AxiosResponse } from "axios";
import { camelizeKeys } from "humps";
import config from "config";
import useErrorHandler from "../Pages/VideoCallTrigger/hooks/useErrorHandler"

const CONNECTION_TIMEOUT_IN_MS = 8000;

// configuring api link with timeout
const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  timeout: CONNECTION_TIMEOUT_IN_MS,
});

axiosInstance.interceptors.request.use((config) => config);

// Formalize the responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data) {
      response.data = camelizeKeys(response.data);
    }

    return response;
  },
  async (err) => {
    // error code check
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      console.log(err); // eslint-disable-line no-console
      useErrorHandler();
    }
  }
);

export default axiosInstance;
