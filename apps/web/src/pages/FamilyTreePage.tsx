import { Grid3X3, List, Network, Search, ZoomIn, ZoomOut } from "lucide-react";

const filters = ["全部成员", "代际", "支系", "地区", "在世/已故", "已注册/未注册"];

const treeNodes = [
  { id: "lin-jingde", name: "林景德", generation: "第16代", x: 178, y: 78, status: "已故", muted: true },
  { id: "lin-chengan", name: "林承安", generation: "第17代", x: 100, y: 220, status: "", muted: false },
  { id: "lin-ensheng", name: "林恩生", generation: "第17代", x: 262, y: 210, status: "已故", muted: true },
  { id: "lin-wenhan", name: "林文翰", generation: "第18代", x: 70, y: 360, status: "", muted: false },
  { id: "lin-huaigu", name: "林怀古", generation: "第18代", x: 184, y: 365, status: "", muted: false },
  { id: "lin-ruoxi", name: "林若曦", generation: "第19代", x: 38, y: 500, status: "待审核", muted: false },
];

const treeLines = ["line-a", "line-b", "line-c", "line-d", "line-e pending"];

export function FamilyTreePage() {
  return (
    <div className="family-tree-page">
      <section className="tree-toolbar">
        <div className="tree-toolbar-title">
          <h2>家族图谱</h2>
          <div className="tree-view-actions" aria-label="图谱视图">
            <button type="button" aria-label="网格视图">
              <Grid3X3 size={17} />
            </button>
            <button type="button" aria-label="关系图">
              <Network size={17} />
            </button>
            <button type="button" className="active" aria-label="列表视图">
              <List size={18} />
            </button>
            <button type="button" aria-label="缩小">
              <ZoomOut size={17} />
            </button>
            <button type="button" aria-label="放大">
              <ZoomIn size={17} />
            </button>
          </div>
        </div>
        <label className="tree-search">
          <Search size={18} />
          <input placeholder="搜索成员" />
        </label>
        <div className="tree-filter-row">
          {filters.map((filter, index) => (
            <button className={index === 0 ? "active" : ""} type="button" key={filter}>
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="tree-stage" aria-label="家族关系图">
        {treeLines.map((line) => (
          <span className={`tree-line ${line}`} key={line} />
        ))}
        {treeNodes.map((node) => (
          <article
            className={`tree-person-node ${node.muted ? "muted" : ""} ${node.status === "待审核" ? "unregistered" : ""}`}
            style={{ left: node.x, top: node.y }}
            key={node.id}
          >
            <div>{node.name.slice(0, 1)}</div>
            <strong>{node.name}</strong>
            <span>{node.generation}</span>
            {node.status && <em>{node.status}</em>}
          </article>
        ))}
        <div className="tree-legend">
          <span><i className="alive" />在世</span>
          <span><i className="dead" />已故</span>
          <span><i className="pending" />待审核</span>
        </div>
      </section>
    </div>
  );
}
