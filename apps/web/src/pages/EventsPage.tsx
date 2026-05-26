import { PageSection } from "../components/PageSection";
import { mockEvents } from "../mocks/family";

export function EventsPage() {
  return (
    <div className="page-stack">
      <section className="toolbar-panel">
        <input placeholder="筛选时间、类型、相关成员" />
        <button>时间轴</button>
        <button>列表</button>
      </section>
      <PageSection title="家族大事记">
        <div className="timeline">
          {mockEvents.map((event) => (
            <article className="simple-card" key={event.id}>
              <time>{event.eventDate}</time>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.eventType} · {event.location ?? "地点待补充"} · 记录人 {event.recorderName}</p>
            </article>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
