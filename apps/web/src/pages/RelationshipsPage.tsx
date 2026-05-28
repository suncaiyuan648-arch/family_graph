import { ArrowLeft, GitBranch, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { defaultFamilyId } from "../config/defaults";

const relations = [
  { type: "父亲", from: "林承安", to: "林怀古", status: "已通过", note: "父子纵向关系" },
  { type: "配偶", from: "林怀古", to: "张秋丹", status: "当前", note: "V1 简单展示，数据预留多配偶能力" },
  { type: "子女", from: "林怀古", to: "林文翰", status: "已通过", note: "父母子女核心关系" },
  { type: "子女", from: "林怀古", to: "林书涵", status: "待审核", note: "黄色虚线关系，族长审核后生效" },
];

export function RelationshipsPage() {
  return (
    <div className="custom-flow-page relationships-page">
      <header className="custom-flow-header">
        <Link to={`/family/${defaultFamilyId}/tree`} aria-label="返回图谱">
          <ArrowLeft size={19} />
        </Link>
        <h2>核心关系管理</h2>
        <button type="button" aria-label="新增关系">
          <Plus size={19} />
        </button>
      </header>

      <section className="relationship-rule-card">
        <GitBranch size={18} />
        <p>V1 仅支持父亲、母亲、配偶、子女四类核心关系。关系变更需要进入审核，避免破坏历史族谱。</p>
      </section>

      <section className="relationship-form static-form-card">
        <h3>新增关系申请</h3>
        <label className="static-field">
          <span>关系类型</span>
          <select><option>父亲</option><option>母亲</option><option>配偶</option><option>子女</option></select>
        </label>
        <label className="static-field">
          <span>成员 A</span>
          <input defaultValue="林怀古" />
        </label>
        <label className="static-field">
          <span>成员 B</span>
          <input placeholder="请选择或搜索成员" />
        </label>
        <label className="static-textarea">
          <span>申请说明</span>
          <textarea rows={3} placeholder="说明关系依据，例如旧家谱、口述资料、出生证明等" />
        </label>
        <button className="static-submit" type="button">提交关系变更申请</button>
      </section>

      <main className="relationship-list">
        {relations.map((item) => (
          <article className="relationship-card" key={`${item.type}-${item.to}`}>
            <span>{item.type}</span>
            <div>
              <h3>{item.from} → {item.to}</h3>
              <p>{item.note}</p>
            </div>
            <em className={item.status === "待审核" ? "pending" : ""}>{item.status}</em>
          </article>
        ))}
      </main>
    </div>
  );
}
