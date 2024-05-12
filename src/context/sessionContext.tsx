import { ReactNode, createContext, useEffect, useState } from "react";
import { SessionType } from "../types/session";
import User from "../models/user";
import { localStorageService } from "../services/localStorageService";
import { STORE_KEYS } from "../constants/storeKeys";
import { useUsers } from "../hooks/useReduxSelectors";

export const SessionContext = createContext<User | null>(null);

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const users = useUsers();

  useEffect(() => {
    const storageEventHandler = () => {
      const session = localStorageService.get<SessionType>(STORE_KEYS.SESSION);
      const user = users.data?.find((user) => user.id === session?.id);
      const bindedUser = user && User.bindMethods(user);

      setCurrentUser(bindedUser!);
    };

    storageEventHandler();
    document.addEventListener("storage", storageEventHandler);
    return () => {
      document.removeEventListener("storage", storageEventHandler);
    };
  }, [users]);

  return (
    <SessionContext.Provider value={currentUser}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
