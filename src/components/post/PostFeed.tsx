import { useAppSelector } from "../../hooks/selector";
import { selectPosts } from "../../redux/slices/postSlice";
import { currentSession } from "../../redux/slices/sessionSlice";
import { selectUsers } from "../../redux/slices/userSlice";
import Loader from "../common/Loader";
import PostCard from "./PostCard";
import "./PostFeed.css";
import PostForm from "./PostForm";

export default function PostFeed() {
  const posts = useAppSelector(selectPosts);
  const users = useAppSelector(selectUsers);
  const session = useAppSelector(currentSession);

  const getUser = (userId: number) => {
    return users.data?.find((user) => user.id === userId) || null;
  };

  return (
    <div className="posts-container">
      {session.loggedIn && <PostForm session={session} />}

      {posts.loading ? (
        <Loader />
      ) : (
        posts.data?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            createdBy={getUser(post.userId)}
            session={session}
          />
        ))
      )}
    </div>
  );
}
