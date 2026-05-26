import { PageSection } from "../components/PageSection";
import { StatusBadge } from "../components/StatusBadge";
import { mockReviews } from "../mocks/family";

const tabs = ["加入家族", "身份认领", "关系修改", "新增成员", "退出家族", "资料修改"];

export function ApprovalsPage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <p className="eyebrow">族长审核中心</p>
        <h2>待审核总数 {mockReviews.length}</h2>
        <p>加入、认领、关系变更、退出和资料修改都应进入审核流程。</p>
      </section>
      <div className="filter-row">
        {tabs.map((tab) => (
          <button key={tab}>{tab}</button>
        ))}
      </div>
      <PageSection title="审核列表">
        <div className="member-list">
          {mockReviews.map((review) => (
            <article className="simple-card" key={review.id}>
              <div className="list-row">
                <strong>{review.applicantName}</strong>
                <StatusBadge tone="warning">待审核</StatusBadge>
              </div>
              <p>{review.summary}</p>
              <p>{review.relatedPersonName ?? "无关联成员"} · {review.submittedAt}</p>
              <div className="action-grid">
                <button>查看详情</button>
                <button>同意</button>
                <button>拒绝</button>
                <button>要求补充资料</button>
              </div>
            </article>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
