import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeButton from "./buttons/HomeButton";
import "./Unauthorized.css";

export default function Unauthorized() {
  return (
    <div className="d-flex justify-content-center align-items-center cover-full-screen">
      <div className="text-center">
        <div className="banner-header">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            style={{ color: "#b12020" }}
          />
          <span> 401 </span>
        </div>
        <p className="banner-description text-uppercase">Unauthorized</p>
        <HomeButton />
      </div>
    </div>
  );
}
