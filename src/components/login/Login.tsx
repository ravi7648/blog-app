import { NavLink, useNavigate } from "react-router-dom";
import AppBrand from "../shared/AppBrand";
import "./Login.css";
import { useLogin } from "../../hooks/useReduxDispatchers";
import { useEffect, useRef } from "react";
import User from "../../models/user";
import { SessionType } from "../../types/session";
import { TOAST_MESSAGES } from "../../constants/messages";
import { APP_ROUTES } from "../../constants/appRoutes";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useUsers } from "../../hooks/useReduxSelectors";
import useTitleSetter from "../../hooks/useTitleSetter";
import { PAGE_TITLES } from "../../constants/pageTitles";
import { showErrorToast } from "../../utils/toastUtils";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const login = useLogin();
  const users = useUsers();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  useTitleSetter(PAGE_TITLES.LOGIN);

  useEffect(() => {
    currentUser && navigate(APP_ROUTES.BLOGS);
  });

  function createSession(user: User | undefined): SessionType {
    return {
      id: user?.id || 0,
      email: user?.email || null,
    };
  }

  function loginUser(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const user = users.data?.find(
      (user: User) => user.email === email && user.password === password
    );

    if (!user) {
      showErrorToast(TOAST_MESSAGES.INVALID_CREDENTIALS);
      return;
    }
    
    const session = createSession(user);
    if (session) {
      login(session);
      navigate(APP_ROUTES.BLOGS);
    } else {
      showErrorToast(TOAST_MESSAGES.INVALID_CREDENTIALS);
    }
  }

  return (
    <div className="main-container w-100">
      <form className="form-container">
        <AppBrand theme="dark" />

        <div data-mdb-input-init className="form-outline mb-4 mt-4">
          <label className="form-label" htmlFor="login-email">
            Email address:
          </label>
          <input
            type="email"
            id="login-email"
            name="login-email"
            ref={emailRef}
            className="form-control"
            placeholder="Email Address"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="login-password">
            Password:
          </label>
          <input
            type="password"
            ref={passwordRef}
            id="login-password"
            name="login-password"
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
          <p>
            Not a member?{" "}
            {
              <NavLink to="/signup" className="text-decoration-none">
                Register
              </NavLink>
            }
          </p>
        </div>
      </form>
    </div>
  );
}
