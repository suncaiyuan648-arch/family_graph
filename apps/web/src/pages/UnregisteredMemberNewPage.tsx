import { PlaceholderPage } from "../components/PlaceholderPage";

export function UnregisteredMemberNewPage() {
  return (
    <PlaceholderPage
      title="录入未注册成员"
      description="用于录入新生儿、未成年人、已故长辈、不使用互联网的老人和历史族谱人物。"
      items={["基础信息", "生卒日期与日期类型", "资料来源与可信度", "允许未来认领"]}
    />
  );
}
