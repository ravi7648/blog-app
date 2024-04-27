import { NavLink } from "react-router-dom";
import { MenuItemType } from "../types/menuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuItem({ title, icon, path }: MenuItemType) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={path} style={{ color: "white" }}>
        <FontAwesomeIcon icon={icon} />
        <span className="ms-3 text-capitalize">{title}</span>
      </NavLink>
    </li>
  );
}
