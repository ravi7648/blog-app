import { ReactNode, useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { APP_ROUTES } from "../constants/appRoutes";
import { useNavigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate(APP_ROUTES.LOGIN);
    }
  }, [currentUser, navigate]);

  return <>{children}</>;
}
