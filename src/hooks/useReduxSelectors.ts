import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { selectComments } from "../redux/slices/commentSlice";
import { selectPosts } from "../redux/slices/postSlice";
import { selectUsers } from "../redux/slices/userSlice";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useComments = () => useAppSelector(selectComments);
export const usePosts = () => useAppSelector(selectPosts);
export const useUsers = () => useAppSelector(selectUsers);
