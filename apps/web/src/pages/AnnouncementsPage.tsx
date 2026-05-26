import { PageSection } from "../components/PageSection";
import { StatusBadge } from "../components/StatusBadge";
import { mockAnnouncements } from "../mocks/family";

export function AnnouncementsPage() {
  return (
    <div className="page-stack">
      <PageSection title="家族公告" action={<button>发布公告</button>}>
        <div className="member-list">
          {mockAnnouncements.map((item) => (
            <article className="simple-card" key={item.id}>
              <div className="list-row">
                <strong>{item.title}</strong>
                <StatusBadge tone={item.priority === "IMPORTANT" ? "warning" : "default"}>{item.type}</StatusBadge>
              </div>
              <p>{item.publisherName} · {item.publishedAt}</p>
              <p>已读 {item.readCount}，未读 {item.unreadCount}</p>
            </article>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
