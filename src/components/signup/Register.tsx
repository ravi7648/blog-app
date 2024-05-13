import { useEffect, useRef } from "react";
import AppBrand from "../shared/AppBrand";
import { useAddUser } from "../../hooks/useReduxDispatchers";
import User from "../../models/user";
import { TOAST_MESSAGES } from "../../constants/messages";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useTitleSetter from "../../hooks/useTitleSetter";
import { PAGE_TITLES } from "../../constants/pageTitles";
import { showErrorToast, showSuccessToast, showWarningToast } from "../../utils/toastUtils";

export default function Register() {
  const navigate = useNavigate();
  const addUser = useAddUser();
  const currentUser = useCurrentUser();
  useTitleSetter(PAGE_TITLES.REGISTER);
  const [nameRef, usernameRef, emailRef, passwordRef, repeatPasswordRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    
    if (
      nameRef.current?.value === "" ||
      usernameRef.current?.value === "" ||
      emailRef.current?.value === "" ||
      passwordRef.current?.value === "" ||
      repeatPasswordRef.current?.value === ""
    ) {
      showWarningToast(TOAST_MESSAGES.EMPTY_FIELDS);
      return;
    }

    if (passwordRef.current?.value !== repeatPasswordRef.current?.value) {
      showErrorToast(TOAST_MESSAGES.PASSWORD_MISMATCH);
      return;
    }

    const user: User = new User();
    user.name = nameRef.current?.value!;
    user.username = usernameRef.current?.value!;
    user.email = emailRef.current?.value!;
    user.password = passwordRef.current?.value!;
    user.isAdmin = true;

    addUser(user);
    navigate(APP_ROUTES.LOGIN);
  }

  useEffect(() => {
    currentUser && navigate(APP_ROUTES.BLOGS);
  });

  return (
    <div className="main-container w-100">
      <form className="form-container">
        <AppBrand theme="dark" />

        <div className="my-4">
          <label htmlFor="register-name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            ref={nameRef}
            className="form-control"
            id="register-name"
            name="register-name"
            aria-describedby="emailHelp"
            placeholder="Enter full name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="register-username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            ref={usernameRef}
            className="form-control"
            id="register-username"
            name="register-username"
            placeholder="Enter username"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="register-email">
            Email:
          </label>
          <input
            type="email"
            ref={emailRef}
            id="register-email"
            name="register-email"
            className="form-control"
            placeholder="email@xyz.com"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="register-password">
            Password:
          </label>
          <input
            type="password"
            ref={passwordRef}
            id="register-password"
            name="register-password"
            className="form-control"
            placeholder="******"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="register-repeat-password">
            Repeat password:
          </label>
          <input
            type="password"
            ref={repeatPasswordRef}
            id="register-repeat-password"
            name="register-repeat-password"
            className="form-control"
            placeholder="******"
          />
        </div>

        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-primary btn-block mb-3"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
}
