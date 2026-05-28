import { useState } from "react";
import { Link } from "react-router-dom";
import { TreePine } from "lucide-react";

type LoginMode = "document" | "phone";

export function LoginPage() {
  const [mode, setMode] = useState<LoginMode>("document");

  return (
    <main className="login-page">
      <section className="login-phone-frame" aria-label="家族档案登录">
        <div className="login-brand">
          <div className="login-logo" aria-hidden="true">
            <TreePine size={44} strokeWidth={2.4} />
          </div>
          <h1>家族档案</h1>
          <p>连接亲人，记录传承</p>
        </div>

        <form className="login-card">
          <div className="login-card-head">
            <h2>登录</h2>
            <p>选择登录方式</p>
          </div>

          <div className="login-segmented" role="tablist" aria-label="选择登录方式">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "document"}
              className={mode === "document" ? "active" : ""}
              onClick={() => setMode("document")}
            >
              证件登录
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "phone"}
              className={mode === "phone" ? "active" : ""}
              onClick={() => setMode("phone")}
            >
              手机登录
            </button>
          </div>

          {mode === "document" ? <DocumentLoginFields /> : <PhoneLoginFields />}

          {mode === "document" && (
            <div className="login-options">
              <label className="remember-row">
                <input type="checkbox" />
                <span>记住我</span>
              </label>
              <a href="#forgot-password">忘记密码?</a>
            </div>
          )}

          <button className="login-submit" type="button">
            登录
          </button>

          <div className="login-register">
            <span>还没有账号?</span>
            <Link to="/register">立即注册</Link>
          </div>

          <p className="login-legal">
            登录即表示同意
            <a href="#user-agreement">用户协议</a>
            和
            <a href="#privacy-policy">隐私政策</a>
          </p>
        </form>
      </section>
    </main>
  );
}

function DocumentLoginFields() {
  return (
    <div className="login-fields">
      <label>
        <span>证件类型</span>
        <select defaultValue="CHINA_ID">
          <option value="CHINA_ID">身份证</option>
          <option value="PASSPORT">护照</option>
        </select>
      </label>
      <label>
        <span>证件号码</span>
        <input placeholder="请输入证件号码" autoComplete="username" />
      </label>
      <label>
        <span>密码</span>
        <input placeholder="请输入密码" type="password" autoComplete="current-password" />
      </label>
    </div>
  );
}

function PhoneLoginFields() {
  return (
    <div className="login-fields">
      <label>
        <span>手机号</span>
        <input placeholder="请输入手机号" inputMode="tel" autoComplete="tel" />
      </label>
      <label>
        <span>验证码</span>
        <div className="verification-row">
          <input placeholder="请输入验证码" inputMode="numeric" />
          <button type="button">获取验证码</button>
        </div>
      </label>
    </div>
  );
}
