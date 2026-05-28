import type {
  Announcement,
  EditHistory,
  Family,
  FamilyEvent,
  FamilyMember,
  PersonProfile,
  Relationship,
  ReviewItem,
} from "@prisma/client";

function dateOnly(value?: Date | null) {
  return value ? value.toISOString().slice(0, 10) : undefined;
}

function dateTime(value?: Date | null) {
  return value ? value.toISOString() : undefined;
}

function maskedDocument(value?: string | null) {
  if (!value) return undefined;
  return "310************1234";
}

export function buildPersonStatusTags(person: PersonProfile) {
  const tags = [person.isRegistered ? "已注册" : "未注册", person.isAlive ? "在世" : "已故"];
  if (person.claimStatus === "PENDING") tags.push("待认领");
  if (!person.allowClaim) tags.push("不可认领");
  return tags;
}

export function toPersonDto(person: PersonProfile) {
  return {
    id: person.id,
    name: person.name,
    formerName: person.formerName ?? undefined,
    gender: person.gender,
    maskedDocumentNumber: maskedDocument(person.documentNumberEncrypted),
    birthDate: dateOnly(person.birthDate),
    birthDateType: person.birthDateType,
    deathDate: dateOnly(person.deathDate),
    deathDateType: person.deathDateType ?? undefined,
    isAlive: person.isAlive,
    isRegistered: person.isRegistered,
    claimStatus: person.claimStatus,
    generation: person.generation ?? undefined,
    branch: person.branch ?? undefined,
    courtesyGenerationName: person.courtesyGenerationName ?? undefined,
    nativePlace: person.nativePlace ?? person.ancestralHome ?? undefined,
    currentResidence: person.currentResidence ?? undefined,
    avatarUrl: person.avatarUrl ?? undefined,
    biography: person.biography ?? undefined,
    createdByName: person.createdByName,
    lastEditedByName: person.lastEditedByName,
    source: person.source ?? undefined,
    confidenceLevel: person.confidenceLevel,
    allowClaim: person.allowClaim,
    statusTags: buildPersonStatusTags(person),
  };
}

export function toFamilyDto(
  family: Family & { members?: Array<FamilyMember & { personProfile?: PersonProfile }> },
) {
  const leader = family.members?.find((member) => member.role === "LEADER")?.personProfile;
  return {
    id: family.id,
    name: family.name,
    code: family.code,
    description: family.description ?? undefined,
    ancestralHome: family.ancestralHome ?? undefined,
    originPlace: family.originPlace ?? undefined,
    hallLocation: family.hallLocation ?? undefined,
    coverImageUrl: family.coverImageUrl ?? undefined,
    leaderName: leader?.name ?? family.founderName ?? "未设置",
    totalMembers: family.members?.length ?? 0,
  };
}

export function toReviewDto(review: ReviewItem & { applicant?: { realName: string } | null }) {
  const payload = review.payload as { applicantName?: string } | null;
  return {
    id: review.id,
    familyId: review.familyId,
    type: review.type,
    status: review.status,
    applicantName: review.applicant?.realName ?? payload?.applicantName ?? "申请人",
    relatedPersonName: review.relatedPersonName ?? undefined,
    submittedAt: dateTime(review.createdAt) ?? "",
    summary: review.summary,
  };
}

export function toAnnouncementDto(announcement: Announcement) {
  return {
    id: announcement.id,
    familyId: announcement.familyId,
    title: announcement.title,
    type: announcement.type,
    publisherName: announcement.publisherName,
    publishedAt: dateOnly(announcement.publishedAt) ?? "",
    priority: announcement.priority,
    requiresConfirmation: announcement.requiresConfirmation,
    readCount: 45,
    unreadCount: 75,
  };
}

export function toEventDto(event: FamilyEvent, peopleById = new Map<string, PersonProfile>()) {
  return {
    id: event.id,
    familyId: event.familyId,
    title: event.title,
    eventType: event.eventType,
    eventDate: dateOnly(event.eventDate) ?? "",
    relatedPersonNames: event.relatedPersonIds.map((id) => peopleById.get(id)?.name ?? id),
    location: event.location ?? undefined,
    description: event.description,
    recorderName: event.recorderName,
    importance: event.importance,
  };
}

export function toRelationshipDto(relationship: Relationship) {
  return {
    id: relationship.id,
    familyId: relationship.familyId,
    fromPersonId: relationship.fromPersonId,
    toPersonId: relationship.toPersonId,
    relationType: relationship.relationType,
    status: relationship.status,
    source: relationship.source ?? undefined,
  };
}

export function toEditHistoryDto(history: EditHistory) {
  return {
    id: history.id,
    familyId: history.familyId,
    personId: history.personProfileId,
    editorName: history.editorName,
    fieldName: history.fieldName,
    oldValueMasked: history.oldValueMasked ?? undefined,
    newValueMasked: history.newValueMasked ?? undefined,
    reason: history.reason ?? undefined,
    createdAt: dateTime(history.createdAt) ?? "",
  };
}

export function toTreeDto(people: PersonProfile[], relationships: Relationship[]) {
  return {
    nodes: people.map((person) => ({
      id: `node-${person.id}`,
      personId: person.id,
      name: person.name,
      avatarUrl: person.avatarUrl ?? undefined,
      generation: person.generation ?? undefined,
      branch: person.branch ?? undefined,
      isRegistered: person.isRegistered,
      isAlive: person.isAlive,
      claimStatus: person.claimStatus,
      confidenceLevel: person.confidenceLevel,
      createdByName: person.createdByName,
      lastEditedByName: person.lastEditedByName,
      statusTags: buildPersonStatusTags(person),
    })),
    edges: relationships.map((relationship) => ({
      id: relationship.id,
      from: `node-${relationship.fromPersonId}`,
      to: `node-${relationship.toPersonId}`,
      relationType: relationship.relationType,
      status: relationship.status,
    })),
  };
}

