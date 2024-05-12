import { faBookmark, faEnvelope } from "@fortawesome/free-solid-svg-icons";
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

export default function Profile({ user }: { user: User | null }) {
  const location = useLocation();
  const userPosts = useUserPosts(user);

  return (
    <div className="w-100">
      <div className="d-flex border-cover">
        <ProfileIcon user={user} size={150} fontSize="3rem" />
        <div className="d-flex align-items-start flex-grow-1">
          <div className="d-flex flex-column ms-4 align-items-start w-100">
            <div className="d-flex justify-content-between w-100">
              <h2>{user?.name}</h2>
              <span>
                {user && <FollowDetailBadge user={user} />}
                <FontAwesomeIcon icon={faBookmark} style={{ color: "#0d6efd" }} className=" cursor-pointer" />
                <Link to={APP_ROUTES.BOOKMARKS} className="ms-2 text-decoration-none cursor-pointer">
                  {user?.bookmarkedPosts?.length || 0} {(user?.bookmarkedPosts?.length || 0) > 1 ? "Blogs" : "Blog"}
                </Link>
              </span>
            </div>
            <span className="badge bg-primary">@{user?.username}</span>
            <span className="text-secondary">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="ms-2">{user?.email}</span>
            </span>
            <div className="d-flex gap-3 mt-3 w-100 align-items-center">
              <div>
                <div className="me-2 text-uppercase fw-medium">Contact</div>
                <div className="text-secondary">{user?.phone}</div>
              </div>
              <div>
                <div className="me-2 text-uppercase fw-medium">Company</div>
                <div className="text-secondary">{user?.company?.name}</div>
              </div>
              <div>
                <div className="me-2 text-uppercase fw-medium">Website</div>
                <div className="text-secondary">{user?.website}</div>
              </div>
              <div>
                <div className="me-2 text-uppercase fw-medium">Address</div>
                <div className="text-secondary">{user?.address?.city}</div>
              </div>
              <div>
                <div className="me-2 text-uppercase fw-medium">Zip Code</div>
                <div className="text-secondary">{user?.address?.zipcode}</div>
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
