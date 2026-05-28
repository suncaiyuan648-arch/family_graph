import type { ReactNode } from "react";
import { ArrowLeft, Bell, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export function FamilyCreatePage() {
  return (
    <div className="family-create-page">
      <header className="family-create-header">
        <Link to="/home" aria-label="返回首页">
          <ArrowLeft size={19} />
        </Link>
        <h2>创建家族</h2>
        <span aria-hidden="true" />
      </header>

      <section className="family-create-alert">
        <Bell size={17} />
        <p>创建家族后，您将自动成为族长，负责管理家族成员和审核相关申请。</p>
      </section>

      <form className="family-create-form">
        <CreateField label="家族名称" required help="建议使用姓氏+家族/宗族等">
          <input placeholder="例如：林氏家族" />
        </CreateField>

        <CreateField label="家族编号" help="系统自动生成，创建后可修改一次">
          <div className="family-code-row">
            <input value="LIN-SZ-2024-001" readOnly />
            <button type="button">重新生成</button>
          </div>
        </CreateField>

        <CreateField label="家族简介">
          <textarea placeholder="介绍您的家族历史、文化传统等" rows={4} />
        </CreateField>

        <CreateField label="祖籍" required>
          <input placeholder="例如：江苏省苏州市" />
        </CreateField>

        <CreateField label="发源地">
          <input placeholder="家族的发源地或始祖所在地" />
        </CreateField>

        <CreateField label="祠堂位置（可选）">
          <input placeholder="如有家族祠堂，请填写位置" />
        </CreateField>

        <CreateField label="始祖或核心人物（可选）">
          <input placeholder="家族始祖姓名" />
        </CreateField>

        <div className="family-create-upload">
          <span>家族封面图</span>
          <button type="button">
            <Upload size={30} />
            <strong>点击上传或拖拽图片</strong>
            <small>建议尺寸：800x400px，不超过2MB</small>
          </button>
        </div>

        <button className="family-create-submit" type="button">
          创建家族
        </button>
      </form>

      <section className="family-create-tips">
        <h3>温馨提示</h3>
        <ul>
          <li>创建后您将成为族长，拥有管理家族的权限</li>
          <li>家族编号用于成员搜索和识别，建议保持简洁</li>
          <li>创建后可继续添加家族成员和完善档案信息</li>
          <li>建议先整理好家族基本信息，以便更好地管理</li>
        </ul>
      </section>
    </div>
  );
}

interface CreateFieldProps {
  label: string;
  required?: boolean;
  help?: string;
  children: ReactNode;
}

function CreateField({ label, required = false, help, children }: CreateFieldProps) {
  return (
    <label className="family-create-field">
      <span>
        {label}
        {required && <em>*</em>}
      </span>
      {children}
      {help && <small>{help}</small>}
    </label>
  );
}
