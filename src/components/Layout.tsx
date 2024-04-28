import { Outlet } from "react-router-dom";
import Topnav from "./Topnav";
import "./Layout.css";
import Menu from "./Menu";
import { Suspense } from "react";
import Loader from "./shared/Loader";
import BackButton from "./shared/buttons/BackButton";

export default function Layout() {
  return (
    <div className="d-flex">
      <Menu />
      <main className="main-app">
        <Topnav />
        <div className="main-outlet d-flex flex-column align-items-center w-100 h-100 overflow-auto">
          <div className="d-flex my-3 w-100 ps-3">
            <BackButton />
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
