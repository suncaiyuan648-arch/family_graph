import { AlertCircle, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { ReviewItem } from "@family-graph/shared";
import { familyApi } from "../api/familyApi";
import { defaultFamilyId } from "../config/defaults";
import { mockReviews } from "../mocks/family";

const tabs = ["全部", "加入家族", "身份认领", "关系修改"];

export function ApprovalsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(mockReviews);
  const summary = useMemo(() => [
    [String(reviews.filter((item) => item.status === "PENDING").length), "待审核"],
    [String(reviews.filter((item) => item.type === "JOIN_FAMILY").length), "加入申请"],
    [String(reviews.filter((item) => item.type === "CLAIM_PROFILE").length), "认领申请"],
    [String(reviews.filter((item) => item.type === "RELATIONSHIP_CHANGE").length), "关系变更"],
  ], [reviews]);

  useEffect(() => {
    let mounted = true;
    familyApi.listApprovals(defaultFamilyId).then((result) => {
      if (mounted) setReviews(result);
    }).catch(() => {
      if (mounted) setReviews(mockReviews);
    });
    return () => {
      mounted = false;
    };
  }, []);

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
          <article className="approval-card" key={review.id}>
            <div className="approval-person">
              <span>{review.applicantName.slice(0, 1)}</span>
              <div>
                <h3>{review.applicantName}<em>{reviewTypeLabel(review.type)}</em></h3>
                <p>{review.relatedPersonName ? `目标档案：${review.relatedPersonName}` : "家族申请"}</p>
                <time>{review.submittedAt}</time>
              </div>
            </div>
            <p className="approval-note">{review.summary}</p>
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

function reviewTypeLabel(type: ReviewItem["type"]) {
  const map: Record<ReviewItem["type"], string> = {
    JOIN_FAMILY: "加入家族",
    CLAIM_PROFILE: "身份认领",
    RELATIONSHIP_CHANGE: "关系变更",
    ADD_UNREGISTERED_MEMBER: "新增成员",
    EXIT_FAMILY: "退出家族",
    PROFILE_CHANGE: "档案修改",
  };
  return map[type];
}
