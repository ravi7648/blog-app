import User from "../models/user";
import { useUsers } from "./useReduxSelectors";

export default function useGetUserById(id: number): User {
  const users = useUsers();
  const user = users.data?.find((user) => user.id === id);
  return user || new User();
}
