import { Plus, Search, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { defaultFamilyId } from "../config/defaults";
import { mockPeople } from "../mocks/family";

const filters = ["全部", "已注册", "未注册", "已故", "在世", "待认领", "资料待确认"];

export function MembersPage() {
  return (
    <div className="members-page">
      <section className="members-toolbar">
        <div className="members-title-row">
          <h2>成员档案</h2>
          <button type="button" aria-label="分享">
            <Share2 size={17} />
          </button>
        </div>
        <label className="members-search">
          <Search size={18} />
          <input placeholder="搜索家族成员" />
        </label>
        <div className="members-filter-row">
          {filters.map((filter, index) => (
            <button type="button" className={index === 0 ? "active" : ""} key={filter}>
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="members-list">
        {mockPeople.map((person) => (
          <Link className="archive-member-card" to={`/family/${defaultFamilyId}/member/${person.id}`} key={person.id}>
            <span className={person.isAlive ? "" : "muted"}>{person.name.slice(0, 1)}</span>
            <div>
              <h3>
                {person.name}
                {person.generation && <small>第{toChineseGeneration(person.generation)}代</small>}
                {person.statusTags.slice(1, 2).map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </h3>
              <p>{person.biography ?? person.source ?? "家族档案信息待补充..."}</p>
            </div>
            <i>›</i>
          </Link>
        ))}
      </section>

      <Link className="members-add-button" to={`/family/${defaultFamilyId}/unregistered-members/new`} aria-label="添加成员">
        <Plus size={22} />
      </Link>
    </div>
  );
}

function toChineseGeneration(generation: number) {
  const map: Record<number, string> = {
    1: "一",
    2: "二",
    8: "八",
    9: "九",
    10: "十",
    16: "十六",
    17: "十七",
    18: "十八",
    19: "十九",
  };
  return map[generation] ?? String(generation);
}
