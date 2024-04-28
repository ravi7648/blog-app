import { createBrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { getPostsAsync } from "./redux/thunks/postThunk";
import { getUsersAsync } from "./redux/thunks/userThunk";
import Layout from "./components/Layout";
import ErrorPage from "./components/shared/ErrorPage";
import NotFound from "./components/shared/NotFound";
import Home from "./components/Home";
import BlogEdit from "./components/blog/BlogEdit";
import BlogFeed from "./components/blog/BlogFeed";
import Login from "./components/login/Login";
import Register from "./components/signup/Register";
import AdminProfileView from "./components/user/AdminProfileView";
import ProfileEdit from "./components/user/ProfileEdit";
import UserList from "./components/user/UserList";
import UserProfile from "./components/user/UserProfile";

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
