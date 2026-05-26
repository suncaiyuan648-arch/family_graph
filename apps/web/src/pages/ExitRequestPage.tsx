import { PlaceholderPage } from "../components/PlaceholderPage";

export function ExitRequestPage() {
  return (
    <PlaceholderPage
      title="申请退出家族"
      description="退出家族需要族长审核，审核通过后不删除历史族谱档案和关系。"
      items={["退出原因", "保留族谱档案", "隐藏联系方式", "是否继续显示姓名"]}
    />
  );
}
