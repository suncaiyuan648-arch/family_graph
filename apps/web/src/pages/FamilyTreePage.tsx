import { Grid3X3, List, Network, Search, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FamilyTreeNode } from "@family-graph/shared";
import { familyApi } from "../api/familyApi";
import { defaultFamilyId } from "../config/defaults";
import { mockTreeNodes } from "../mocks/family";

const filters = ["全部成员", "代际", "支系", "地区", "在世/已故", "已注册/未注册"];

const treeLines = ["line-a", "line-b", "line-c", "line-d", "line-e pending"];

export function FamilyTreePage() {
  const [nodes, setNodes] = useState<FamilyTreeNode[]>(mockTreeNodes);
  const positionedNodes = useMemo(() => nodes.slice(0, 6).map((node, index) => ({
    ...node,
    x: [178, 100, 262, 70, 184, 38][index] ?? 120,
    y: [78, 220, 210, 360, 365, 500][index] ?? (100 + index * 80),
  })), [nodes]);

  useEffect(() => {
    let mounted = true;
    familyApi.getTree(defaultFamilyId).then((result) => {
      if (mounted) setNodes(result.nodes);
    }).catch(() => {
      if (mounted) setNodes(mockTreeNodes);
    });
    return () => {
      mounted = false;
    };
  }, []);

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
        {positionedNodes.map((node) => {
          const status = node.statusTags.includes("待认领") ? "待审核" : node.isAlive ? "" : "已故";
          return (
          <article
            className={`tree-person-node ${!node.isAlive ? "muted" : ""} ${status === "待审核" ? "unregistered" : ""}`}
            style={{ left: node.x, top: node.y }}
            key={node.id}
          >
            <div>{node.name.slice(0, 1)}</div>
            <strong>{node.name}</strong>
            <span>第{node.generation ?? "-"}代</span>
            {status && <em>{status}</em>}
          </article>
        );})}
        <div className="tree-legend">
          <span><i className="alive" />在世</span>
          <span><i className="dead" />已故</span>
          <span><i className="pending" />待审核</span>
        </div>
      </section>
    </div>
  );
}
