export const defaultFamilyId = "family-lin";

export const viewer = {
  id: "user-lin-hg",
  realName: "林怀古",
  documentType: "CHINA_ID",
  maskedDocumentNumber: "310************1234",
  maskedPhone: "138****1234",
  personProfileId: "person-1",
  createdAt: "2024-01-01T08:00:00.000Z",
};

export const families = [
  {
    id: defaultFamilyId,
    name: "林氏家族",
    code: "LIN-SZ-2026-001",
    description: "以家族图谱、成员档案、身份认领和审核为核心的数字家族档案。",
    ancestralHome: "江苏省苏州市",
    originPlace: "江苏苏州",
    hallLocation: "清源堂",
    leaderName: "林怀古",
    totalMembers: 248,
  },
  {
    id: "family-lin-fj",
    name: "林氏宗族（福建）",
    code: "LIN-FZ-2026-002",
    description: "福建福州支系宗亲档案。",
    originPlace: "福建福州",
    leaderName: "林承德",
    totalMembers: 156,
  },
];

export const people = [
  {
    id: "person-1",
    name: "林怀古",
    formerName: "林怀德",
    gender: "MALE",
    maskedDocumentNumber: "310************1234",
    birthDate: "1975-03-15",
    birthDateType: "SOLAR",
    isAlive: true,
    isRegistered: true,
    claimStatus: "APPROVED",
    generation: 18,
    branch: "长房",
    nativePlace: "江苏苏州",
    currentResidence: "上海市浦东新区",
    biography: "家族传统宗亲会议负责人，长期从事教育工作。",
    createdByName: "林文翰",
    lastEditedByName: "林怀古",
    source: "本人提供、家族档案",
    confidenceLevel: "HIGH",
    allowClaim: false,
    statusTags: ["已注册", "族长", "在世"],
  },
  {
    id: "person-2",
    name: "林承安",
    formerName: "林承德",
    gender: "MALE",
    birthDate: "1945-08-20",
    birthDateType: "LUNAR",
    deathDate: "2015-03-10",
    deathDateType: "SOLAR",
    isAlive: false,
    isRegistered: false,
    claimStatus: "PENDING",
    generation: 17,
    branch: "承安支系",
    nativePlace: "江苏苏州",
    biography: "参加工作后长期任中学教师，曾担任苏州市第一中学校长。",
    createdByName: "林怀古",
    lastEditedByName: "林文翰",
    source: "家族口述、历史照片",
    confidenceLevel: "MEDIUM",
    allowClaim: false,
    statusTags: ["未注册", "已故", "不可认领"],
  },
  {
    id: "person-3",
    name: "林景德",
    gender: "MALE",
    birthDate: "1902-02-04",
    birthDateType: "LUNAR",
    deathDate: "1985-10-09",
    deathDateType: "SOLAR",
    isAlive: false,
    isRegistered: false,
    claimStatus: "NONE",
    generation: 16,
    branch: "顺德家系",
    nativePlace: "江苏苏州",
    biography: "1902-1985，教育家。",
    createdByName: "林文翰",
    lastEditedByName: "林文翰",
    source: "旧家谱与口述资料",
    confidenceLevel: "MEDIUM",
    allowClaim: false,
    statusTags: ["未注册", "已故"],
  },
  {
    id: "person-4",
    name: "张秋丹",
    gender: "FEMALE",
    birthDate: "1978-08-03",
    birthDateType: "SOLAR",
    isAlive: true,
    isRegistered: true,
    claimStatus: "APPROVED",
    generation: 18,
    branch: "姻亲",
    currentResidence: "上海",
    biography: "毕业于苏州大学，现任市档案局工作人员。",
    createdByName: "张秋丹",
    lastEditedByName: "张秋丹",
    source: "本人登记",
    confidenceLevel: "HIGH",
    allowClaim: false,
    statusTags: ["已注册", "配偶"],
  },
  {
    id: "person-5",
    name: "林书涵",
    gender: "MALE",
    birthDate: "2002-04-18",
    birthDateType: "SOLAR",
    isAlive: true,
    isRegistered: true,
    claimStatus: "APPROVED",
    generation: 19,
    branch: "长房",
    currentResidence: "上海",
    biography: "居住于上海，科技初创公司合伙人。",
    createdByName: "林怀古",
    lastEditedByName: "林书涵",
    source: "本人登记",
    confidenceLevel: "HIGH",
    allowClaim: false,
    statusTags: ["已注册", "代表"],
  },
];

export const familyMembers = people.map((person, index) => ({
  id: `family-member-${index + 1}`,
  familyId: defaultFamilyId,
  personProfileId: person.id,
  role: person.id === "person-1" ? "LEADER" : "MEMBER",
  status: person.isAlive ? "ACTIVE" : "ACTIVE",
  joinedAt: "2024-01-01T08:00:00.000Z",
}));

