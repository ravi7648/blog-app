import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";
import { ALERT_MESSAGES } from "../../constants/messages";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEditUser, useModifySession } from "../../hooks/useReduxDispatchers";
import useUserRef from "../../hooks/useUserRef";
import User from "../../models/user";

export default function ProfileEditForm({ user, isOwner }: { user: User | null, isOwner: boolean }) {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const userRef = useUserRef();
  const editUser = useEditUser();
  const modifySession = useModifySession();

  function saveUser() {
    const modifiedUser: User = {
      id: user?.id || 0,
      name: userRef.name.current?.value || user?.name || "",
      email: userRef.email.current?.value || user?.email || "",
      phone: userRef.contact.current?.value || user?.phone || "",
      company: user?.company || null,
      website: userRef.website.current?.value || user?.website || "",
      address: user?.address || null,
      username: user?.username || "",
      password: user?.password || "",
      isAdmin: user?.isAdmin || false,
    };

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
      alert(ALERT_MESSAGES.PROFILE_UPDATED);
    } else {
      alert(ALERT_MESSAGES.PASSWORD_MISMATCH);
    }
  }

  function handleCancel(event: FormEvent) {
    event.preventDefault();
    navigate(APP_ROUTES.PROFILE);
  }

  return (
    <form className="border-cover mt-5 child-mb">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          ref={userRef.name}
          className="form-control"
          id="name"
          defaultValue={user?.name}
          placeholder="Full Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          ref={userRef.email}
          className="form-control"
          id="email"
          defaultValue={user?.email}
          placeholder="Email Address"
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact">Contact</label>
        <input
          type="string"
          ref={userRef.contact}
          className="form-control"
          id="contact"
          defaultValue={user?.phone || ""}
          placeholder="Contact"
        />
      </div>
      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          ref={userRef.website}
          className="form-control"
          id="website"
          defaultValue={user?.website || ""}
          placeholder="your.domain.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          ref={userRef.password}
          className="form-control"
          id="confirmPassword"
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
