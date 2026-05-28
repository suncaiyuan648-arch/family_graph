import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
import { Link } from "react-router-dom";

const candidates = [
  {
    id: "claim-1",
    name: "林文翰",
    score: "95%",
    birth: "1998年3月",
    family: "林氏家族",
    branch: "承安支系",
    manager: "林怀古",
    matches: ["姓名匹配", "出生日期相近", "家族编号匹配"],
  },
  {
    id: "claim-2",
    name: "林文瀚",
    score: "65%",
    birth: "1998年",
    family: "林氏宗族（福建）",
    branch: "文德支系",
    manager: "林承德",
    matches: ["姓名匹配", "出生日期相近"],
  },
];

export function ClaimPage() {
  return (
    <div className="claim-page custom-flow-page">
      <header className="custom-flow-header">
        <Link to="/home" aria-label="返回">
          <ArrowLeft size={19} />
        </Link>
        <h2>认领家族身份</h2>
        <span aria-hidden="true" />
      </header>

      <section className="claim-alert">
        <Info size={17} />
        <p>系统根据您的注册信息，为您匹配到以下可能的家族档案。请仔细核对信息后申请认领。</p>
      </section>

      <main className="claim-content">
        <h3>候选档案（2）</h3>
        {candidates.map((candidate) => (
          <article className="claim-card" key={candidate.id}>
            <div className="claim-card-head">
              <span>{candidate.name.slice(0, 1)}</span>
              <div>
                <strong>{candidate.name}</strong>
                <p><em>第十八代</em><em>未注册</em></p>
              </div>
              <b>{candidate.score}<small>匹配度</small></b>
            </div>
            <dl className="claim-meta">
              <div><dt>出生年月</dt><dd>{candidate.birth}</dd></div>
              <div><dt>所属家族</dt><dd>{candidate.family}</dd></div>
              <div><dt>所属支系</dt><dd>{candidate.branch}</dd></div>
              <div><dt>资料整理人</dt><dd>{candidate.manager}</dd></div>
            </dl>
            <div className="claim-matches">
              <span>匹配信息：</span>
              {candidate.matches.map((item) => (
                <p key={item}><CheckCircle2 size={14} />{item}</p>
              ))}
            </div>
            <button type="button">申请认领此档案</button>
          </article>
        ))}

        <section className="claim-empty-actions">
          <p>如果以上都不是您的档案，您可以：</p>
          <Link to="/family/join">搜索其他家族</Link>
          <Link to="/family/create">创建新家族</Link>
        </section>
      </main>
    </div>
  );
}
