import { BookOpen, ChevronRight, GitBranch, Image, Lock, Settings, Shield, User } from "lucide-react";
import { Link } from "react-router-dom";
import { defaultFamilyId } from "../config/defaults";

const profileItems = [
  { label: "我的家族", icon: User, tone: "pink", to: `/family/${defaultFamilyId}` },
  { label: "关系申请", icon: GitBranch, tone: "yellow", to: `/family/${defaultFamilyId}/relationships` },
  { label: "权限与隐私", icon: Shield, tone: "blue", to: "/settings" },
  { label: "隐私政策", icon: Lock, tone: "green", to: "/settings" },
  { label: "V2 云端备份", icon: BookOpen, tone: "gray", badge: "预留", to: "/settings" },
  { label: "意见反馈", icon: Image, tone: "purple", to: "/settings" },
];

export function ProfilePage() {
  return (
    <div className="profile-center-page">
      <header className="profile-center-header">
        <h2>家族族谱</h2>
        <Link to="/settings" aria-label="设置">
          <Settings size={18} />
        </Link>
      </header>

      <section className="profile-center-hero">
        <div className="profile-center-avatar">林<span><Settings size={14} /></span></div>
        <h1>林怀古</h1>
        <p>第十八代 · 族长</p>
        <div>
          <strong>248<small>家族成员</small></strong>
          <strong>45<small>编辑记录</small></strong>
          <strong>高<small>可信度</small></strong>
        </div>
      </section>

      <main className="profile-center-list">
        {profileItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link to={item.to} key={item.label}>
              <span className={item.tone}><Icon size={20} /></span>
              <strong>{item.label}</strong>
              {item.badge && <em>{item.badge}</em>}
              <ChevronRight size={19} />
            </Link>
          );
        })}
      </main>
    </div>
  );
}
