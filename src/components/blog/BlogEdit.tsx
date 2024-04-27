import { useParams } from "react-router-dom";
import BlogForm from "./BlogForm";
import { useUserGetPost } from "../../hooks/useUserPosts";

export default function BlogEdit() {
  const params = useParams();
  const post = useUserGetPost(Number(params.id));
  return (
    <div style={{height: "calc(100vh - 170px)"}}>
      <BlogForm post={post} />
    </div>
  );
}
