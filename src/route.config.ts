import { createBrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { getPostsAsync } from "./redux/thunks/postThunk";
import { getUsersAsync } from "./redux/thunks/userThunk";
import { lazy } from "react";
import Layout from "./components/Layout";
import ErrorPage from "./components/shared/ErrorPage";
import NotFound from "./components/shared/NotFound";
const Home = lazy(() => import("./components/Home"));
const Register = lazy(() => import("./components/signup/Register"));
const Login = lazy(() => import("./components/login/Login"));
const AdminProfileView = lazy(() => import("./components/user/AdminProfileView"));
const BlogFeed = lazy(() => import("./components/blog/BlogFeed"));
const BlogEdit = lazy(() => import("./components/blog/BlogEdit"));
const UserList = lazy(() => import("./components/user/UserList"));
const UserProfile = lazy(() => import("./components/user/UserProfile"));
const ProfileEdit = lazy(() => import("./components/user/ProfileEdit"));

export default createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: loadDataStore,
    ErrorBoundary: ErrorPage,
    children: [
      { path: "/", Component: Home },
      { path: "login", Component: Login },
      { path: "signup", Component: Register },
      {
        path: "blogs",
        Component: BlogFeed,
        children: [{ path: ":id", Component: BlogEdit }],
      },
      {
        path: "profile",
        Component: UserProfile,
        children: [{ path: "edit", Component: ProfileEdit }],
      },
      {
        path: "users",
        Component: UserList,
        children: [{ path: ":id", Component: AdminProfileView }],
      },
    ],
  },
  { path: "*", Component: NotFound },
]);

async function loadDataStore() {
  await store.dispatch(getPostsAsync());
  await store.dispatch(getUsersAsync());

  return null;
}
