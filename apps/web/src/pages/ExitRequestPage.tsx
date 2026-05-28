import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const privacyItems = [
  ["保留族谱档案", "允许家族继续保留您的基本档案信息用于族谱记录"],
  ["隐藏联系方式", "退出后隐藏手机号、邮箱等联系方式"],
  ["允许继续显示姓名", "允许在族谱图中继续显示您的姓名和代际信息"],
  ["保留家族关系记录", "保留您与其他成员的亲属关系记录，但标记为历史状态"],
];

export function ExitRequestPage() {
  return (
    <div className="exit-page custom-flow-page">
      <header className="custom-flow-header">
        <Link to="/home" aria-label="返回">
          <ArrowLeft size={19} />
        </Link>
        <h2>申请退出家族</h2>
        <span aria-hidden="true" />
      </header>

      <main className="exit-content">
        <section className="exit-warning">
          <AlertTriangle size={18} />
          <div>
            <strong>退出家族需要族长审核</strong>
            <p>审核通过后，您的账号将不再拥有该家族的访问权限，但历史族谱关系不会被直接删除。请慎重考虑。</p>
          </div>
        </section>

        <section className="exit-card">
          <label className="exit-field">
            <span>退出原因 <em>*</em></span>
            <textarea placeholder="请说明您退出家族的原因" rows={5} />
          </label>
          <h3>隐私设置</h3>
          <div className="exit-check-list">
            {privacyItems.map(([title, desc]) => (
              <label key={title}>
                <input type="checkbox" defaultChecked />
                <span><strong>{title}</strong><small>{desc}</small></span>
              </label>
            ))}
          </div>
          <label className="exit-field">
            <span>补充说明（可选）</span>
            <textarea placeholder="如有其他需要说明的事项，请在此填写" rows={4} />
          </label>
        </section>

        <section className="exit-card exit-note">
          <h3>退出后说明</h3>
          <ul>
            <li>您将失去访问该家族档案的权限</li>
            <li>无法查看家族成员信息和家族图谱</li>
            <li>无法参与家族活动和接收家族公告</li>
            <li>您可以随时重新申请加入家族</li>
            <li>根据您的隐私设置，部分档案信息将被保留或隐藏</li>
          </ul>
        </section>

        <div className="exit-actions">
          <button type="button">提交退出申请</button>
          <Link to="/home">取消</Link>
        </div>
      </main>
    </div>
  );
}
