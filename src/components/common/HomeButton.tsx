import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function HomeButton() {
  return (
    <Link to={APP_ROUTES.HOME} className="btn btn-primary">
      <FontAwesomeIcon icon={faCircleArrowLeft} /> &nbsp; Go to Home
    </Link>
  );
}
