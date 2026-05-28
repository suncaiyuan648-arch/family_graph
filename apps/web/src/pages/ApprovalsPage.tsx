import { AlertCircle, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const summary = [
  ["3", "待审核"],
  ["1", "加入申请"],
  ["1", "认领申请"],
  ["1", "关系变更"],
];

const tabs = ["全部", "加入家族", "身份认领", "关系修改"];

const reviews = [
  { name: "张秋丹", type: "加入家族", target: "林怀古的配偶", time: "2024-05-26 10:30", note: "希望加入林氏家族，我是林怀古的配偶。" },
  { name: "林文翰", type: "身份认领", target: "目标档案：林承安（第17代）", time: "2024-05-25 14:20", note: "这是我父亲的档案，希望认领并完善信息。" },
  { name: "林书涵", type: "关系变更", target: "申请添加父亲：林文翰", time: "2024-05-24 16:45", note: "补充家庭关系信息。" },
];

export function ApprovalsPage() {
  return (
    <div className="approvals-page custom-flow-page">
      <header className="custom-flow-header">
        <Link to="/home" aria-label="返回">
          <ArrowLeft size={19} />
        </Link>
        <h2>审核中心</h2>
        <span aria-hidden="true" />
      </header>

      <section className="approval-summary">
        {summary.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <nav className="approval-tabs" aria-label="审核类型">
        {tabs.map((tab, index) => (
          <button className={index === 0 ? "active" : ""} type="button" key={tab}>{tab}</button>
        ))}
      </nav>

      <main className="approval-list">
        {reviews.map((review) => (
          <article className="approval-card" key={review.name}>
            <div className="approval-person">
              <span>{review.name.slice(0, 1)}</span>
              <div>
                <h3>{review.name}<em>{review.type}</em></h3>
                <p>{review.target}</p>
                <time>{review.time}</time>
              </div>
            </div>
            <p className="approval-note">{review.note}</p>
            <div className="approval-actions">
              <button type="button"><CheckCircle2 size={16} />同意</button>
              <button type="button" className="reject"><XCircle size={16} />拒绝</button>
              <button type="button" className="more" aria-label="查看详情"><AlertCircle size={16} /></button>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
