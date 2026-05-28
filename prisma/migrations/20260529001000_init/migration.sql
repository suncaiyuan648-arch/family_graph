-- CreateEnum
CREATE TYPE "IdentityDocumentType" AS ENUM ('CHINA_ID', 'PASSPORT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "DateCalendarType" AS ENUM ('SOLAR', 'LUNAR', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "FamilyMemberRole" AS ENUM ('MEMBER', 'PARENT', 'LEADER');

-- CreateEnum
CREATE TYPE "FamilyMemberStatus" AS ENUM ('ACTIVE', 'LEFT', 'PENDING', 'REJECTED');

-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('NONE', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ConfidenceLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('FATHER', 'MOTHER', 'SPOUSE', 'CHILD');

-- CreateEnum
CREATE TYPE "RelationshipStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'INACTIVE', 'DISPUTED');

-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('JOIN_FAMILY', 'CLAIM_PROFILE', 'RELATIONSHIP_CHANGE', 'ADD_UNREGISTERED_MEMBER', 'EXIT_FAMILY', 'PROFILE_CHANGE');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'NEEDS_MORE_INFO');

-- CreateEnum
CREATE TYPE "VisibilityScope" AS ENUM ('PUBLIC_TO_FAMILY', 'DIRECT_RELATIVES_ONLY', 'LEADER_ONLY', 'SELF_ONLY');

-- CreateEnum
CREATE TYPE "AnnouncementPriority" AS ENUM ('NORMAL', 'IMPORTANT', 'URGENT');

-- CreateEnum
CREATE TYPE "FamilyEventImportance" AS ENUM ('NORMAL', 'IMPORTANT');

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" TEXT NOT NULL,
    "documentType" "IdentityDocumentType" NOT NULL,
    "documentNumberEncrypted" TEXT NOT NULL,
    "documentNumberHash" TEXT NOT NULL,
    "realName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "phoneEncrypted" TEXT,
    "phoneHash" TEXT,
    "passwordHash" TEXT NOT NULL,
    "personProfileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "ancestralHome" TEXT,
    "originPlace" TEXT,
    "hallLocation" TEXT,
    "coverImageUrl" TEXT,
    "founderName" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "formerName" TEXT,
    "gender" "Gender" NOT NULL DEFAULT 'UNKNOWN',
    "documentType" "IdentityDocumentType",
    "documentNumberEncrypted" TEXT,
    "documentNumberHash" TEXT,
    "birthDate" TIMESTAMP(3),
    "birthDateType" "DateCalendarType" NOT NULL DEFAULT 'UNKNOWN',
    "deathDate" TIMESTAMP(3),
    "deathDateType" "DateCalendarType",
    "isAlive" BOOLEAN NOT NULL DEFAULT true,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "claimStatus" "ClaimStatus" NOT NULL DEFAULT 'NONE',
    "phoneEncrypted" TEXT,
    "phoneHash" TEXT,
    "avatarUrl" TEXT,
    "nationality" TEXT,
    "nativePlace" TEXT,
    "ancestralHome" TEXT,
    "birthPlace" TEXT,
    "currentResidence" TEXT,
    "detailedAddressEncrypted" TEXT,
    "branch" TEXT,
    "generation" INTEGER,
    "courtesyGenerationName" TEXT,
    "siblingRank" INTEGER,
    "biography" TEXT,
    "education" TEXT,
    "occupation" TEXT,
    "workplace" TEXT,
    "achievements" TEXT,
    "source" TEXT,
    "confidenceLevel" "ConfidenceLevel" NOT NULL DEFAULT 'UNKNOWN',
    "allowClaim" BOOLEAN NOT NULL DEFAULT true,
    "createdByName" TEXT NOT NULL,
    "lastEditedByName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "personProfileId" TEXT NOT NULL,
    "role" "FamilyMemberRole" NOT NULL DEFAULT 'MEMBER',
    "status" "FamilyMemberStatus" NOT NULL DEFAULT 'PENDING',
    "joinedAt" TIMESTAMP(3),
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "fromPersonId" TEXT NOT NULL,
    "toPersonId" TEXT NOT NULL,
    "relationType" "RelationshipType" NOT NULL,
    "status" "RelationshipStatus" NOT NULL DEFAULT 'PENDING',
    "source" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewItem" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "applicantUserId" TEXT,
    "type" "ReviewType" NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "relatedEntityId" TEXT,
    "relatedPersonName" TEXT,
    "summary" TEXT NOT NULL,
    "payload" JSONB,
    "reviewerUserId" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimRequest" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "applicantUserId" TEXT NOT NULL,
    "personProfileId" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "statement" TEXT,
    "evidenceUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClaimRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExitRequest" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "applicantUserId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "keepGenealogyProfile" BOOLEAN NOT NULL DEFAULT true,
    "hideContact" BOOLEAN NOT NULL DEFAULT true,
    "allowNameInGenealogy" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExitRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "publisherUserId" TEXT NOT NULL,
    "publisherName" TEXT NOT NULL,
    "priority" "AnnouncementPriority" NOT NULL DEFAULT 'NORMAL',
    "requiresConfirmation" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyEvent" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "relatedPersonIds" TEXT[],
    "location" TEXT,
    "description" TEXT NOT NULL,
    "recorderUserId" TEXT NOT NULL,
    "recorderName" TEXT NOT NULL,
    "importance" "FamilyEventImportance" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "FamilyEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivacySetting" (
    "id" TEXT NOT NULL,
    "personProfileId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "visibility" "VisibilityScope" NOT NULL,

    CONSTRAINT "PrivacySetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditHistory" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "personProfileId" TEXT NOT NULL,
    "editorUserId" TEXT NOT NULL,
    "editorName" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "oldValueMasked" TEXT,
    "newValueMasked" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EditHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorUserId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "ipAddress" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_documentNumberHash_key" ON "UserAccount"("documentNumberHash");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_phoneHash_key" ON "UserAccount"("phoneHash");

-- CreateIndex
CREATE INDEX "UserAccount_realName_idx" ON "UserAccount"("realName");

-- CreateIndex
CREATE UNIQUE INDEX "Family_code_key" ON "Family"("code");

-- CreateIndex
CREATE INDEX "Family_name_idx" ON "Family"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PersonProfile_documentNumberHash_key" ON "PersonProfile"("documentNumberHash");

-- CreateIndex
CREATE INDEX "PersonProfile_name_idx" ON "PersonProfile"("name");

-- CreateIndex
CREATE INDEX "PersonProfile_branch_idx" ON "PersonProfile"("branch");

-- CreateIndex
CREATE INDEX "PersonProfile_generation_idx" ON "PersonProfile"("generation");

-- CreateIndex
CREATE INDEX "FamilyMember_familyId_role_status_idx" ON "FamilyMember"("familyId", "role", "status");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyMember_familyId_personProfileId_key" ON "FamilyMember"("familyId", "personProfileId");

-- CreateIndex
CREATE INDEX "Relationship_familyId_status_idx" ON "Relationship"("familyId", "status");

-- CreateIndex
CREATE INDEX "Relationship_fromPersonId_relationType_idx" ON "Relationship"("fromPersonId", "relationType");

-- CreateIndex
CREATE INDEX "Relationship_toPersonId_relationType_idx" ON "Relationship"("toPersonId", "relationType");

-- CreateIndex
CREATE INDEX "ReviewItem_familyId_type_status_idx" ON "ReviewItem"("familyId", "type", "status");

-- CreateIndex
CREATE INDEX "ClaimRequest_familyId_status_idx" ON "ClaimRequest"("familyId", "status");

-- CreateIndex
CREATE INDEX "ExitRequest_familyId_status_idx" ON "ExitRequest"("familyId", "status");

-- CreateIndex
CREATE INDEX "Announcement_familyId_publishedAt_idx" ON "Announcement"("familyId", "publishedAt");

-- CreateIndex
CREATE INDEX "FamilyEvent_familyId_eventDate_idx" ON "FamilyEvent"("familyId", "eventDate");

-- CreateIndex
CREATE UNIQUE INDEX "PrivacySetting_personProfileId_fieldName_key" ON "PrivacySetting"("personProfileId", "fieldName");

-- CreateIndex
CREATE INDEX "EditHistory_familyId_personProfileId_createdAt_idx" ON "EditHistory"("familyId", "personProfileId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_actorUserId_createdAt_idx" ON "AuditLog"("actorUserId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_personProfileId_fkey" FOREIGN KEY ("personProfileId") REFERENCES "PersonProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_personProfileId_fkey" FOREIGN KEY ("personProfileId") REFERENCES "PersonProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_fromPersonId_fkey" FOREIGN KEY ("fromPersonId") REFERENCES "PersonProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_toPersonId_fkey" FOREIGN KEY ("toPersonId") REFERENCES "PersonProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewItem" ADD CONSTRAINT "ReviewItem_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewItem" ADD CONSTRAINT "ReviewItem_applicantUserId_fkey" FOREIGN KEY ("applicantUserId") REFERENCES "UserAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimRequest" ADD CONSTRAINT "ClaimRequest_personProfileId_fkey" FOREIGN KEY ("personProfileId") REFERENCES "PersonProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyEvent" ADD CONSTRAINT "FamilyEvent_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivacySetting" ADD CONSTRAINT "PrivacySetting_personProfileId_fkey" FOREIGN KEY ("personProfileId") REFERENCES "PersonProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditHistory" ADD CONSTRAINT "EditHistory_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditHistory" ADD CONSTRAINT "EditHistory_personProfileId_fkey" FOREIGN KEY ("personProfileId") REFERENCES "PersonProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "UserAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

