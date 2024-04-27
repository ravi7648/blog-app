import { RouterProvider } from "react-router-dom";
import "./App.css";
import { PAGE_TITLES } from "./constants/pageTitles";
import router from "./route.config";
import SessionProvider from "./context/sessionContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = PAGE_TITLES.APP;
  });

  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
