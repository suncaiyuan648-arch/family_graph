import { Outlet, useLocation } from "react-router-dom";
import { BottomTabs } from "./BottomTabs";
import { TopBar } from "./TopBar";

export function AppShell() {
  const { pathname } = useLocation();
  const hideTopBar =
    pathname === "/profile" ||
    pathname === "/settings" ||
    /\/family\/[^/]+\/(tree|members|relationships|approvals|claim|claim-requests|announcements|events|exit-request|exit-requests|chat|marketplace|ai)$/.test(pathname);

  return (
    <div className={`app-shell ${hideTopBar ? "no-top-bar" : ""}`}>
      {!hideTopBar && <TopBar />}
      <main className="app-main">
        <Outlet />
      </main>
      <BottomTabs />
    </div>
  );
}
