import { ArrowLeft, Clock, FileDiff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { familyApi } from "../api/familyApi";
import { defaultFamilyId } from "../config/defaults";
import { mockPeople } from "../mocks/family";

const fallbackHistories = [
  { field: "基础信息", editor: "林怀古", time: "2024-05-20 14:25", before: "居住地：苏州", after: "居住地：上海市浦东新区", status: "已通过" },
  { field: "家族关系", editor: "林文翰", time: "2024-03-12 09:10", before: "未设置父亲", after: "父亲：林承安", status: "已通过" },
  { field: "资料来源", editor: "林怀古", time: "2024-01-15 10:30", before: "无", after: "本人提供、家族档案", status: "已记录" },
];

export function EditHistoryPage() {
  const { memberId } = useParams();
  const person = mockPeople.find((item) => item.id === memberId) ?? mockPeople[0];
  const [histories, setHistories] = useState(fallbackHistories);

  useEffect(() => {
    if (!memberId) return;
    let mounted = true;
    familyApi.listEditHistory(defaultFamilyId, memberId).then((result) => {
      if (!mounted) return;
      setHistories(result.map((item) => ({
        field: item.fieldName,
        editor: item.editorName,
        time: item.createdAt,
        before: item.oldValueMasked ?? "无",
        after: item.newValueMasked ?? "无",
        status: item.reason ?? "已记录",
      })));
    }).catch(() => {
      if (mounted) setHistories(fallbackHistories);
    });
    return () => {
      mounted = false;
    };
  }, [memberId]);

  return (
    <div className="custom-flow-page">
      <header className="custom-flow-header">
        <Link to={`/family/${defaultFamilyId}/member/${person.id}`} aria-label="返回档案">
          <ArrowLeft size={19} />
        </Link>
        <h2>编辑历史</h2>
        <span aria-hidden="true" />
      </header>

      <section className="history-summary">
        <FileDiff size={20} />
        <div>
          <strong>{person.name}</strong>
          <p>V1 记录基础编辑历史；完整版本对比和回滚预留到 V2。</p>
        </div>
      </section>

      <main className="history-list">
        {histories.map((item) => (
          <article className="history-card" key={item.time}>
            <div>
              <h3>{item.field}</h3>
              <span>{item.status}</span>
            </div>
            <p><Clock size={14} />{item.time} · {item.editor}</p>
            <dl>
              <div><dt>修改前</dt><dd>{item.before}</dd></div>
              <div><dt>修改后</dt><dd>{item.after}</dd></div>
            </dl>
          </article>
        ))}
      </main>
    </div>
  );
}
