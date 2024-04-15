import logo from "../../assets/blog-logo.png";

export default function AppBrand() {
  return (
    <span className="navbar-brand">
      <img
        src={logo}
        width="30"
        height="30"
        className="ms-3 d-inline-block align-top"
        alt=""
      />
      <span className="ms-3 text-uppercase">React Blog - POC</span>
    </span>
  );
}
