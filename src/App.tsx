import { RouterProvider } from "react-router-dom";
import { PAGE_TITLES } from "./constants/pageTitles";
import router from "./route.config";
import SessionProvider from "./context/sessionContext";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import defaultToastProps from "./ToastConfig";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = PAGE_TITLES.APP;
  });

  return (
    <SessionProvider>
      <ToastContainer {...defaultToastProps} />
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
