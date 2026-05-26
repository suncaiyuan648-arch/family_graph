import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <h1>实名注册</h1>
        <p>证件信息仅用于身份识别和家族身份认领，不会公开展示。</p>
        {["证件号码", "真实姓名", "出生日期", "手机号", "短信验证码"].map((field) => (
          <label key={field}>
            {field}
            <input placeholder={`请输入${field}`} />
          </label>
        ))}
        <label>
          证件类型
          <select>
            <option>身份证</option>
            <option>护照</option>
          </select>
        </label>
        <label>
          设置密码
          <input type="password" placeholder="请输入密码" />
        </label>
        <label>
          确认密码
          <input type="password" placeholder="请再次输入密码" />
        </label>
        <label className="checkbox-row">
          <input type="checkbox" />
          我已阅读并同意用户协议和隐私协议
        </label>
        <button className="primary-action">注册</button>
        <Link to="/login" className="text-link">
          已有账号，去登录
        </Link>
      </section>
    </main>
  );
}
