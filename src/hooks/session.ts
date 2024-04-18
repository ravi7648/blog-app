import { useContext } from "react";
import { SessionContext } from "../context/sessionContext";

export const useCurrentUser = () => useContext(SessionContext);
