import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";

export default function RegisterButton() {
  return (
    <NavLink to={APP_ROUTES.SIGNUP} className="btn btn-primary me-3">
      Register
    </NavLink>
  );
}
