import { useFollows } from "./useReduxSelectors";
export const useFollowers = (id: number) => {
  const follows = useFollows();
  const followerIds =
    follows.data
      ?.filter((follow) => follow.followingId === id)
      .map((follow) => follow.followerId) || [];

  return followerIds;
};

export const useFollowing = (id: number) => {
  const follows = useFollows();
  const followingIds =
    follows.data
      ?.filter((follow) => follow.followerId === id)
      .map((follow) => follow.followingId) || [];

  return followingIds;
};
