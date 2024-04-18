import { NavLink, useNavigate } from "react-router-dom";
import AppBrand from "../common/AppBrand";
import "./Login.css";
import { useAppDispatch } from "../../hooks/dispatcher";
import { login } from "../../redux/slices/sessionSlice";
import { useEffect, useRef } from "react";
import User from "../../models/user";
import { SessionType } from "../../types/session";
import { ALERT_MESSAGES } from "../../constants/messages";
import { APP_ROUTES } from "../../constants/appRoutes";
import { useCurrentUser } from "../../hooks/session";
import { useUsers } from "../../hooks/selector";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const users = useUsers();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
    currentUser && navigate(APP_ROUTES.POSTS);
  });

  function createSession(user: User | undefined): SessionType {
    return {
      id: user?.id || 0,
      email: user?.email || null,
    };
  }

  function loginUser() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const user = users.data?.find(
      (user: User) => user.email === email && user.password === password
    );

    const session = createSession(user);
    if (session) {
      dispatch(login(session));
      navigate(APP_ROUTES.POSTS);
      alert(ALERT_MESSAGES.LOGIN_SUCCESS);
    } else {
      alert(ALERT_MESSAGES.INVALID_CREDENTIALS);
    }
  }

  return (
    <div className="main-container">
      <form className="form-container">
        <AppBrand />

        <div data-mdb-input-init className="form-outline mb-4 mt-4">
          <label className="form-label" htmlFor="form2Example1">
            Email address:
          </label>
          <input
            type="email"
            ref={emailRef}
            id="form2Example1"
            className="form-control"
            placeholder="Email Address"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">
            Password:
          </label>
          <input
            type="password"
            ref={passwordRef}
            id="form2Example2"
            className="form-control"
            placeholder="******"
          />
        </div>

        <button
          type="button"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-primary btn-block mb-4"
          onClick={loginUser}
        >
          Sign in
        </button>

        <div className="text-center">
          <p>Not a member? {<NavLink to="/signup">Register</NavLink>}</p>
        </div>
      </form>
    </div>
  );
}
