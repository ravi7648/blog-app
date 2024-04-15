import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/login/Login";
import Home from "./components/Home";
import { useEffect } from "react";
import { PAGE_TITLES } from "./constants/pageTitles";
import Register from "./components/signup/Register";
import NotFound from "./components/common/NotFound";
import PostFeed from "./components/post/PostFeed";

function App() {
  useEffect(() => {
    document.title = PAGE_TITLES.APP;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index Component={Home} />
          <Route path="posts" Component={PostFeed} />
          <Route path="login" Component={Login} />
          <Route path="signup" Component={Register} />
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
