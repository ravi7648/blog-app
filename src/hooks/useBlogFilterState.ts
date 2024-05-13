import { useEffect, useState } from "react";
import { usePosts } from "./useReduxSelectors";
import { useCurrentUser } from "./useCurrentUser";
import Post from "../models/post";

export default function useBlogFilterState() {
  const currentUser = useCurrentUser();
  const posts = usePosts();
  const userBlogs =
    posts.data?.filter(
      (post) => post.isPublished || post.userId === currentUser?.id
    ) || [];

  const initialBlogs =
    userBlogs.map((blog) => {
      const blogString = JSON.stringify(blog);
      return JSON.parse(blogString);
    }) || [];

  const [filteredBlogs, setFilteredBlogs] = useState<Post[]>(initialBlogs);

  useEffect(() => {
    setFilteredBlogs(initialBlogs);
  }, [posts.data, currentUser?.id]);

  return [initialBlogs, filteredBlogs, setFilteredBlogs] as const;
}