export const relationships = [
  { id: "rel-1", familyId: defaultFamilyId, fromPersonId: "person-3", toPersonId: "person-2", relationType: "CHILD", status: "APPROVED", source: "旧家谱" },
  { id: "rel-2", familyId: defaultFamilyId, fromPersonId: "person-2", toPersonId: "person-1", relationType: "CHILD", status: "APPROVED", source: "家族口述" },
  { id: "rel-3", familyId: defaultFamilyId, fromPersonId: "person-1", toPersonId: "person-4", relationType: "SPOUSE", status: "APPROVED", source: "本人登记" },
  { id: "rel-4", familyId: defaultFamilyId, fromPersonId: "person-1", toPersonId: "person-5", relationType: "CHILD", status: "PENDING", source: "成员申请" },
];

export const reviews = [
  {
    id: "review-1",
    familyId: defaultFamilyId,
    type: "JOIN_FAMILY",
    status: "PENDING",
    applicantName: "张秋丹",
    relatedPersonName: "林怀古",
    submittedAt: "2024-05-26 10:30",
    summary: "希望加入林氏家族，我是林怀古的配偶。",
  },
  {
    id: "review-2",
    familyId: defaultFamilyId,
    type: "CLAIM_PROFILE",
    status: "PENDING",
    applicantName: "林文翰",
    relatedPersonName: "林承安",
    submittedAt: "2024-05-25 14:20",
    summary: "这是我父亲的档案，希望认领并完善信息。",
  },
  {
    id: "review-3",
    familyId: defaultFamilyId,
    type: "RELATIONSHIP_CHANGE",
    status: "PENDING",
    applicantName: "林书涵",
    relatedPersonName: "林文翰",
    submittedAt: "2024-05-24 16:45",
    summary: "申请补充家庭关系信息。",
  },
];

export const announcements = [
  {
    id: "announcement-1",
    familyId: defaultFamilyId,
    title: "2024年林氏宗亲春节聚会通知",
    type: "家族聚会",
    publisherName: "林怀古",
    publishedAt: "2024-05-20",
    priority: "IMPORTANT",
    requiresConfirmation: true,
    readCount: 45,
    unreadCount: 75,
  },
  {
    id: "announcement-2",
    familyId: defaultFamilyId,
    title: "家族档案数字化项目进展通报",
    type: "普通通知",
    publisherName: "林文翰",
    publishedAt: "2024-05-18",
    priority: "NORMAL",
    requiresConfirmation: false,
    readCount: 68,
    unreadCount: 12,
  },
];

export const events = [
  {
    id: "event-1",
    familyId: defaultFamilyId,
    title: "林氏书院落成",
    eventType: "教育",
    eventDate: "1921-01-01",
    relatedPersonNames: ["林宗荣"],
    location: "苏州",
    description: "始祖宗亲公在苏州创办家族书院，开启家族重视教育的传统。",
    recorderName: "林怀古",
    importance: "IMPORTANT",
  },
  {
    id: "event-2",
    familyId: defaultFamilyId,
    title: "家族首次全国聚会",
    eventType: "聚会",
    eventDate: "1952-01-01",
    relatedPersonNames: ["林景德", "林承安"],
    location: "北京",
    description: "第一届全国林氏宗亲大会召开，确立家族联系机制。",
    recorderName: "林文翰",
    importance: "IMPORTANT",
  },
];

export const editHistories = [
  { id: "history-1", familyId: defaultFamilyId, personId: "person-1", editorName: "林怀古", fieldName: "现居住地", oldValueMasked: "苏州", newValueMasked: "上海市浦东新区", reason: "本人更新", createdAt: "2024-05-20 14:25" },
  { id: "history-2", familyId: defaultFamilyId, personId: "person-1", editorName: "林文翰", fieldName: "家族关系", oldValueMasked: "未设置父亲", newValueMasked: "父亲：林承安", reason: "族谱整理", createdAt: "2024-03-12 09:10" },
];

export const claimCandidates = [
  { id: "candidate-1", personId: "person-5", name: "林书涵", familyName: "林氏家族", generation: 19, branch: "长房", confidenceScore: 95, organizerName: "林怀古", matchedFields: ["姓名匹配", "出生日期相近", "家族编号匹配"] },
  { id: "candidate-2", personId: "person-2", name: "林承安", familyName: "林氏家族", generation: 17, branch: "承安支系", confidenceScore: 42, organizerName: "林怀古", matchedFields: ["姓名相近"], disabledReason: "已故成员不可认领" },
];

export const exitRequests = [
  { id: "exit-1", familyId: defaultFamilyId, applicantName: "林书涵", reason: "个人原因暂不参与家族系统维护，希望退出访问权限。", keepGenealogyProfile: true, hideContact: true, allowNameInGenealogy: true, status: "PENDING", submittedAt: "2024-05-26 16:20" },
];

export function buildTree() {
  const nodes = people.map((person) => ({
    id: `node-${person.id}`,
    personId: person.id,
    name: person.name,
    generation: person.generation,
    branch: person.branch,
    isRegistered: person.isRegistered,
    isAlive: person.isAlive,
    claimStatus: person.claimStatus,
    confidenceLevel: person.confidenceLevel,
    createdByName: person.createdByName,
    lastEditedByName: person.lastEditedByName,
    statusTags: person.statusTags,
  }));

  const edges = relationships.map((relationship) => ({
    id: relationship.id,
    from: `node-${relationship.fromPersonId}`,
    to: `node-${relationship.toPersonId}`,
    relationType: relationship.relationType,
    status: relationship.status,
  }));

  return { nodes, edges };
}
