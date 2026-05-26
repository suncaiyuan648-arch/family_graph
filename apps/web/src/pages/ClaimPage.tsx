import { PlaceholderPage } from "../components/PlaceholderPage";

export function ClaimPage() {
  return (
    <PlaceholderPage
      title="认领家族身份"
      description="展示可能匹配的未注册档案，用户提交认领申请后必须由族长审核。"
      items={["候选身份卡片", "申请说明", "证明材料上传占位"]}
    />
  );
}
