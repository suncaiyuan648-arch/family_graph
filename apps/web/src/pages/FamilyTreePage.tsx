import { PageSection } from "../components/PageSection";
import { StatusBadge } from "../components/StatusBadge";
import { mockTreeEdges, mockTreeNodes } from "../mocks/family";

export function FamilyTreePage() {
  return (
    <div className="page-stack tree-page">
      <section className="toolbar-panel">
        <input placeholder="搜索成员姓名、支系或代际" />
        <button>筛选</button>
        <button>树状图</button>
        <button>全屏</button>
      </section>
      <PageSection title="家族图谱">
        <div className="tree-canvas">
          {mockTreeNodes.map((node) => (
            <article
              className={[
                "tree-node",
                !node.isRegistered ? "unregistered" : "",
                !node.isAlive ? "deceased" : "",
              ].join(" ")}
              key={node.id}
            >
              <div className="avatar">{node.name.slice(0, 1)}</div>
              <strong>{node.name}</strong>
              <span>第 {node.generation ?? "-"} 代 · {node.branch ?? "未分支"}</span>
              <div className="badge-row">
                {node.statusTags.map((tag) => (
                  <StatusBadge key={tag} tone={tag === "已故" ? "muted" : tag === "资料待确认" ? "warning" : "default"}>
                    {tag}
                  </StatusBadge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection title="关系边 Mock">
        <div className="list-card">
          {mockTreeEdges.map((edge) => (
            <div className="list-row" key={edge.id}>
              <span>{edge.relationType}</span>
              <StatusBadge tone={edge.status === "PENDING" ? "warning" : "success"}>{edge.status}</StatusBadge>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
