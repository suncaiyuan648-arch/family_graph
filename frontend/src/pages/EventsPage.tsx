import { ArrowLeft, CalendarDays, Filter, Image, MapPin, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { FamilyEvent } from "@family-graph/shared";
import { familyApi } from "../api/familyApi";
import { defaultFamilyId } from "../config/defaults";
import { mockEvents } from "../mocks/family";

const filters = ["全部", "出生", "婚嫁", "教育", "荣誉", "聚会"];

export function EventsPage() {
  const [events, setEvents] = useState<FamilyEvent[]>(mockEvents);

  useEffect(() => {
    let mounted = true;
    familyApi.listEvents(defaultFamilyId).then((result) => {
      if (mounted) setEvents(result);
    }).catch(() => {
      if (mounted) setEvents(mockEvents);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="events-page custom-flow-page">
      <header className="custom-flow-header">
        <Link to="/home" aria-label="返回">
          <ArrowLeft size={19} />
        </Link>
        <h2>家族大事记</h2>
        <div className="flow-actions">
          <button type="button" aria-label="筛选">
            <Filter size={18} />
          </button>
          <button type="button" aria-label="新增大事记">
            <Plus size={19} />
          </button>
        </div>
      </header>

      <nav className="event-filter-row" aria-label="大事记类型">
        {filters.map((filter, index) => (
          <button className={index === 0 ? "active" : ""} type="button" key={filter}>{filter}</button>
        ))}
      </nav>

      <main className="event-timeline">
        {events.map((event) => (
          <article className="event-card" key={event.title}>
            <div className="event-tags">
              <time>{event.eventDate.slice(0, 4)}</time>
              <span>{event.eventType}</span>
              {event.importance === "IMPORTANT" && <em>重要</em>}
            </div>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            {event.location && <small><MapPin size={14} />{event.location}</small>}
            <small><Users size={14} />相关成员：{event.relatedPersonNames.join("、") || "未关联"}</small>
            <small><Image size={14} />资料图片待补充</small>
            <div className="event-recorder"><span>{event.recorderName.slice(0, 1)}</span>记录人：{event.recorderName}</div>
          </article>
        ))}
      </main>
    </div>
  );
}
