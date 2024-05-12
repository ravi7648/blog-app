import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NoDataIcon() {
  return (
    <h2
      className="bg-secondary rounded px-2 py-1 text-uppercase"
      style={{ color: "white" }}
    >
      <span> No Data </span>
      <FontAwesomeIcon icon={faFaceFrown} />
    </h2>
  );
}
