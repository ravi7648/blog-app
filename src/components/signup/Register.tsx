import { useEffect, useRef } from "react";
import AppBrand from "../common/AppBrand";
import { useAppDispatch } from "../../hooks/dispatcher";
import User from "../../models/user";
import { ALERT_MESSAGES } from "../../constants/messages";
import { addUserAsync } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";
import { PAGE_TITLES } from "../../constants/pageTitles";
import { useAppSelector } from "../../hooks/selector";
import { currentSession } from "../../redux/slices/sessionSlice";

export default function Register() {
  const [nameRef, usernameRef, emailRef, passwordRef, repeatPasswordRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = useAppSelector(currentSession);

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

    const user: User = {
      id: 0,
      name: nameRef.current?.value!,
      username: usernameRef.current?.value!,
      email: emailRef.current?.value!,
      password: passwordRef.current?.value!,
      company: null,
      address: null,
      phone: null,
      website: null,
    };

    dispatch(addUserAsync(user));
    alert(ALERT_MESSAGES.SIGNUP_SUCCESS);
    navigate(APP_ROUTES.LOGIN);
  }

  useEffect(() => {
    document.title = PAGE_TITLES.REGISTER;
    session.loggedIn && navigate(APP_ROUTES.POSTS);
  });

  return (
    <div className="main-container">
      <form className="form-container">
        <AppBrand />

        <div className="my-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name:
          </label>
          <input
            type="text"
            ref={nameRef}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter full name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Username:
          </label>
          <input
            type="text"
            ref={usernameRef}
            className="form-control"
            id="exampleInputPassword1"
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
