import type { ReactNode } from "react";
import { ArrowLeft, CalendarDays, Edit3, FileText, GitBranch, MapPin, Share2, User, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { defaultFamilyId } from "../config/defaults";
import { mockPeople } from "../mocks/family";

export function MemberProfilePage() {
  const { memberId } = useParams();
  const person = mockPeople.find((item) => item.id === memberId) ?? mockPeople[0];
  const unregistered = !person.isRegistered;

  return (
    <div className="member-profile-page">
      <header className="member-profile-header">
        <Link to={`/family/${defaultFamilyId}/members`} aria-label="返回成员列表">
          <ArrowLeft size={19} />
        </Link>
        <h2>成员档案</h2>
        <button type="button" aria-label="分享">
          <Share2 size={17} />
        </button>
      </header>

      <section className={`member-profile-hero ${unregistered ? "unregistered" : ""}`}>
        <div className={unregistered ? "profile-avatar dashed" : "profile-avatar"}>{person.name.slice(0, 1)}</div>
        {unregistered && <strong className="profile-claim-tag">未注册</strong>}
        <h1>{person.name}</h1>
        <div className="profile-tags">
          <span>第{person.generation ?? "-"}代</span>
          {person.statusTags.slice(1).map((tag) => (
            <span className={tag === "待认领" ? "warning" : ""} key={tag}>{tag}</span>
          ))}
        </div>
        {!unregistered && <p>与我的关系：父亲</p>}
        <div className="profile-progress">
          <div>
            <span>档案完善度</span>
            <strong>{unregistered ? "45%" : "85%"}</strong>
          </div>
          <i><b style={{ width: unregistered ? "45%" : "85%" }} /></i>
        </div>
      </section>

      {unregistered && (
        <section className="profile-warning">
          <FileText size={17} />
          <p>该成员尚未注册账号，档案信息由家族成员整理。如果这是您的档案，可以申请认领；已故成员不可被认领。</p>
        </section>
      )}

      <ProfileCard title="基础信息" icon={<FileText size={17} />}>
        <InfoRows rows={unregistered ? unregisteredInfo(person.name) : registeredInfo(person.name)} />
      </ProfileCard>

      <ProfileCard title="家族关系" icon={<Users size={17} />}>
        <div className="relation-list">
          {["林承安|父亲 · 第17代", "张秋丹|配偶 · 当前", "林文翰|长子 · 第19代", "林书涵|次子 · 第19代"].map((item) => {
            const [name, desc] = item.split("|");
            return (
              <article key={item}>
                <span>{name.slice(0, 1)}</span>
                <div>
                  <strong>{name}</strong>
                  <p>{desc}</p>
                </div>
                <Link to={`/family/${defaultFamilyId}/relationships`}>查看</Link>
              </article>
            );
          })}
        </div>
        <Link className="profile-outline-link" to={`/family/${defaultFamilyId}/relationships`}>
          <GitBranch size={16} />管理核心关系
        </Link>
      </ProfileCard>

      {!unregistered && (
        <ProfileCard title="教育与职业" icon={<FileText size={17} />}>
          <InfoRows
            rows={[
              ["学历", "硕士"],
              ["毕业院校", "复旦大学"],
              ["行业", "文化教育"],
              ["职业", "高级教师"],
              ["工作单位", "上海市第一中学"],
              ["职务", "教研组长"],
              ["主要成就", "市级优秀教师、教学成果奖一等奖"],
            ]}
          />
        </ProfileCard>
      )}

      <ProfileCard title="个人生平" icon={<CalendarDays size={17} />}>
        <p className="profile-bio">
          家族传统宗亲会议负责人，致力于维护清源堂家族档案整理秩序。长期从事教育工作，对家族文化传承有深入研究。
        </p>
        <div className="profile-life-timeline">
          {(unregistered
            ? ["1965|参加工作，任中学教师", "1988|担任苏州市第一中学校长", "2005|退休", "2015|辞世，享年70岁"]
            : ["1975|出生于江苏苏州", "1993|考入复旦大学中文系", "2000|开始从事教育工作", "2015|担任家族族长"]
          ).map((item) => {
            const [year, text] = item.split("|");
            return (
              <article key={item}>
                <time>{year}</time>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </ProfileCard>

      <ProfileCard title="档案信息">
        <InfoRows
          rows={
            unregistered
              ? [
                  ["资料整理人", "林怀古"],
                  ["首次整理时间", "2016-03-20 10:30"],
                  ["最后编辑人", "林文翰"],
                  ["最后更新时间", "2024-01-15 14:25"],
                  ["资料来源", "家族口述、历史照片"],
                  ["资料可信度", "中等"],
                  ["是否允许认领", person.allowClaim ? "允许" : "不允许"],
                ]
              : [
                  ["资料整理人", "林文翰"],
                  ["首次整理时间", "2024-01-15 10:30"],
                  ["最后编辑人", "林怀古（本人）"],
                  ["最后更新时间", "2024-05-20 14:25"],
                  ["资料来源", "本人提供、家族档案"],
                  ["资料可信度", "高"],
                  ["证件号码", person.maskedDocumentNumber ?? "310************1234"],
                ]
          }
        />
        <Link className="profile-outline-link" to={`/family/${defaultFamilyId}/member/${person.id}/edit-history`}>
          查看编辑历史
        </Link>
      </ProfileCard>

      <div className="profile-actions">
        {unregistered ? (
          <>
            <button type="button"><User size={17} />我来认领此档案</button>
            <Link to={`/family/${defaultFamilyId}/member/${person.id}/edit`}>补充资料</Link>
          </>
        ) : (
          <Link to={`/family/${defaultFamilyId}/member/${person.id}/edit`}><Edit3 size={17} />编辑档案</Link>
        )}
      </div>
    </div>
  );
}

function registeredInfo(name: string) {
  return [
    ["姓名", name],
    ["曾用名", "林怀德"],
    ["性别", "男"],
    ["证件类型", "身份证"],
    ["证件号码", "310************1234"],
    ["出生日期", "1975年3月15日（阳历）"],
    ["民族", "汉族"],
    ["籍贯", "江苏苏州"],
    ["出生地", "江苏省苏州市姑苏区"],
    ["现居住地", "上海市浦东新区"],
  ];
}

function unregisteredInfo(name: string) {
  return [
    ["姓名", name],
    ["曾用名", "林承德"],
    ["性别", "男"],
    ["出生日期", "1945年8月20日（阴历）"],
    ["去世日期", "2015年3月10日（阳历）"],
    ["是否在世", "已故"],
    ["出生地", "江苏省苏州市"],
    ["安葬地", "苏州市林氏家族墓园"],
  ];
}

function ProfileCard({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="profile-card">
      <h3>{icon}{title}</h3>
      {children}
    </section>
  );
}

function InfoRows({ rows }: { rows: string[][] }) {
  return (
    <dl className="profile-info-grid">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{label.includes("居住") ? <><MapPin size={14} />{value}</> : value}</dd>
        </div>
      ))}
    </dl>
  );
}
