import { ReactNode, useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants/appRoutes";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      navigate(APP_ROUTES.LOGIN);
    } else if (
      !currentUser?.isAdmin &&
      location.pathname.replaceAll("/", "") ===
        APP_ROUTES.USERS.replaceAll("/", "")
    ) {
      navigate(APP_ROUTES.UNAUTHORIZED);
    }
  }, [currentUser, navigate, location.pathname]);

  return <>{children}</>;
}
