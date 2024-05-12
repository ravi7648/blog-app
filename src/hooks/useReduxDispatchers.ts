import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import Post from "../models/post";
import {
  addPostAsync,
  addReactionAsync,
  deletePostAsync,
  updatePostAsync,
} from "../redux/thunks/postThunk";
import {
  addCommentAsync,
  deleteCommentAsync,
  loadPostCommentsAsync,
  updateCommentAsync,
} from "../redux/thunks/commentThunk";
import { login, logout, modifySession } from "../redux/slices/sessionSlice";
import { SessionType } from "../types/session";
import Comment from "../models/comment";
import { ReactionPayloadType } from "../types/reactionPayload";
import {
  addBookmarkAsync,
  addUserAsync,
  editUserAsync,
  removeBookmarkAsync,
} from "../redux/thunks/userThunk";
import User from "../models/user";
import { followUser, unfollowUser } from "../redux/slices/followSlice";
import Follow from "../models/follow";
import { BookmarkPayloadType } from "../types/bookmarkPayload";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAddPost = () => {
  const dispatch = useAppDispatch();
  const addPost = async (post: Post) => await dispatch(addPostAsync(post));
  return addPost;
};

export const useUpdatePost = () => {
  const dispatch = useAppDispatch();
  const updatePost = async (post: Post) =>
    await dispatch(updatePostAsync(post));
  return updatePost;
};

export const useDeletePost = () => {
  const dispatch = useAppDispatch();
  const deletePost = async (id: number) => await dispatch(deletePostAsync(id));
  return deletePost;
};

export const usePostComments = () => {
  const dispatch = useAppDispatch();
  return async (postId: number) =>
    await dispatch(loadPostCommentsAsync(postId));
};

export const useAddComment = () => {
  const dispatch = useAppDispatch();
  return async (comment: Comment) => await dispatch(addCommentAsync(comment));
};

export const useUpdateComment = () => {
  const dispatch = useAppDispatch();
  return async (comment: Comment) =>
    await dispatch(updateCommentAsync(comment));
};

export const useDeleteComment = () => {
  const dispatch = useAppDispatch();
  return async (id: number) => await dispatch(deleteCommentAsync(id));
};

export const useAddReaction = () => {
  const dispatch = useAppDispatch();
  return async (reaction: ReactionPayloadType) =>
    await dispatch(addReactionAsync(reaction));
};

export const useAddBookmark = () => {
  const dispatch = useAppDispatch();
  return async (bookmark: BookmarkPayloadType) =>
    await dispatch(addBookmarkAsync(bookmark));
};

export const useRemoveBookmark = () => {
  const dispatch = useAppDispatch();
  return async (bookmark: BookmarkPayloadType) =>
    await dispatch(removeBookmarkAsync(bookmark));
};

export const useAddUser = () => {
  const dispatch = useAppDispatch();
  return async (user: User) => await dispatch(addUserAsync(user));
};

export const useEditUser = () => {
  const dispatch = useAppDispatch();
  return async (user: User) => await dispatch(editUserAsync(user));
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(logout());
};

export const useModifySession = () => {
  const dispatch = useAppDispatch();
  return (session: SessionType) => dispatch(modifySession(session));
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  return (session: SessionType) => dispatch(login(session));
};

export const useAddFollows = () => {
  const dispatch = useAppDispatch();
  return (follow: Follow) => dispatch(followUser(follow));
};

export const useUnfollow = () => {
  const dispatch = useAppDispatch();
  return (follow: Follow) => dispatch(unfollowUser(follow));
};
