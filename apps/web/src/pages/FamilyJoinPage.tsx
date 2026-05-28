import { useState } from "react";
import { ArrowLeft, MapPin, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";

type JoinTab = "search" | "applications";

const familyResults = [
  {
    name: "林氏家族",
    code: "LIN-SZ-****",
    leader: "林怀古",
    members: 248,
    origin: "江苏苏州",
  },
  {
    name: "林氏宗族",
    code: "LIN-FZ-****",
    leader: "林文德",
    members: 156,
    origin: "福建福州",
  },
];

const myApplications = [
  {
    familyName: "林氏家族",
    submittedAt: "2024-05-26",
    status: "审核中",
    statement: "我是林承安的儿子，希望加入林氏家族，完善家族档案。",
  },
];

export function FamilyJoinPage() {
  const [activeTab, setActiveTab] = useState<JoinTab>("search");

  return (
    <div className="family-join-page">
      <header className="family-flow-header">
        <Link to="/home" aria-label="返回首页">
          <ArrowLeft size={19} />
        </Link>
        <h2>加入家族</h2>
        <span aria-hidden="true" />
      </header>

      <div className="family-join-tabs" role="tablist" aria-label="加入家族">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "search"}
          className={activeTab === "search" ? "active" : ""}
          onClick={() => setActiveTab("search")}
        >
          搜索家族
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "applications"}
          className={activeTab === "applications" ? "active" : ""}
          onClick={() => setActiveTab("applications")}
        >
          我的申请
        </button>
      </div>

      {activeTab === "search" ? <FamilySearchPanel /> : <MyApplicationsPanel />}
    </div>
  );
}

function FamilySearchPanel() {
  return (
    <div className="family-join-content">
      <section className="family-search-card">
        <label>
          <span>搜索方式</span>
          <select defaultValue="familyName">
            <option value="familyName">家族名称</option>
            <option value="familyCode">家族编号</option>
            <option value="leaderName">族长姓名</option>
            <option value="memberName">成员姓名</option>
            <option value="documentHash">证件号</option>
          </select>
        </label>
        <label>
          <span>搜索内容</span>
          <div className="family-search-input">
            <Search size={18} />
            <input placeholder="请输入搜索内容" />
          </div>
        </label>
        <button type="button">搜索</button>
      </section>

      <section className="family-result-section">
        <h3>搜索结果</h3>
        <div className="family-result-list">
          {familyResults.map((family) => (
            <article className="family-result-card" key={family.code}>
              <div className="family-result-head">
                <h4>{family.name}</h4>
                <span>已认证</span>
              </div>
              <p>编号：{family.code}</p>
              <ul>
                <li>
                  <Users size={15} />
                  族长：{family.leader}
                </li>
                <li>
                  <Users size={15} />
                  成员：{family.members} 人
                </li>
                <li>
                  <MapPin size={15} />
                  发源地：{family.origin}
                </li>
              </ul>
              <button type="button">申请加入</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MyApplicationsPanel() {
  return (
    <div className="family-join-content">
      <div className="family-application-list">
        {myApplications.map((application) => (
          <article className="family-application-card" key={`${application.familyName}-${application.submittedAt}`}>
            <div className="family-application-head">
              <span>林</span>
              <div>
                <h3>{application.familyName}</h3>
                <p>申请时间：{application.submittedAt}</p>
              </div>
              <em>{application.status}</em>
            </div>
            <div className="family-application-note">
              <strong>申请说明：</strong>
              <p>{application.statement}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
