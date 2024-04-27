import AppSVGIcon from "./AppSVG";

export default function AppBrand({ theme }: { theme: string }) {
  const bgColor = theme === "light" ? "bg-light" : "bg-dark";
  const textColor = theme === "light" ? "#212529" : "white";
  
  return (
    <span className="navbar-brand d-flex">
      <span className={`${bgColor} bg-light p-2 rounded`}>
        <AppSVGIcon fill={textColor} height="30px" width="30px" />
      </span>
      <span className="ms-3 fs-4"> B.logger</span>
    </span>
  );
}
