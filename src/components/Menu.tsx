import {
  faCircleUser,
  faHome,
  faList,
  faRightFromBracket,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { APP_ROUTES } from "../constants/appRoutes";
import { MenuItemType } from "../types/menuItem";
import "./Menu.css";
import MenuItem from "./MenuItem";
import AppBrand from "./shared/AppBrand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ALERT_MESSAGES } from "../constants/messages";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useReduxDispatchers";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Menu() {
  const logout = useLogout();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  function logoutUser() {
    logout();
    navigate(APP_ROUTES.HOME);
    alert(ALERT_MESSAGES.LOGOUT_SUCCESS);
  }
  const userMenuItems: MenuItemType[] = [
    {
      title: "home",
      icon: faHome,
      path: APP_ROUTES.HOME,
    },
    {
      title: "blogs",
      icon: faList,
      path: APP_ROUTES.BLOGS,
    },
    {
      title: "profile",
      icon: faCircleUser,
      path: APP_ROUTES.PROFILE,
    },
  ];

  const adminMenuItems: MenuItemType[] = [
    {
      title: "users",
      icon: faUserGear,
      path: APP_ROUTES.USERS,
    },
  ];

  return (
    <div className="menu bg-dark">
      <AppBrand theme="dark" />
      <div
        className="my-3 hr-line w-100"
        style={{ backgroundColor: "rgb(89,92,95)" }}
      ></div>
      <ul className="nav nav-pills flex-column mb-auto">
        {userMenuItems
          .filter((item) => item.path !== APP_ROUTES.PROFILE || currentUser)
          ?.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}

        {currentUser?.isAdmin &&
          adminMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
      </ul>
      <div
        className="my-3 hr-line w-100"
        style={{ backgroundColor: "rgb(89,92,95)" }}
      ></div>
      {currentUser && (
        <button className="btn btn-secondary" onClick={logoutUser}>
          <span className="me-3">Sign Out</span>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      )}
    </div>
  );
}
