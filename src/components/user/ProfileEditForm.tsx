import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";
import { TOAST_MESSAGES } from "../../constants/messages";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEditUser, useModifySession } from "../../hooks/useReduxDispatchers";
import useUserRef from "../../hooks/useUserRef";
import User from "../../models/user";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

export default function ProfileEditForm({
  user,
  isOwner,
}: {
  user: User | null;
  isOwner: boolean;
}) {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const userRef = useUserRef();
  const editUser = useEditUser();
  const modifySession = useModifySession();

  function saveUser() {
    const modifiedUser: User = new User();
    modifiedUser.id = user?.id || 0;
    modifiedUser.name = userRef.name.current?.value || user?.name || "";
    modifiedUser.email = userRef.email.current?.value || user?.email || "";
    modifiedUser.phone = userRef.contact.current?.value || user?.phone || "";
    modifiedUser.company = user?.company || null;
    modifiedUser.website =
      userRef.website.current?.value || user?.website || "";
    modifiedUser.address = user?.address || null;
    modifiedUser.username = user?.username || "";
    modifiedUser.password = user?.password || "";
    modifiedUser.isAdmin = user?.isAdmin || false;

    editUser(modifiedUser);
    modifySession({ id: user?.id, email: user?.email });
  }

  function handleSave(event: FormEvent) {
    event.preventDefault();
    if (
      user?.password === userRef.password.current?.value ||
      (!isOwner && currentUser?.isAdmin)
    ) {
      saveUser();
      navigate(APP_ROUTES.PROFILE);
    } else {
      showErrorToast(TOAST_MESSAGES.PASSWORD_MISMATCH);
    }
  }

  function handleCancel(event: FormEvent) {
    event.preventDefault();
    navigate(APP_ROUTES.PROFILE);
  }

  return (
    <form className="border-cover mt-5 child-mb">
      <div className="form-group">
        <label htmlFor="profile-edit-name">Name</label>
        <input
          type="text"
          ref={userRef.name}
          className="form-control"
          id="profile-edit-name"
          name="profile-edit-name"
          defaultValue={user?.name}
          placeholder="Full Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile-edit-email">Email</label>
        <input
          type="email"
          ref={userRef.email}
          className="form-control"
          id="profile-edit-email"
          name="profile-edit-email"
          defaultValue={user?.email}
          placeholder="Email Address"
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile-edit-contact">Contact</label>
        <input
          type="string"
          ref={userRef.contact}
          className="form-control"
          id="profile-edit-contact"
          name="profile-edit-contact"
          defaultValue={user?.phone || ""}
          placeholder="Contact"
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile-edit-website">Website</label>
        <input
          type="text"
          ref={userRef.website}
          className="form-control"
          id="profile-edit-website"
          name="profile-edit-website"
          defaultValue={user?.website || ""}
          placeholder="your.domain.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile-edit-confirm-password">Confirm Password</label>
        <input
          type="password"
          ref={userRef.password}
          className="form-control"
          id="profile-edit-confirm-password"
          name="profile-edit-confirm-password"
          placeholder="********"
          disabled={isOwner && !currentUser?.isAdmin}
        />
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
