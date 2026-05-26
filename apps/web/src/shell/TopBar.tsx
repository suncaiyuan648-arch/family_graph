import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { mockFamily, mockViewer } from "../mocks/family";

export function TopBar() {
  return (
    <header className="top-bar">
      <div>
        <p className="eyebrow">{mockFamily.name}</p>
        <h1>家族档案中心</h1>
      </div>
      <div className="icon-actions">
        <button aria-label="消息">
          <Bell size={20} />
        </button>
        <Link aria-label="设置" to="/settings">
          <Settings size={20} />
        </Link>
      </div>
      <span className="role-chip">{mockViewer.familyRoleLabel}</span>
    </header>
  );
}
