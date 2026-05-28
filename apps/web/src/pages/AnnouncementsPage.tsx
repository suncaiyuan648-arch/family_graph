import { ArrowLeft, CalendarDays, MapPin, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Announcement } from "@family-graph/shared";
import { familyApi } from "../api/familyApi";
import { defaultFamilyId } from "../config/defaults";
import { mockAnnouncements } from "../mocks/family";

const tabs = ["全部", "未读", "重要"];

export function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);

  useEffect(() => {
    let mounted = true;
    familyApi.listAnnouncements(defaultFamilyId).then((result) => {
      if (mounted) setAnnouncements(result);
    }).catch(() => {
      if (mounted) setAnnouncements(mockAnnouncements);
    });
    return () => {
      mounted = false;
    };
  }, []);

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
        {announcements.map((item) => {
          const confirmTotal = item.readCount + item.unreadCount;
          const ratio = confirmTotal ? `${Math.round((item.readCount / confirmTotal) * 100)}%` : "0%";
          return (
          <article className="announcement-card" key={item.title}>
            <div className="announcement-tags">
              <span>{item.type}</span>
              {item.priority !== "NORMAL" && <em>重要</em>}
            </div>
            <h3>{item.title}</h3>
            <p><CalendarDays size={14} />{item.publishedAt}</p>
            <p><MapPin size={14} />家族公告栏</p>
            <div className="announcement-author"><span>{item.publisherName.slice(0, 1)}</span>{item.publisherName}<time>{item.publishedAt}</time></div>
            {item.requiresConfirmation && (
              <>
                <div className="announcement-confirm"><span><Users size={14} />已确认：{item.readCount}/{confirmTotal}</span><strong>{ratio}</strong></div>
                <button type="button">确认参加</button>
              </>
            )}
          </article>
        );})}
      </main>
    </div>
  );
}
