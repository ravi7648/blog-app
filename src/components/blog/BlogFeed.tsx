import { usePosts, useUsers } from "../../hooks/useReduxSelectors";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Loader from "../shared/Loader";
import BlogCard from "./BlogCard";
import "./BlogFeed.css";
import BlogForm from "./BlogForm";
import { PAGE_TITLES } from "../../constants/pageTitles";
import useTitleSetter from "../../hooks/useTitleSetter";
import { Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";

export default function BlogFeed() {
  const posts = usePosts();
  const users = useUsers();
  const currentUser = useCurrentUser();
  const location = useLocation();
  useTitleSetter(PAGE_TITLES.BLOGS);
  const filteredPosts =
    posts.data?.filter(
      (post) => post.isPublished || post.userId === currentUser?.id
    ) || [];

  const isFeed =
    location.pathname.replace(/\//g, "") ===
    APP_ROUTES.BLOGS.replace(/\//g, "");

  const getUser = (userId: number) => {
    return users.data?.find((user) => user.id === userId) || null;
  };

  return (
    <div className="posts-container w-100">
      <Outlet />
      {isFeed && (
        <>
          {currentUser && <BlogForm />}

          {posts.loading ? (
            <Loader />
          ) : (
            filteredPosts?.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                createdBy={getUser(post.userId)}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}
