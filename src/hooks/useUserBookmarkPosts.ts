import User from "../models/user";
import { usePosts } from "./useReduxSelectors";

export const useUserBookmarkPost = (user: User | null) => {
  const posts = usePosts();
  return posts.data?.filter((post) => user?.bookmarkedPosts?.includes(post.id));
};
