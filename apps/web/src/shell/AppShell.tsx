import { Outlet } from "react-router-dom";
import { BottomTabs } from "./BottomTabs";
import { TopBar } from "./TopBar";

export function AppShell() {
  return (
    <div className="app-shell">
      <TopBar />
      <main className="app-main">
        <Outlet />
      </main>
      <BottomTabs />
    </div>
  );
}
