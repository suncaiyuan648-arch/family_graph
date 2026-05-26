import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="tree-logo">木</div>
        <h1>家族档案</h1>
        <p>连接亲人，记录传承</p>
        <div className="segmented">
          <button className="active">证件密码</button>
          <button>手机验证码</button>
        </div>
        <label>
          证件类型
          <select>
            <option>身份证</option>
            <option>护照</option>
          </select>
        </label>
        <label>
          证件号码
          <input placeholder="请输入身份证或护照号码" />
        </label>
        <label>
          登录密码
          <input placeholder="请输入密码" type="password" />
        </label>
        <button className="primary-action">登录</button>
        <div className="auth-links">
          <a>忘记密码</a>
          <Link to="/register">实名注册</Link>
        </div>
        <p className="legal-text">登录即代表同意用户协议与隐私协议。</p>
      </section>
    </main>
  );
}
