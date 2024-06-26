import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { selectComments } from "../redux/slices/commentSlice";
import { selectPosts } from "../redux/slices/postSlice";
import { selectUsers } from "../redux/slices/userSlice";
import { selectFollows } from "../redux/slices/followSlice";
import { selectUsersInfoVisibility } from "../redux/slices/userInfoVisibilitySlice";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useComments = () => useAppSelector(selectComments);
export const usePosts = () => useAppSelector(selectPosts);
export const useUsers = () => useAppSelector(selectUsers);
export const useFollows = () => useAppSelector(selectFollows);
export const useUsersInfoVisibility = () => useAppSelector(selectUsersInfoVisibility);
