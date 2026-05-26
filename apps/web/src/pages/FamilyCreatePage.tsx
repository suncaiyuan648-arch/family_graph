import { PlaceholderPage } from "../components/PlaceholderPage";

export function FamilyCreatePage() {
  return (
    <PlaceholderPage
      title="创建家族"
      description="预留家族名称、编号、简介、祖籍、发源地、祠堂位置、封面图和始祖信息表单。创建者默认成为族长。"
      items={["家族编号生成", "族长角色初始化", "封面图上传占位"]}
    />
  );
}
