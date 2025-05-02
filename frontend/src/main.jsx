// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer autoClose={1000} closeOnClick draggable hideProgressBar />
    </Provider>
  </BrowserRouter>
  // </StrictMode>
);
