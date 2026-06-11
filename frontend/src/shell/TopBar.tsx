import { Bell } from "lucide-react";
import { mockFamily } from "../mocks/family";

export function TopBar() {
  return (
    <header className="top-bar">
      <div>
        <h1>{mockFamily.name}</h1>
        <p>族长：{mockFamily.leaderName}</p>
      </div>
      <button className="top-notification" aria-label="消息通知">
        <Bell size={19} />
        <span aria-hidden="true" />
      </button>
    </header>
  );
}
