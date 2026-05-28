import { ArrowLeft, CalendarDays, Filter, Image, MapPin, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

const filters = ["全部", "出生", "婚嫁", "教育", "荣誉", "聚会"];

const events = [
  {
    year: "1921",
    type: "教育",
    title: "林氏书院落成",
    detail: "始祖宗亲公在苏州创办家族书院，开启家族重视教育的传统。",
    place: "苏州",
    people: "林宗荣",
    photos: "1 张图片",
    recorder: "林怀古",
    important: true,
  },
  {
    year: "1952",
    type: "聚会",
    title: "家族首次全国聚会",
    detail: "第一届全国林氏宗亲大会召开，确立家族联系机制。",
    place: "北京",
    people: "林景德、林承安",
    photos: "3 张图片",
    recorder: "林文翰",
    important: true,
  },
  {
    year: "1978",
    type: "荣誉",
    title: "林承安获评高级工程师",
    detail: "林承安同志因杰出工程贡献获评高级工程师职称。",
    place: "",
    people: "林承安",
    photos: "",
    recorder: "林怀古",
    important: false,
  },
];

export function EventsPage() {
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
              <time>{event.year}</time>
              <span>{event.type}</span>
              {event.important && <em>重要</em>}
            </div>
            <h3>{event.title}</h3>
            <p>{event.detail}</p>
            {event.place && <small><MapPin size={14} />{event.place}</small>}
            <small><Users size={14} />相关成员：{event.people}</small>
            {event.photos && <small><Image size={14} />{event.photos}</small>}
            <div className="event-recorder"><span>{event.recorder.slice(0, 1)}</span>记录人：{event.recorder}</div>
          </article>
        ))}
      </main>
    </div>
  );
}
