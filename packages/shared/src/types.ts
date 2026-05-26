export type IdentityDocumentType = "CHINA_ID" | "PASSPORT";

export type UserRole =
  | "GUEST"
  | "REGISTERED_USER"
  | "FAMILY_MEMBER"
  | "PARENT"
  | "LEADER"
  | "SYSTEM_ADMIN";

export type FamilyMemberRole = "MEMBER" | "PARENT" | "LEADER";

export type FamilyMemberStatus = "ACTIVE" | "LEFT" | "PENDING" | "REJECTED";

export type Gender = "MALE" | "FEMALE" | "UNKNOWN";

export type DateCalendarType = "SOLAR" | "LUNAR" | "UNKNOWN";

export type ClaimStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";

export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";

export type RelationshipType = "FATHER" | "MOTHER" | "SPOUSE" | "CHILD";

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED" | "NEEDS_MORE_INFO";

export type RelationshipStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "INACTIVE"
  | "DISPUTED";

export type ReviewType =
  | "JOIN_FAMILY"
  | "CLAIM_PROFILE"
  | "RELATIONSHIP_CHANGE"
  | "ADD_UNREGISTERED_MEMBER"
  | "EXIT_FAMILY"
  | "PROFILE_CHANGE";

export type VisibilityScope =
  | "PUBLIC_TO_FAMILY"
  | "DIRECT_RELATIVES_ONLY"
  | "LEADER_ONLY"
  | "SELF_ONLY";

export interface UserAccount {
  id: string;
  realName: string;
  documentType: IdentityDocumentType;
  maskedDocumentNumber: string;
  maskedPhone?: string;
  personProfileId?: string;
  createdAt: string;
}

export interface Family {
  id: string;
  name: string;
  code: string;
  description?: string;
  ancestralHome?: string;
  originPlace?: string;
  hallLocation?: string;
  coverImageUrl?: string;
  leaderName: string;
  totalMembers: number;
}

export interface PersonProfile {
  id: string;
  name: string;
  formerName?: string;
  gender: Gender;
  maskedDocumentNumber?: string;
  birthDate?: string;
  birthDateType: DateCalendarType;
  deathDate?: string;
  deathDateType?: DateCalendarType;
  isAlive: boolean;
  isRegistered: boolean;
  claimStatus: ClaimStatus;
  generation?: number;
  branch?: string;
  courtesyGenerationName?: string;
  nativePlace?: string;
  currentResidence?: string;
  avatarUrl?: string;
  biography?: string;
  createdByName: string;
  lastEditedByName: string;
  source?: string;
  confidenceLevel: ConfidenceLevel;
  allowClaim: boolean;
  statusTags: string[];
}

export interface FamilyMember {
  id: string;
  familyId: string;
  personProfileId: string;
  role: FamilyMemberRole;
  status: FamilyMemberStatus;
  joinedAt?: string;
}

export interface Relationship {
  id: string;
  familyId: string;
  fromPersonId: string;
  toPersonId: string;
  relationType: RelationshipType;
  status: RelationshipStatus;
  source?: string;
}

export interface FamilyTreeNode {
  id: string;
  personId: string;
  name: string;
  avatarUrl?: string;
  generation?: number;
  branch?: string;
  isRegistered: boolean;
  isAlive: boolean;
  claimStatus?: ClaimStatus;
  confidenceLevel?: ConfidenceLevel;
  createdByName?: string;
  lastEditedByName?: string;
  statusTags: string[];
}

export interface FamilyTreeEdge {
  id: string;
  from: string;
  to: string;
  relationType: RelationshipType;
  status: RelationshipStatus;
}

export interface ReviewItem {
  id: string;
  familyId: string;
  type: ReviewType;
  status: ReviewStatus;
  applicantName: string;
  relatedPersonName?: string;
  submittedAt: string;
  summary: string;
}

export interface Announcement {
  id: string;
  familyId: string;
  title: string;
  type: string;
  publisherName: string;
  publishedAt: string;
  priority: "NORMAL" | "IMPORTANT" | "URGENT";
  requiresConfirmation: boolean;
  readCount: number;
  unreadCount: number;
}

export interface FamilyEvent {
  id: string;
  familyId: string;
  title: string;
  eventType: string;
  eventDate: string;
  relatedPersonNames: string[];
  location?: string;
  description: string;
  recorderName: string;
  importance: "NORMAL" | "IMPORTANT";
}
