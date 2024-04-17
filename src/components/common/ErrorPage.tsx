import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeButton from "./HomeButton";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <div className="d-flex justify-content-center align-items-center cover-full-screen">
      <div className="text-center">
        <div className="banner-header">
          <FontAwesomeIcon icon={faBug} style={{ color: "#b12020" }} />
          <span> Oops! </span>
        </div>
        <p className="banner-description text-uppercase">
          Something went wrong
        </p>
        <HomeButton />
      </div>
    </div>
  );
}
