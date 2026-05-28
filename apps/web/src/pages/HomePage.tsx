import {
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  HandHeart,
  HelpCircle,
  MessageSquare,
  Network,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { defaultFamilyId } from "../config/defaults";
import {
  familyArchiveSummaries,
  familyTimelineItems,
  homeRecentActivities,
  mockFamily,
  mockStats,
} from "../mocks/family";

const quickLinks = [
  { label: "家族图谱", to: `/family/${defaultFamilyId}/tree`, icon: TrendingUp, tone: "gold" },
  { label: "成员档案", to: `/family/${defaultFamilyId}/members`, icon: Users, tone: "brown" },
  { label: "待审核", to: `/family/${defaultFamilyId}/approvals`, icon: ClipboardList, tone: "gold", badge: 3 },
  { label: "身份认领", to: `/family/${defaultFamilyId}/claim`, icon: UserPlus, tone: "green" },
  { label: "家族公告", to: `/family/${defaultFamilyId}/announcements`, icon: Bell, tone: "red" },
  { label: "家族大事记", to: `/family/${defaultFamilyId}/events`, icon: BookOpen, tone: "brown" },
  { label: "家族群聊", to: `/family/${defaultFamilyId}/chat`, icon: MessageSquare, tone: "gold" },
  { label: "互助平台", to: `/family/${defaultFamilyId}/marketplace`, icon: HandHeart, tone: "green" },
];

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <h2>家族档案中心</h2>
        <p>数字化传承与联络网络</p>
      </section>

      <section className="home-stats-grid" aria-label="家族统计">
        {mockStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article className="home-stat-card" key={stat.label}>
              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
              {Icon && (
                <div className="home-stat-icon" aria-hidden="true">
                  <Icon size={22} />
                </div>
              )}
              {stat.badge && <em>{stat.badge}</em>}
            </article>
          );
        })}
      </section>

      <section className="home-section">
        <h3>快捷入口</h3>
        <div className="home-quick-grid">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link className="home-quick-card" to={item.to} key={item.label}>
                <span className={`home-quick-icon ${item.tone}`}>
                  <Icon size={24} />
                  {item.badge && <em>{item.badge}</em>}
                </span>
                <strong>{item.label}</strong>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-summary-card">
        <div className="home-summary-title">
          <FileText size={20} />
          <h3>成员档案总结</h3>
        </div>
        <div className="home-progress-list">
          <ProgressRow label="直系亲属" value="42%" count="104人" color="brown" />
          <ProgressRow label="旁系亲属" value="58%" count="144人" color="sand" />
        </div>
      </section>

      <section className="home-section">
        <h3>最近动态</h3>
        <div className="home-activity-list">
          {homeRecentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <article className="home-activity-card" key={`${activity.title}-${activity.time}`}>
                <span className={`home-activity-icon ${activity.tone}`}>
                  <Icon size={21} />
                </span>
                <div>
                  <strong>{activity.title}</strong>
                  <p>{activity.time}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-section">
        <h3>成员档案总结</h3>
        <div className="home-member-summary">
          {familyArchiveSummaries.map((item) => (
            <article className="home-member-card" key={item.name}>
              <span>{item.avatar}</span>
              <div>
                <strong>
                  {item.name}
                  <small>{item.tag}</small>
                </strong>
                <p>{item.description}</p>
              </div>
              <HelpCircle size={17} />
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-title">
          <CalendarDays size={18} />
          <h3>家族大事作记</h3>
        </div>
        <div className="home-timeline">
          {familyTimelineItems.map((item) => (
            <article className={`home-timeline-item ${item.tone}`} key={item.year}>
              <time>{item.year}</time>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

interface ProgressRowProps {
  label: string;
  value: string;
  count: string;
  color: "brown" | "sand";
}

function ProgressRow({ label, value, count, color }: ProgressRowProps) {
  return (
    <div className="home-progress-row">
      <div>
        <span>
          {label} ({value})
        </span>
        <strong>{count}</strong>
      </div>
      <div className="home-progress-track">
        <span className={color} style={{ width: value }} />
      </div>
    </div>
  );
}
