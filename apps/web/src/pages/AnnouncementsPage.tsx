import { ArrowLeft, CalendarDays, MapPin, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

const tabs = ["全部", "未读", "重要"];

const announcements = [
  {
    type: "家族聚会",
    important: true,
    title: "2024年林氏宗亲春节聚会通知",
    date: "2024年2月10日",
    place: "苏州市林氏祠堂",
    author: "林怀古",
    time: "2024-05-20 10:30",
    confirm: "45/120",
    ratio: "38%",
  },
  {
    type: "普通通知",
    important: false,
    title: "家族档案数字化项目进展通报",
    author: "林文翰",
    time: "2024-05-18 14:20",
  },
  {
    type: "祭祀活动",
    important: true,
    title: "林景德公诞辰120周年纪念活动",
    date: "2024年6月15日",
    place: "林景德墓园",
    author: "林怀古",
    time: "2024-05-15 09:00",
    confirm: "78/150",
    ratio: "52%",
  },
];

export function AnnouncementsPage() {
  return (
    <div className="announcements-page custom-flow-page">
      <header className="custom-flow-header">
        <Link to="/home" aria-label="返回">
          <ArrowLeft size={19} />
        </Link>
        <h2>家族公告</h2>
        <button type="button" aria-label="发布公告">
          <Plus size={19} />
        </button>
      </header>

      <nav className="simple-tabs" aria-label="公告筛选">
        {tabs.map((tab, index) => (
          <button className={index === 0 ? "active" : ""} type="button" key={tab}>{tab}</button>
        ))}
      </nav>

      <main className="announcement-list">
        {announcements.map((item) => (
          <article className="announcement-card" key={item.title}>
            <div className="announcement-tags">
              <span>{item.type}</span>
              {item.important && <em>重要</em>}
            </div>
            <h3>{item.title}</h3>
            {item.date && <p><CalendarDays size={14} />{item.date}</p>}
            {item.place && <p><MapPin size={14} />{item.place}</p>}
            <div className="announcement-author"><span>{item.author.slice(0, 1)}</span>{item.author}<time>{item.time}</time></div>
            {item.confirm && (
              <>
                <div className="announcement-confirm"><span><Users size={14} />已确认：{item.confirm}</span><strong>{item.ratio}</strong></div>
                <button type="button">确认参加</button>
              </>
            )}
          </article>
        ))}
      </main>
    </div>
  );
}
