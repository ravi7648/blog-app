import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/login/Login";
import PostFeed from "./components/post/PostFeed";
import Register from "./components/signup/Register";
import NotFound from "./components/common/NotFound";
import { store } from "./redux/store";
import { getPostAsync } from "./redux/thunks/postThunk";
import { getUsersAsync } from "./redux/thunks/userThunk";
import ErrorPage from "./components/common/ErrorPage";

export default createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: loadDataStore,
    ErrorBoundary: ErrorPage,
    children: [
      { path: "/", Component: Home },
      { path: "posts", Component: PostFeed },
      { path: "login", Component: Login },
      { path: "signup", Component: Register },
    ],
  },
  { path: "*", Component: NotFound },
]);

async function loadDataStore() {
  await store.dispatch(getPostAsync());
  await store.dispatch(getUsersAsync());

  return null;
}
