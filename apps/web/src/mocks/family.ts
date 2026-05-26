import type {
  Announcement,
  Family,
  FamilyEvent,
  FamilyTreeEdge,
  FamilyTreeNode,
  PersonProfile,
  ReviewItem,
} from "@family-graph/shared";

export const mockViewer = {
  id: "user-lin-wh",
  name: "林文翰",
  familyRoleLabel: "族长",
};

export const mockFamily: Family = {
  id: "family-lin",
  name: "林氏家族",
  code: "LIN-2026-001",
  description: "以家族图谱、成员档案、身份认领和审核为核心的数字家族档案。",
  ancestralHome: "福建莆田",
  originPlace: "广东潮州",
  hallLocation: "敦本堂",
  leaderName: "林文翰",
  totalMembers: 128,
};

export const mockStats = [
  { label: "家族总人数", value: "128" },
  { label: "已注册成员", value: "43" },
  { label: "未注册成员", value: "85" },
  { label: "待审核事项", value: "7" },
  { label: "代际跨度", value: "8 代" },
  { label: "地区分布", value: "12 地" },
];

export const mockPeople: PersonProfile[] = [
  {
    id: "person-1",
    name: "林文翰",
    gender: "MALE",
    maskedDocumentNumber: "4401**********1234",
    birthDate: "1984-06-12",
    birthDateType: "SOLAR",
    isAlive: true,
    isRegistered: true,
    claimStatus: "APPROVED",
    generation: 18,
    branch: "长房",
    nativePlace: "广东潮州",
    currentResidence: "广州",
    createdByName: "林文翰",
    lastEditedByName: "林文翰",
    source: "本人登记",
    confidenceLevel: "HIGH",
    allowClaim: false,
    statusTags: ["已注册", "族长"],
  },
  {
    id: "person-2",
    name: "林承安",
    gender: "MALE",
    birthDate: "2025-09-18",
    birthDateType: "SOLAR",
    isAlive: true,
    isRegistered: false,
    claimStatus: "NONE",
    generation: 19,
    branch: "长房",
    currentResidence: "广州",
    createdByName: "林文翰",
    lastEditedByName: "林文翰",
    source: "出生医学记录",
    confidenceLevel: "HIGH",
    allowClaim: true,
    statusTags: ["未注册"],
  },
  {
    id: "person-3",
    name: "林启荣",
    gender: "MALE",
    birthDate: "1931-02-04",
    birthDateType: "LUNAR",
    deathDate: "2016-10-09",
    deathDateType: "SOLAR",
    isAlive: false,
    isRegistered: false,
    claimStatus: "NONE",
    generation: 16,
    branch: "长房",
    nativePlace: "福建莆田",
    createdByName: "林文翰",
    lastEditedByName: "林文翰",
    source: "旧家谱与口述资料",
    confidenceLevel: "MEDIUM",
    allowClaim: false,
    statusTags: ["未注册", "已故", "资料待确认"],
  },
];

export const mockTreeNodes: FamilyTreeNode[] = mockPeople.map((person) => ({
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

export const mockTreeEdges: FamilyTreeEdge[] = [
  {
    id: "edge-1",
    from: "node-person-3",
    to: "node-person-1",
    relationType: "CHILD",
    status: "APPROVED",
  },
  {
    id: "edge-2",
    from: "node-person-1",
    to: "node-person-2",
    relationType: "CHILD",
    status: "PENDING",
  },
];

export const mockReviews: ReviewItem[] = [
  {
    id: "review-1",
    familyId: "family-lin",
    type: "CLAIM_PROFILE",
    status: "PENDING",
    applicantName: "林雨晴",
    relatedPersonName: "林若兰",
    submittedAt: "2026-05-25 09:30",
    summary: "申请认领未注册成员档案，证件号与生日部分匹配。",
  },
  {
    id: "review-2",
    familyId: "family-lin",
    type: "RELATIONSHIP_CHANGE",
    status: "PENDING",
    applicantName: "林文翰",
    relatedPersonName: "林承安",
    submittedAt: "2026-05-25 14:20",
    summary: "新增父子关系，待族长审核后生效。",
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "announcement-1",
    familyId: "family-lin",
    title: "端午祭祖活动安排",
    type: "祭祀活动",
    publisherName: "林文翰",
    publishedAt: "2026-05-20",
    priority: "IMPORTANT",
    requiresConfirmation: true,
    readCount: 42,
    unreadCount: 18,
  },
];

export const mockEvents: FamilyEvent[] = [
  {
    id: "event-1",
    familyId: "family-lin",
    title: "新增第十九代成员林承安",
    eventType: "出生",
    eventDate: "2025-09-18",
    relatedPersonNames: ["林承安", "林文翰"],
    location: "广州",
    description: "第十九代成员出生并录入未注册成员档案。",
    recorderName: "林文翰",
    importance: "IMPORTANT",
  },
];

export const recentActivities = [
  "林雨晴提交身份认领申请",
  "林文翰新增未注册成员林承安",
  "族长发布端午祭祖活动安排",
  "林承安父子关系进入待审核",
];
