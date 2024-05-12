import NoDataIcon from "./NoDataIcon";

export function NoData() {
  return (
    <div
      className="m-auto text-center d-flex align-items-center"
      style={{ minHeight: "500px" }}
    >
      <NoDataIcon />
    </div>
  );
}
