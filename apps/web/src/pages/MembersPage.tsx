import { Link } from "react-router-dom";
import { PageSection } from "../components/PageSection";
import { StatusBadge } from "../components/StatusBadge";
import { mockPeople } from "../mocks/family";
import { familyId } from "../routes";

const filters = ["全部", "已注册", "未注册", "已故", "在世", "待认领", "资料待确认", "待审核关系"];

export function MembersPage() {
  return (
    <div className="page-stack">
      <section className="toolbar-panel">
        <input placeholder="搜索姓名、曾用名、支系、资料整理人" />
        <button>筛选</button>
        <button>批量操作</button>
      </section>
      <div className="filter-row">
        {filters.map((filter) => (
          <button key={filter}>{filter}</button>
        ))}
      </div>
      <PageSection title="成员档案">
        <div className="member-list">
          {mockPeople.map((person) => (
            <Link className="member-card" to={`/family/${familyId}/member/${person.id}`} key={person.id}>
              <div className={person.isAlive ? "avatar" : "avatar grayscale"}>{person.name.slice(0, 1)}</div>
              <div>
                <h3>{person.name}</h3>
                <p>第 {person.generation} 代 · {person.branch ?? "未分支"} · {person.currentResidence ?? person.nativePlace ?? "地区待补充"}</p>
                <p>资料由 {person.createdByName} 整理，最后编辑：{person.lastEditedByName}</p>
                <div className="badge-row">
                  {person.statusTags.map((tag) => (
                    <StatusBadge key={tag} tone={tag === "已故" ? "muted" : tag === "资料待确认" ? "warning" : "default"}>
                      {tag}
                    </StatusBadge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
