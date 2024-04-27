import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NoData() {
  return (
    <div
      className="m-auto text-center d-flex align-items-center"
      style={{ minHeight: "500px" }}
    >
      <h2 className="bg-secondary rounded px-2 py-1 text-uppercase" style={{ color: "white" }}>
        <span> No Data </span>
        <FontAwesomeIcon icon={faFaceFrown} />
      </h2>
    </div>
  );
}
