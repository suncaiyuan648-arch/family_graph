import { ArrowLeft, Info, Save } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { defaultFamilyId } from "../config/defaults";
import { mockPeople } from "../mocks/family";

export function MemberEditPage() {
  const { memberId } = useParams();
  const person = mockPeople.find((item) => item.id === memberId) ?? mockPeople[0];

  return (
    <div className="custom-flow-page member-edit-page">
      <header className="custom-flow-header">
        <Link to={`/family/${defaultFamilyId}/member/${person.id}`} aria-label="返回档案">
          <ArrowLeft size={19} />
        </Link>
        <h2>编辑成员档案</h2>
        <button type="button" aria-label="保存">
          <Save size={18} />
        </button>
      </header>

      <section className="claim-alert">
        <Info size={17} />
        <p>敏感字段和关键亲属关系修改会进入审核流程；本页面先作为后端接入前的静态表单骨架。</p>
      </section>

      <form className="static-form-card">
        <h3>基础信息</h3>
        <TextField label="姓名" value={person.name} required />
        <TextField label="曾用名" value={person.formerName ?? ""} />
        <SelectField label="性别" options={["男", "女", "未知"]} />
        <TextField label="出生日期" value={person.birthDate} type="date" required />
        <SelectField label="日期类型" options={["阳历", "阴历"]} />
        <TextField label="籍贯" value={person.nativePlace ?? ""} />
        <TextField label="现居住地" value={person.currentResidence ?? ""} />

        <hr />
        <h3>家族信息</h3>
        <TextField label="代际" value={person.generation ? `第${person.generation}代` : ""} required />
        <TextField label="所属支系" value={person.branch ?? ""} />
        <SelectField label="资料来源" options={["本人提供", "家族口述", "旧家谱", "历史照片", "墓碑资料"]} />
        <SelectField label="资料可信度" options={["高", "中", "低", "待确认"]} />

        <hr />
        <h3>编辑说明</h3>
        <label className="static-textarea">
          <span>修改原因</span>
          <textarea rows={4} placeholder="请说明本次修改原因，便于生成编辑历史和审核记录" />
        </label>
        <button className="static-submit" type="button">提交保存</button>
      </form>
    </div>
  );
}

function TextField({ label, value = "", type = "text", required = false }: { label: string; value?: string; type?: string; required?: boolean }) {
  return (
    <label className="static-field">
      <span>{label}{required && <em>*</em>}</span>
      <input defaultValue={value} type={type} />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="static-field">
      <span>{label}</span>
      <select>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
