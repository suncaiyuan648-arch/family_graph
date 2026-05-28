import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TreePine } from "lucide-react";

export function RegisterPage() {
  return (
    <main className="register-page">
      <section className="register-phone-frame" aria-label="实名注册">
        <header className="register-topbar">
          <Link to="/login" aria-label="返回登录页" className="register-back-link">
            <ArrowLeft size={20} />
          </Link>
          <h1>实名注册</h1>
          <span aria-hidden="true" />
        </header>

        <form className="register-card">
          <section className="register-intro">
            <div className="register-logo" aria-hidden="true">
              <TreePine size={24} strokeWidth={2.4} />
            </div>
            <div>
              <h2>实名注册</h2>
              <p>证件信息仅用于身份识别和家族身份认领，不会公开展示</p>
            </div>
          </section>

          <div className="register-fields">
            <Field label="证件类型" required>
              <select defaultValue="CHINA_ID">
                <option value="CHINA_ID">身份证</option>
                <option value="PASSPORT">护照</option>
              </select>
            </Field>
            <Field label="证件号码" required>
              <input placeholder="请输入证件号码" autoComplete="username" />
            </Field>
            <Field label="真实姓名" required>
              <input placeholder="请输入真实姓名" autoComplete="name" />
            </Field>
            <Field label="出生日期" required>
              <input type="date" />
            </Field>
            <Field label="手机号" required>
              <input placeholder="请输入手机号" inputMode="tel" autoComplete="tel" />
            </Field>
            <Field label="短信验证码" required>
              <div className="register-code-row">
                <input placeholder="请输入验证码" inputMode="numeric" />
                <button type="button">获取验证码</button>
              </div>
            </Field>
            <Field label="设置密码" required help="密码长度至少8位，包含字母和数字">
              <input placeholder="请设置登录密码" type="password" autoComplete="new-password" />
            </Field>
            <Field label="确认密码" required>
              <input placeholder="请再次输入密码" type="password" autoComplete="new-password" />
            </Field>
          </div>

          <label className="register-agreement">
            <input type="checkbox" />
            <span>
              我已阅读并同意
              <a href="#user-agreement">《用户协议》</a>
              和
              <a href="#privacy-policy">《隐私政策》</a>
            </span>
          </label>

          <button className="register-submit" type="button">
            注册
          </button>

          <Link className="register-login-link" to="/login">
            已有账号，去登录
          </Link>
        </form>
      </section>
    </main>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  help?: string;
  children: ReactNode;
}

function Field({ label, required = false, help, children }: FieldProps) {
  return (
    <label className="register-field">
      <span>
        {label}
        {required && <em>*</em>}
      </span>
      {children}
      {help && <small>{help}</small>}
    </label>
  );
}
