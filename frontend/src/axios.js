import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { getLocalStore, notify } from "./helpers";
import { main_URL } from "./constant/constant";

export const http = axios.create({
  baseURL: `${main_URL}`,
  timeout: 30000,
  timeoutErrorMessage: "Server timed out",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to modify headers for file uploads
http.interceptors.request.use(
  (config) => {
    // Check if data is FormData
    if (config.data instanceof FormData) {
      // Automatically set Content-Type to multipart/form-data
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use((response) => {
  if (response.status === StatusCodes.NOT_FOUND) {
    notify("API does not exists", "error");
  } else if (response.status === StatusCodes.UNAUTHORIZED) {
    notify("Unauthorized access", "error");
  } else if (response.status === StatusCodes.FORBIDDEN) {
    notify("Access denied", "error");
  } else if (response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
    notify("Could not process the request", "error");
  }

  return response;
});

const getHeaders = (strict) => {
  let headers = {
    "Content-Type": "application/json",
  };

  if (strict) {
    let accessToken = getLocalStore("accessToken");
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
};

export const httpPost = async (url, data, is_strict = false) => {
  let headers = getHeaders(is_strict);

  let response = await http.post(url, data, { headers: headers });

  return response.data;
};

export const httpDelete = async (url, is_strict = false) => {
  let headers = getHeaders(is_strict);

  const response = await http.delete(url, { headers: headers });

  return response.data;
};

export const httpPut = async (url, data, is_strict = false) => {
  let headers = getHeaders(is_strict);
  const response = await http.put(url, data, { headers: headers });
  return response.data;
};

export const httpGet = async (url, params = null, is_strict = false) => {
  let headers = getHeaders(is_strict);

  const response = await http.get(url, { headers: headers, params: params });
  return response.data;
};
