import { usePosts, useUsers } from "../../hooks/selector";
import { useCurrentUser } from "../../hooks/session";
import Loader from "../common/Loader";
import PostCard from "./PostCard";
import "./PostFeed.css";
import PostForm from "./PostForm";

export default function PostFeed() {
  const posts = usePosts();
  const users = useUsers();
  const currentUser = useCurrentUser();

  const getUser = (userId: number) => {
    return users.data?.find((user) => user.id === userId) || null;
  };

  return (
    <div className="posts-container">
      {currentUser && <PostForm />}

      {posts.loading ? (
        <Loader />
      ) : (
        posts.data?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            createdBy={getUser(post.userId)}
          />
        ))
      )}
    </div>
  );
}
