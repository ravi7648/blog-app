import { MouseEventHandler, useState } from "react";
import { APP_ROUTES } from "../../constants/appRoutes";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../shared/buttons/ToggleButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useUserInfoVisibility from "../../hooks/useUserInfoVisibility";
import { useUpdateUserInfoVisibility } from "../../hooks/useReduxDispatchers";
import UserInfoVisibility from "../../models/userInfoVisibility";

export default function ManageVisibility() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const updateUserInfoVisibility = useUpdateUserInfoVisibility();
  const userInfoVisibility = useUserInfoVisibility(currentUser?.id || 0);
  const [userInfoVisibilityState, setUserInfoVisibilityState] = useState(
    userInfoVisibility || new UserInfoVisibility(currentUser!)
  );

  const handleSave: MouseEventHandler = (event) => {
    event.preventDefault();

    updateUserInfoVisibility(userInfoVisibilityState);
    navigate(APP_ROUTES.PROFILE);
  };

  const handleCancel: MouseEventHandler = (event) => {
    event.preventDefault();
    navigate(APP_ROUTES.PROFILE);
  };

  return (
    <form className="border-cover mt-5 child-mb">
      <h3 className="mb-3"> Manage profile visibility</h3>
      <div className="d-flex gap-3">
        <span>
          <label
            htmlFor="user-name-visibility-toogle-button"
            className="form-label"
          >
            Name:{" "}
          </label>
          <ToggleButton
            id="user-name-visibility-toogle-button"
            name="user-name-visibility-toogle-button"
            className="ms-3"
            initialState={userInfoVisibilityState?.name}
            onToggle={(value: boolean) =>
              setUserInfoVisibilityState({
                ...userInfoVisibilityState,
                name: value,
              })
            }
          />
        </span>
        <span>
          <label
            htmlFor="user-username-visibility-toogle-button"
            className="form-label"
          >
            Username:{" "}
          </label>
          <ToggleButton
            id="user-username-visibility-toogle-button"
            name="user-username-visibility-toogle-button"
            className="ms-3"
            initialState={userInfoVisibilityState?.username}
            onToggle={(value: boolean) =>
              setUserInfoVisibilityState({
                ...userInfoVisibilityState,
                username: value,
              })
            }
          />
        </span>
        <span>
          <label
            htmlFor="user-email-visibility-toogle-button"
            className="form-label"
          >
            Email:
          </label>
          <ToggleButton
            id="user-email-visibility-toogle-button"
            name="user-email-visibility-toogle-button"
            className="ms-3"
            initialState={userInfoVisibilityState?.email}
            onToggle={(value: boolean) =>
              setUserInfoVisibilityState({
                ...userInfoVisibilityState,
                email: value,
              })
            }
          />
        </span>
        <span>
          <label
            htmlFor="user-address-visibility-toogle-button"
            className="form-label"
          >
            Address:
          </label>
          <ToggleButton
            id="user-address-visibility-toogle-button"
            name="user-address-visibility-toogle-button"
            className="ms-3"
            initialState={userInfoVisibilityState?.address}
            onToggle={(value: boolean) =>
              setUserInfoVisibilityState({
                ...userInfoVisibilityState,
                address: value,
              })
            }
          />
        </span>
        <span>
          <label
            htmlFor="user-phone-visibility-toogle-button"
            className="form-label"
          >
            Phone:
          </label>
          <ToggleButton
            id="user-phone-visibility-toogle-button"
            name="user-phone-visibility-toogle-button"
            className="ms-3"
            initialState={userInfoVisibilityState?.phone}
            onToggle={(value: boolean) =>
              setUserInfoVisibilityState({
                ...userInfoVisibilityState,
                phone: value,
              })
            }
          />
        </span>
        <span>
          <label
            htmlFor="user-website-visibility-toogle-button"
            className="form-label"
          >
            Website:
          </label>
          <ToggleButton
            id="user-website-visibility-toogle-button"
            name="user-website-visibility-toogle-button"
            className="ms-3"
            initialState={userInfoVisibilityState?.website}
            onToggle={(value: boolean) =>
              setUserInfoVisibilityState({
                ...userInfoVisibilityState,
                website: value,
              })
            }
          />
        </span>
        <span>
          <label
            htmlFor="user-company-visibility-toogle-button"
            className="form-label"
          >
            Company:{" "}
          </label>
          <ToggleButton
            id="user-company-visibility-toogle-button"
            name="user-company-visibility-toogle-button"
            className="ms-3"
            initialState={userInfoVisibilityState?.company}
            onToggle={(value: boolean) =>
              setUserInfoVisibilityState({
                ...userInfoVisibilityState,
                company: value,
              })
            }
          />
        </span>
      </div>
      <button
        type="submit"
        className="btn btn-primary me-3"
        onClick={handleSave}
      >
        Save
      </button>
      <button type="submit" className="btn btn-danger" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
