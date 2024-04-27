import User from "../models/user";
import { usePosts } from "./useReduxSelectors";

export const useUserPosts = (user: User | null) => {
  const posts = usePosts();
  return posts.data?.filter((post) => post.userId === user?.id);
};

export const useUserGetPost = (id: number) => {
  const posts = usePosts();
  return posts.data?.find((post) => post.id === id);
};
