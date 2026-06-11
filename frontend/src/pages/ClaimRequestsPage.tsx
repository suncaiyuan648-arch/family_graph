import { AlertCircle, ArrowLeft, CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { defaultFamilyId } from "../config/defaults";

const requests = [
  { name: "林文翰", target: "林承安（第17代）", score: "95%", phone: "138****2468", idNo: "310************9210", note: "这是我父亲的档案，希望认领并完善信息。" },
  { name: "林雨晴", target: "林若曦（第19代）", score: "72%", phone: "136****8632", idNo: "320************7754", note: "档案姓名与生日匹配，需要补充亲属证明。" },
];

export function ClaimRequestsPage() {
  return (
    <div className="custom-flow-page request-review-page">
      <header className="custom-flow-header">
        <Link to={`/family/${defaultFamilyId}/approvals`} aria-label="返回审核中心">
          <ArrowLeft size={19} />
        </Link>
        <h2>认领申请审核</h2>
        <span aria-hidden="true" />
      </header>

      <section className="relationship-rule-card">
        <ShieldCheck size={18} />
        <p>认领只允许本人提交，已故成员不可认领。族长审核时默认只查看脱敏证件和手机号。</p>
      </section>

      <main className="approval-list">
        {requests.map((item) => (
          <article className="approval-card" key={item.name}>
            <div className="approval-person">
              <span>{item.name.slice(0, 1)}</span>
              <div>
                <h3>{item.name}<em>身份认领</em></h3>
                <p>目标档案：{item.target}</p>
                <time>匹配度 {item.score}</time>
              </div>
            </div>
            <dl className="request-sensitive">
              <div><dt>手机号</dt><dd>{item.phone}</dd></div>
              <div><dt>证件号</dt><dd>{item.idNo}</dd></div>
            </dl>
            <p className="approval-note">{item.note}</p>
            <div className="approval-actions">
              <button type="button"><CheckCircle2 size={16} />同意</button>
              <button type="button" className="reject"><XCircle size={16} />拒绝</button>
              <button type="button" className="more" aria-label="要求补充材料"><AlertCircle size={16} /></button>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
