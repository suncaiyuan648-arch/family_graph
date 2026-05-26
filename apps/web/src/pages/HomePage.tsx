import { Link } from "react-router-dom";
import { PageSection } from "../components/PageSection";
import { familyId } from "../routes";
import { mockFamily, mockStats, recentActivities } from "../mocks/family";

const quickLinks = [
  ["家族图谱", `/family/${familyId}/tree`],
  ["成员档案", `/family/${familyId}/members`],
  ["待审核", `/family/${familyId}/approvals`],
  ["身份认领", `/family/${familyId}/claim`],
  ["家族公告", `/family/${familyId}/announcements`],
  ["家族大事记", `/family/${familyId}/events`],
  ["家族群聊", `/family/${familyId}/chat`],
  ["互助平台", `/family/${familyId}/marketplace`],
  ["AI 分析", `/family/${familyId}/ai`],
];

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <p className="eyebrow">当前家族 · {mockFamily.code}</p>
        <h2>{mockFamily.name}</h2>
        <p>{mockFamily.description}</p>
      </section>
      <PageSection title="家族统计">
        <div className="stats-grid">
          {mockStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </PageSection>
      <PageSection title="快捷入口">
        <div className="shortcut-grid">
          {quickLinks.map(([label, to]) => (
            <Link className="shortcut-card" to={to} key={label}>
              {label}
            </Link>
          ))}
        </div>
      </PageSection>
      <PageSection title="最近动态">
        <ul className="activity-list">
          {recentActivities.map((activity) => (
            <li key={activity}>{activity}</li>
          ))}
        </ul>
      </PageSection>
    </div>
  );
}
