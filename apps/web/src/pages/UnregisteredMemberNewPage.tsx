import { ArrowLeft, Info, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { defaultFamilyId } from "../config/defaults";

export function UnregisteredMemberNewPage() {
  return (
    <div className="unregistered-new-page">
      <header className="family-flow-header">
        <Link to={`/family/${defaultFamilyId}/members`} aria-label="返回成员档案">
          <ArrowLeft size={19} />
        </Link>
        <h2>添加未注册成员</h2>
        <span aria-hidden="true" />
      </header>

      <section className="unregistered-alert">
        <Info size={17} />
        <p>未注册成员包括：刚出生的孩子、已故长辈、不使用系统的老人、历史族谱人物等。添加后可供本人或他人认领。</p>
      </section>

      <form className="unregistered-form">
        <h3>基本信息</h3>
        <TextField label="姓名" required placeholder="请输入成员姓名" />
        <TextField label="曾用名" placeholder="如有曾用名，请输入" />
        <div className="unregistered-radio-row">
          <span>性别 <em>*</em></span>
          <label><input name="gender" type="radio" />男</label>
          <label><input name="gender" type="radio" />女</label>
        </div>
        <TextField label="出生日期" required type="date" />
        <SelectField label="日期类型" options={["阳历", "阴历"]} />
        <label className="unregistered-check"><input type="checkbox" />已故成员</label>
        <TextField label="去世日期" type="date" />
        <SelectField label="去世日期类型" options={["阳历", "阴历"]} />
        <div className="unregistered-upload">
          <span>照片</span>
          <button type="button"><Upload size={27} />点击上传照片</button>
        </div>

        <hr />
        <h3>家族关系</h3>
        <TextField label="与现有成员关系" required placeholder="例如：林怀古的父亲" />
        <TextField label="所属支系" placeholder="例如：承安支系" />
        <TextField label="代际" placeholder="例如：第17代" />
        <TextField label="字辈" placeholder="如有字辈，请输入" />

        <hr />
        <h3>档案信息</h3>
        <SelectField label="资料来源" required options={["本人提供", "家族口述", "旧家谱", "墓碑资料", "历史照片"]} />
        <SelectField label="资料可信度" options={["高", "中", "低", "待确认"]} />
        <label className="unregistered-check checked"><input type="checkbox" defaultChecked />允许未来被认领</label>
        <label className="unregistered-textarea">
          <span>备注</span>
          <textarea placeholder="其他需要说明的信息" rows={4} />
        </label>
        <button className="unregistered-submit" type="button">添加成员</button>
      </form>
    </div>
  );
}

function TextField({ label, placeholder, required = false, type = "text" }: { label: string; placeholder?: string; required?: boolean; type?: string }) {
  return (
    <label className="unregistered-field">
      <span>{label}{required && <em>*</em>}</span>
      <input placeholder={placeholder} type={type} />
    </label>
  );
}

function SelectField({ label, required = false, options }: { label: string; required?: boolean; options: string[] }) {
  return (
    <label className="unregistered-field">
      <span>{label}{required && <em>*</em>}</span>
      <select>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
