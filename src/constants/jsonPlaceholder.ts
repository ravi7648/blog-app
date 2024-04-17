const BASE_URL = `https://jsonplaceholder.typicode.com`;

export const JSON_PLACEHOLDER = {
  POSTS: `${BASE_URL}/posts`,
  COMMENTS: `${BASE_URL}/comments`,
  POST_COMMENTS: (id: number) => `${BASE_URL}/posts/${id}/comments`,
  USERS: `${BASE_URL}/users`,
};
