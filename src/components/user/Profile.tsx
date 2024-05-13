import {
  faBookmark,
  faEnvelope,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";
import Post from "../../models/post";
import User from "../../models/user";
import BlogHomeCard from "../blog/BlogHomeCard";
import ProfileIcon from "../shared/ProfileIcon";
import { useUserPosts } from "../../hooks/useUserPosts";
import { NoData } from "../shared/NoData";
import FollowDetailBadge from "./FollowDetailBadge";
import { POPOVER_PLACEMENT, Tooltip } from "../shared/Tooltip";
import useUserInfoVisibility from "../../hooks/useUserInfoVisibility";
import { ObfuscateIf } from "../../utils/textUtils";

export default function Profile({ user }: { user: User | null }) {
  const location = useLocation();
  const userPosts = useUserPosts(user);
  const userInfoVisibility = useUserInfoVisibility(user?.id || 0);
  const isProfilePath = location.pathname.includes(APP_ROUTES.PROFILE);

  return (
    <div className="w-100">
      <div className="d-flex border-cover">
        <ProfileIcon user={user} size={150} fontSize="3rem" />
        <div className="d-flex align-items-start flex-grow-1">
          <div className="d-flex flex-column ms-4 align-items-start w-100">
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex align-items-center">
                <h2>
                  {ObfuscateIf(
                    !userInfoVisibility?.name && !isProfilePath,
                    user?.name
                  )}
                </h2>
                {isProfilePath && (
                  <Tooltip
                    text="Manage profile visibility"
                    placement={POPOVER_PLACEMENT.RIGHT}
                  >
                    <Link
                      to={APP_ROUTES.MANAGE_VISIBILITY}
                      className="ms-2 fs-5 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </Tooltip>
                )}
              </div>
              <span>
                {user && <FollowDetailBadge user={user} />}
                {isProfilePath && (
                  <>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      style={{ color: "#0d6efd" }}
                      className=" cursor-pointer"
                    />
                    <Link
                      to={APP_ROUTES.BOOKMARKS}
                      className="ms-2 text-decoration-none cursor-pointer"
                    >
                      {user?.bookmarkedPosts?.length || 0}{" "}
                      {(user?.bookmarkedPosts?.length || 0) > 1
                        ? "Blogs"
                        : "Blog"}
                    </Link>
                  </>
                )}
              </span>
            </div>
            <span className="badge bg-primary">
              @
              {ObfuscateIf(
                !userInfoVisibility?.username && !isProfilePath,
                user?.username
              )}
            </span>
            <span className="text-secondary">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="ms-2">{ObfuscateIf(!userInfoVisibility?.email && !isProfilePath, user?.email)}</span>
            </span>
            <div className="d-flex gap-3 mt-3 w-100 align-items-center">
              <div>
                <div className="me-2 text-uppercase fw-medium">Contact</div>
                <div className="text-secondary">
                  {ObfuscateIf(
                    !userInfoVisibility?.phone && !isProfilePath,
                    user?.phone
                  )}
                </div>
              </div>
              <div>
                <div className="me-2 text-uppercase fw-medium">Company</div>
                <div className="text-secondary">
                  {ObfuscateIf(
                    !userInfoVisibility?.company && !isProfilePath,
                    user?.company?.name
                  )}
                </div>
              </div>
              <div>
                <div className="me-2 text-uppercase fw-medium">Website</div>
                <div className="text-secondary">
                  {ObfuscateIf(
                    !userInfoVisibility?.website && !isProfilePath,
                    user?.website
                  )}
                </div>
              </div>
              <div>
                <div className="me-2 text-uppercase fw-medium">Address</div>
                <div className="text-secondary">
                  {ObfuscateIf(
                    !userInfoVisibility?.address && !isProfilePath,
                    user?.address?.city
                  )}
                </div>
              </div>
              <div>
                <div className="me-2 text-uppercase fw-medium">Zip Code</div>
                <div className="text-secondary">
                  {ObfuscateIf(
                    !userInfoVisibility?.address && !isProfilePath,
                    user?.address?.zipcode
                  )}
                </div>
              </div>
              {location.pathname !== APP_ROUTES.EDIT_PROFILE &&
                location.pathname !== APP_ROUTES.USER(user?.id || 0) && (
                  <NavLink
                    className="btn btn-primary ms-auto"
                    to={APP_ROUTES.EDIT_PROFILE}
                  >
                    Edit Profile
                  </NavLink>
                )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <div className="d-flex border-cover flex-wrap gap-3 w-100 justify-content-start mt-5">
        {userPosts?.map((post: Post) => (
          <div key={post.id} className="user-blog-card">
            <BlogHomeCard post={post} />
          </div>
        ))}
        {userPosts?.length === 0 && <NoData />}
      </div>
    </div>
  );
}
