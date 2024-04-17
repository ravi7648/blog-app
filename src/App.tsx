import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { PAGE_TITLES } from "./constants/pageTitles";
import router from "./Route";

function App() {
  useEffect(() => {
    document.title = PAGE_TITLES.APP;
  });

  return <RouterProvider router={router}/>;
}

export default App;
