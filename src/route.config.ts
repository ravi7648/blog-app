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
import FollowerList from "./components/user/FollowerList";
import FollowingList from "./components/user/FollowingList";
import BookmarkList from "./components/blog/BookmarkList";
import { getUserInfoVisibilityAsync } from "./redux/thunks/userInfoVisibilityThunk";
import ManageVisibility from "./components/user/ManageVisibility";
import Unauthorized from "./components/shared/Unauthorized";

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
        children: [
          { path: "edit", Component: ProfileEdit },
          { path: "follower", Component: FollowerList },
          { path: "following", Component: FollowingList },
          { path: "bookmark", Component: BookmarkList },
          { path: "visibility", Component: ManageVisibility },
        ],
      },
      {
        path: "users",
        Component: UserList,
        children: [
          {
            path: ":id",
            Component: AdminProfileView,
            children: [
              { path: "follower", Component: FollowerList },
              { path: "following", Component: FollowingList },
            ],
          },
        ],
      },
    ],
  },
  { path: "/unauthorized", Component: Unauthorized },
  { path: "*", Component: NotFound },
]);

async function loadDataStore() {
  await store.dispatch(getPostsAsync());
  await store.dispatch(getUsersAsync());
  await store.dispatch(getUserInfoVisibilityAsync());

  return null;
}
