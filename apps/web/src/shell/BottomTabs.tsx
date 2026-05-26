import { Archive, Home, MessageCircle, Network, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { familyId } from "../routes";

const tabs = [
  { to: "/home", label: "首页", icon: Home },
  { to: `/family/${familyId}/tree`, label: "图谱", icon: Network },
  { to: `/family/${familyId}/members`, label: "档案", icon: Archive },
  { to: `/family/${familyId}/chat`, label: "消息", icon: MessageCircle },
  { to: "/profile", label: "我的", icon: User },
];

export function BottomTabs() {
  return (
    <nav className="bottom-tabs" aria-label="底部导航">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink key={tab.to} to={tab.to} className={({ isActive }) => (isActive ? "active" : "")}>
            <Icon size={20} />
            <span>{tab.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
