import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="btn btn-primary" onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Go back
    </button>
  );
}
