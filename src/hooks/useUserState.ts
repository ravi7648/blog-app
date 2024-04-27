import { useState } from "react";
import User from "../models/user";
import { useUsers } from "./useReduxSelectors";

export default function useUserFilterState() {
  const initialUsers =
    useUsers().data?.map((user) => {
      const userString = JSON.stringify(user);
      return JSON.parse(userString);
    }) || [];
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);

  return [initialUsers, filteredUsers, setFilteredUsers] as const;
}
