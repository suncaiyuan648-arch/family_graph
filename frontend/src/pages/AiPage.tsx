import { Brain, ChartNoAxesCombined, MapPinned, Users } from "lucide-react";

const cards = [
  { title: "人口结构", icon: Users, desc: "按代际、年龄段、在世状态做聚合统计，不传递敏感明文。" },
  { title: "迁徙路线", icon: MapPinned, desc: "V3 可基于籍贯、出生地、现居地生成家族迁徙视图。" },
  { title: "资料质量", icon: ChartNoAxesCombined, desc: "统计资料来源、可信度、待确认档案和缺失字段。" },
];

export function AiPage() {
  return (
    <div className="custom-flow-page ai-page">
      <header className="custom-flow-header">
        <span aria-hidden="true" />
        <h2>AI 家族分析</h2>
        <span aria-hidden="true" />
      </header>
      <section className="ai-hero">
        <Brain size={32} />
        <h3>后续扩展能力</h3>
        <p>AI 分析只接收脱敏后的聚合数据。V1 不接入真实 AI，先预留页面结构和权限提示。</p>
      </section>
      <main className="ai-card-list">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="ai-card" key={card.title}>
              <Icon size={20} />
              <div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
}
