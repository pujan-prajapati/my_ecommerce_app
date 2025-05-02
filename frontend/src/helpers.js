import { toast } from "react-toastify";

export const setLocalStore = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStore = (value) => {
  return JSON.parse(localStorage.getItem(value));
};

export const notify = (msg, status) => {
  if (status == "error") {
    toast.error(msg);
  } else {
    toast.success(msg);
  }
};

// Helper function to handle errors
export const handleError = (error, rejectWithValue) => {
  if (error.response) {
    return rejectWithValue(error.response.data.message || "Server Error");
  }
  return rejectWithValue("Network Error. Please try again.");
};
