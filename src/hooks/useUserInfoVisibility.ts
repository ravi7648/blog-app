import { useUsersInfoVisibility } from "./useReduxSelectors";

export default function useUserInfoVisibility(userId: number) {
  const userInfoVisibilityData = useUsersInfoVisibility();
  return userInfoVisibilityData.data?.find(
    (userInfoVisibility) => userInfoVisibility.userId === userId
  );
}
