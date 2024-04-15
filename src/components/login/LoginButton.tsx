import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";

export default function LoginButton() {
  return (
    <NavLink to={APP_ROUTES.LOGIN} className="btn btn-secondary me-3">
      Login
    </NavLink>
  );
}
