import { HandHeart, Plus } from "lucide-react";

const posts = [
  { title: "寻找苏州旧宅照片", type: "资料互助", author: "林文翰", desc: "用于补充林景德支系档案，欢迎上传或联系资料整理人。" },
  { title: "端午聚会车辆协调", type: "活动互助", author: "张秋丹", desc: "需要两辆车协助接送高龄成员前往祠堂。" },
  { title: "旧家谱扫描整理", type: "档案志愿", author: "林怀古", desc: "V3 互助平台会支持发布、认领、完成状态。" },
];

export function MarketplacePage() {
  return (
    <div className="custom-flow-page marketplace-page">
      <header className="custom-flow-header">
        <span aria-hidden="true" />
        <h2>互助平台</h2>
        <button type="button" aria-label="发布互助">
          <Plus size={19} />
        </button>
      </header>
      <section className="relationship-rule-card">
        <HandHeart size={18} />
        <p>互助平台属于 V3 扩展能力，当前仅保留静态入口，便于后端 MVP 聚焦族谱核心闭环。</p>
      </section>
      <main className="market-list">
        {posts.map((post) => (
          <article className="market-card" key={post.title}>
            <span>{post.type}</span>
            <h3>{post.title}</h3>
            <p>{post.desc}</p>
            <small>发布人：{post.author}</small>
          </article>
        ))}
      </main>
    </div>
  );
}
