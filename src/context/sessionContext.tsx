import { ReactNode, createContext, useEffect, useState } from "react";
import { SessionType } from "../types/session";
import User from "../models/user";
import { localStorageService } from "../services/localStorageService";
import { STORE_KEYS } from "../constants/storeKeys";
import { useUsers } from "../hooks/selector";

export const SessionContext = createContext<User | null>(null);

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const users = useUsers();

  useEffect(() => {
    const storageEventHandler = () => {
      const session = localStorageService.get<SessionType>(STORE_KEYS.SESSION);
      const user = users.data?.find((user) => user.id === session?.id);
      setCurrentUser(user!);
    };

    document.addEventListener("storage", storageEventHandler);
    return () => {
      document.removeEventListener("storage", storageEventHandler);
    };
  });

  return (
    <SessionContext.Provider value={currentUser}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
