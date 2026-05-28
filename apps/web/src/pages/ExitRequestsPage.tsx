import { AlertCircle, ArrowLeft, CheckCircle2, LogOut, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { defaultFamilyId } from "../config/defaults";

const requests = [
  { name: "林书涵", role: "普通成员", time: "2024-05-26 16:20", reason: "个人原因暂不参与家族系统维护，希望退出访问权限。", keepArchive: true },
  { name: "张秋丹", role: "普通成员", time: "2024-05-22 11:15", reason: "账号误加入家族，申请退出并隐藏联系方式。", keepArchive: true },
];

export function ExitRequestsPage() {
  return (
    <div className="custom-flow-page request-review-page">
      <header className="custom-flow-header">
        <Link to={`/family/${defaultFamilyId}/approvals`} aria-label="返回审核中心">
          <ArrowLeft size={19} />
        </Link>
        <h2>退出申请审核</h2>
        <span aria-hidden="true" />
      </header>

      <section className="relationship-rule-card">
        <LogOut size={18} />
        <p>退出家族只改变访问权限和成员状态，不删除历史档案和历史亲属关系。</p>
      </section>

      <main className="approval-list">
        {requests.map((item) => (
          <article className="approval-card" key={item.name}>
            <div className="approval-person">
              <span>{item.name.slice(0, 1)}</span>
              <div>
                <h3>{item.name}<em>退出家族</em></h3>
                <p>{item.role}</p>
                <time>{item.time}</time>
              </div>
            </div>
            <p className="approval-note">{item.reason}</p>
            <dl className="request-sensitive">
              <div><dt>保留族谱档案</dt><dd>{item.keepArchive ? "是" : "否"}</dd></div>
              <div><dt>退出后状态</dt><dd>已退出</dd></div>
            </dl>
            <div className="approval-actions">
              <button type="button"><CheckCircle2 size={16} />同意</button>
              <button type="button" className="reject"><XCircle size={16} />拒绝</button>
              <button type="button" className="more" aria-label="进一步沟通"><AlertCircle size={16} /></button>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
