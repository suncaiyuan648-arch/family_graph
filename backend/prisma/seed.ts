import {
  AnnouncementPriority,
  ClaimStatus,
  ConfidenceLevel,
  DateCalendarType,
  FamilyEventImportance,
  FamilyMemberRole,
  FamilyMemberStatus,
  Gender,
  IdentityDocumentType,
  PrismaClient,
  RelationshipStatus,
  RelationshipType,
  ReviewStatus,
  ReviewType,
} from "@prisma/client";

const prisma = new PrismaClient();

const familyId = "family-lin";
const leaderUserId = "user-lin-hg";

async function main() {
  const leaderPerson = await prisma.personProfile.upsert({
    where: { id: "person-1" },
    update: {},
    create: {
      id: "person-1",
      name: "林怀古",
      formerName: "林怀德",
      gender: Gender.MALE,
      documentType: IdentityDocumentType.CHINA_ID,
      documentNumberEncrypted: "encrypted:310000197503151234",
      documentNumberHash: "hash:lin-hg-id",
      birthDate: new Date("1975-03-15"),
      birthDateType: DateCalendarType.SOLAR,
      isAlive: true,
      isRegistered: true,
      claimStatus: ClaimStatus.APPROVED,
      nativePlace: "江苏苏州",
      currentResidence: "上海市浦东新区",
      branch: "长房",
      generation: 18,
      biography: "家族传统宗亲会议负责人，长期从事教育工作。",
      education: "硕士",
      occupation: "高级教师",
      workplace: "上海市第一中学",
      source: "本人提供、家族档案",
      confidenceLevel: ConfidenceLevel.HIGH,
      allowClaim: false,
      createdByName: "林文翰",
      lastEditedByName: "林怀古",
    },
  });

  await prisma.userAccount.upsert({
    where: { id: leaderUserId },
    update: {},
    create: {
      id: leaderUserId,
      documentType: IdentityDocumentType.CHINA_ID,
      documentNumberEncrypted: "encrypted:310000197503151234",
      documentNumberHash: "hash:user-lin-hg-id",
      realName: "林怀古",
      birthDate: new Date("1975-03-15"),
      phoneEncrypted: "encrypted:13800001234",
      phoneHash: "hash:13800001234",
      passwordHash: "mock-password-hash",
      personProfileId: leaderPerson.id,
    },
  });

  await prisma.family.upsert({
    where: { id: familyId },
    update: {},
    create: {
      id: familyId,
      name: "林氏家族",
      code: "LIN-SZ-2026-001",
      description: "以家族图谱、成员档案、身份认领和审核为核心的数字家族档案。",
      ancestralHome: "江苏省苏州市",
      originPlace: "江苏苏州",
      hallLocation: "清源堂",
      founderName: "林景德",
      createdById: leaderUserId,
    },
  });

  const people = [
    {
      id: "person-2",
      name: "林承安",
      formerName: "林承德",
      gender: Gender.MALE,
      birthDate: new Date("1945-08-20"),
      birthDateType: DateCalendarType.LUNAR,
      deathDate: new Date("2015-03-10"),
      deathDateType: DateCalendarType.SOLAR,
      isAlive: false,
      isRegistered: false,
      claimStatus: ClaimStatus.NONE,
      branch: "承安支系",
      generation: 17,
      nativePlace: "江苏苏州",
      biography: "参加工作后长期任中学教师，曾担任苏州市第一中学校长。",
      source: "家族口述、历史照片",
      confidenceLevel: ConfidenceLevel.MEDIUM,
      allowClaim: false,
    },
    {
      id: "person-3",
      name: "林景德",
      gender: Gender.MALE,
      birthDate: new Date("1902-02-04"),
      birthDateType: DateCalendarType.LUNAR,
      deathDate: new Date("1985-10-09"),
      deathDateType: DateCalendarType.SOLAR,
      isAlive: false,
      isRegistered: false,
      claimStatus: ClaimStatus.NONE,
      branch: "顺德家系",
      generation: 16,
      nativePlace: "江苏苏州",
      biography: "1902-1985，教育家。",
      source: "旧家谱与口述资料",
      confidenceLevel: ConfidenceLevel.MEDIUM,
      allowClaim: false,
    },
    {
      id: "person-4",
      name: "张秋丹",
      gender: Gender.FEMALE,
      birthDate: new Date("1978-08-03"),
      birthDateType: DateCalendarType.SOLAR,
      isAlive: true,
      isRegistered: true,
      claimStatus: ClaimStatus.APPROVED,
      branch: "姻亲",
      generation: 18,
      currentResidence: "上海",
      biography: "毕业于苏州大学，现任市档案局工作人员。",
      source: "本人登记",
      confidenceLevel: ConfidenceLevel.HIGH,
      allowClaim: false,
    },
    {
      id: "person-5",
      name: "林书涵",
      gender: Gender.MALE,
      birthDate: new Date("2002-04-18"),
      birthDateType: DateCalendarType.SOLAR,
      isAlive: true,
      isRegistered: true,
      claimStatus: ClaimStatus.APPROVED,
      branch: "长房",
      generation: 19,
      currentResidence: "上海",
      biography: "居住于上海，科技初创公司合伙人。",
      source: "本人登记",
      confidenceLevel: ConfidenceLevel.HIGH,
      allowClaim: false,
    },
  ];

  for (const person of people) {
    await prisma.personProfile.upsert({
      where: { id: person.id },
      update: {},
      create: {
        ...person,
        createdByName: "林怀古",
        lastEditedByName: "林怀古",
      },
    });
  }

  for (const personId of ["person-1", "person-2", "person-3", "person-4", "person-5"]) {
    await prisma.familyMember.upsert({
      where: { familyId_personProfileId: { familyId, personProfileId: personId } },
      update: {},
      create: {
        familyId,
        personProfileId: personId,
        role: personId === "person-1" ? FamilyMemberRole.LEADER : FamilyMemberRole.MEMBER,
        status: FamilyMemberStatus.ACTIVE,
        joinedAt: new Date("2024-01-01T08:00:00.000Z"),
      },
    });
  }

  const relationships = [
    ["rel-1", "person-3", "person-2", RelationshipType.CHILD, RelationshipStatus.APPROVED, "旧家谱"],
    ["rel-2", "person-2", "person-1", RelationshipType.CHILD, RelationshipStatus.APPROVED, "家族口述"],
    ["rel-3", "person-1", "person-4", RelationshipType.SPOUSE, RelationshipStatus.APPROVED, "本人登记"],
    ["rel-4", "person-1", "person-5", RelationshipType.CHILD, RelationshipStatus.PENDING, "成员申请"],
  ] as const;

  for (const [id, fromPersonId, toPersonId, relationType, status, source] of relationships) {
    await prisma.relationship.upsert({
      where: { id },
      update: {},
      create: { id, familyId, fromPersonId, toPersonId, relationType, status, source, createdById: leaderUserId },
    });
  }

  const reviews = [
    ["review-1", ReviewType.JOIN_FAMILY, "张秋丹", "林怀古", "希望加入林氏家族，我是林怀古的配偶。"],
    ["review-2", ReviewType.CLAIM_PROFILE, "林文翰", "林承安", "这是我父亲的档案，希望认领并完善信息。"],
    ["review-3", ReviewType.RELATIONSHIP_CHANGE, "林书涵", "林文翰", "申请补充家庭关系信息。"],
  ] as const;

  for (const [id, type, applicantName, relatedPersonName, summary] of reviews) {
    await prisma.reviewItem.upsert({
      where: { id },
      update: {},
      create: {
        id,
        familyId,
        applicantUserId: leaderUserId,
        type,
        status: ReviewStatus.PENDING,
        relatedPersonName,
        summary,
        payload: { applicantName },
      },
    });
  }

  await prisma.announcement.upsert({
    where: { id: "announcement-1" },
    update: {},
    create: {
      id: "announcement-1",
      familyId,
      title: "2024年林氏宗亲春节聚会通知",
      type: "家族聚会",
      body: "请各位成员确认参加情况。",
      publisherUserId: leaderUserId,
      publisherName: "林怀古",
      priority: AnnouncementPriority.IMPORTANT,
      requiresConfirmation: true,
      publishedAt: new Date("2024-05-20T10:30:00.000Z"),
    },
  });

  await prisma.familyEvent.upsert({
    where: { id: "event-1" },
    update: {},
    create: {
      id: "event-1",
      familyId,
      title: "林氏书院落成",
      eventType: "教育",
      eventDate: new Date("1921-01-01"),
      relatedPersonIds: ["person-3"],
      location: "苏州",
      description: "始祖宗亲公在苏州创办家族书院，开启家族重视教育的传统。",
      recorderUserId: leaderUserId,
      recorderName: "林怀古",
      importance: FamilyEventImportance.IMPORTANT,
    },
  });

  await prisma.editHistory.upsert({
    where: { id: "history-1" },
    update: {},
    create: {
      id: "history-1",
      familyId,
      personProfileId: "person-1",
      editorUserId: leaderUserId,
      editorName: "林怀古",
      fieldName: "现居住地",
      oldValueMasked: "苏州",
      newValueMasked: "上海市浦东新区",
      reason: "本人更新",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
