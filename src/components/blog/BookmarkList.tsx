import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useUserBookmarkPost } from "../../hooks/useUserBookmarkPosts";
import Post from "../../models/post";
import NoDataIcon from "../shared/NoDataIcon";
import BlogHomeCard from "./BlogHomeCard";

export default function BookmarkList() {
  const user = useCurrentUser();
  const bookmarkPosts = useUserBookmarkPost(user);
  return (
    <div className="d-flex border-cover flex-wrap gap-3 w-100 justify-content-start mt-5">
      {bookmarkPosts?.map((post: Post) => (
        <div key={post.id} className="user-blog-card">
          <BlogHomeCard post={post} bookmarked/>
        </div>
      ))}
      <div className="w-100 d-flex justify-content-center">
        {bookmarkPosts?.length === 0 && <NoDataIcon />}
      </div>
    </div>
  );
}
