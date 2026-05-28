import type { ReactNode } from "react";
import { ArrowLeft, KeyRound, Lock, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function SettingsPage() {
  return (
    <div className="custom-flow-page settings-page">
      <header className="custom-flow-header">
        <Link to="/profile" aria-label="返回我的">
          <ArrowLeft size={19} />
        </Link>
        <h2>设置</h2>
        <span aria-hidden="true" />
      </header>

      <section className="settings-card">
        <h3>账号安全</h3>
        <SettingRow icon={<Phone size={18} />} title="绑定手机号" desc="138****1234，可用于验证码登录" action="更换" />
        <SettingRow icon={<KeyRound size={18} />} title="登录密码" desc="用于证件号 + 密码登录" action="修改" />
      </section>

      <section className="settings-card">
        <h3>隐私与敏感字段</h3>
        <SettingRow icon={<Shield size={18} />} title="证件号展示" desc="本人可见完整号码，族长默认仅可见脱敏号码" action="查看" />
        <SettingRow icon={<Lock size={18} />} title="联系方式可见范围" desc="普通成员不可查看他人手机号、证件号和详细住址" action="设置" />
      </section>

      <section className="settings-card">
        <h3>家族上下文</h3>
        <p>当前家族：林氏家族（family-lin）。V1 保留 familyId 上下文，完整多家族切换在 V2 实现。</p>
      </section>
    </div>
  );
}

function SettingRow({ icon, title, desc, action }: { icon: ReactNode; title: string; desc: string; action: string }) {
  return (
    <article className="settings-row">
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{desc}</p>
      </div>
      <button type="button">{action}</button>
    </article>
  );
}
