import { useEffect, useRef } from "react";
import AppBrand from "../shared/AppBrand";
import { useAddUser } from "../../hooks/useReduxDispatchers";
import User from "../../models/user";
import { ALERT_MESSAGES } from "../../constants/messages";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useTitleSetter from "../../hooks/useTitleSetter";
import { PAGE_TITLES } from "../../constants/pageTitles";

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

  function handleSubmit() {
    if (
      nameRef.current?.value === "" ||
      usernameRef.current?.value === "" ||
      emailRef.current?.value === "" ||
      passwordRef.current?.value === "" ||
      repeatPasswordRef.current?.value === ""
    ) {
      alert(ALERT_MESSAGES.EMPTY_FIELDS);
      return;
    }

    if (passwordRef.current?.value !== repeatPasswordRef.current?.value) {
      alert(ALERT_MESSAGES.PASSWORD_MISMATCH);
      return;
    }

    const user: User = new User();
    user.name = nameRef.current?.value!;
    user.username = usernameRef.current?.value!;
    user.email = emailRef.current?.value!;
    user.password = passwordRef.current?.value!;
    user.isAdmin = true;

    addUser(user);
    alert(ALERT_MESSAGES.SIGNUP_SUCCESS);
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
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            ref={nameRef}
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter full name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            ref={usernameRef}
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter username"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerEmail">
            Email:
          </label>
          <input
            type="email"
            ref={emailRef}
            id="registerEmail"
            name="registerEmail"
            className="form-control"
            placeholder="email@xyz.com"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerPassword">
            Password:
          </label>
          <input
            type="password"
            ref={passwordRef}
            id="registerPassword"
            name="registerPassword"
            className="form-control"
            placeholder="******"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerRepeatPassword">
            Repeat password:
          </label>
          <input
            type="password"
            ref={repeatPasswordRef}
            id="registerRepeatPassword"
            name="registerRepeatPassword"
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
