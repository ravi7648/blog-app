export const APP_ROUTES = {
  HOME: "/",
  BLOGS: "/blogs",
  USERS: "/users",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE: "/profile",
  EDIT_PROFILE: "/profile/edit",
  USER: (id: number) => "/users/" + id,
  BLOG: (id: number) => "/blogs/" + id,
  ADMIN_EDIT_PROFILE: (id: number) => "/users/" + id + "/edit",
};
