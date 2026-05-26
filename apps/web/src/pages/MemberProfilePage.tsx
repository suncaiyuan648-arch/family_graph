import { useParams } from "react-router-dom";
import { PageSection } from "../components/PageSection";
import { StatusBadge } from "../components/StatusBadge";
import { mockPeople } from "../mocks/family";

export function MemberProfilePage() {
  const { memberId } = useParams();
  const person = mockPeople.find((item) => item.id === memberId) ?? mockPeople[0];

  return (
    <div className="page-stack">
      <section className="profile-head">
        <div className={person.isAlive ? "avatar large" : "avatar large grayscale"}>{person.name.slice(0, 1)}</div>
        <h2>{person.name}</h2>
        <p>第 {person.generation} 代 · {person.branch ?? "未分支"}</p>
        <div className="badge-row centered">
          {person.statusTags.map((tag) => (
            <StatusBadge key={tag}>{tag}</StatusBadge>
          ))}
        </div>
      </section>
      <PageSection title="基础信息">
        <dl className="detail-grid">
          <dt>证件号码</dt>
          <dd>{person.maskedDocumentNumber ?? "未登记或仅本人可见"}</dd>
          <dt>出生日期</dt>
          <dd>{person.birthDate ?? "待补充"} · {person.birthDateType}</dd>
          <dt>是否在世</dt>
          <dd>{person.isAlive ? "在世" : `已故 · ${person.deathDate ?? "日期待补充"}`}</dd>
          <dt>现居住地</dt>
          <dd>{person.currentResidence ?? "待补充"}</dd>
        </dl>
      </PageSection>
      <PageSection title="档案信息">
        <dl className="detail-grid">
          <dt>资料整理人</dt>
          <dd>{person.createdByName}</dd>
          <dt>最后编辑人</dt>
          <dd>{person.lastEditedByName}</dd>
          <dt>资料来源</dt>
          <dd>{person.source ?? "待补充"}</dd>
          <dt>资料可信度</dt>
          <dd>{person.confidenceLevel}</dd>
          <dt>允许认领</dt>
          <dd>{person.allowClaim ? "是" : "否"}</dd>
        </dl>
      </PageSection>
      <PageSection title="后续操作入口">
        <div className="action-grid">
          <button>编辑档案</button>
          <button>申请修改关系</button>
          <button>我来认领</button>
          <button>查看编辑历史</button>
        </div>
      </PageSection>
    </div>
  );
}
