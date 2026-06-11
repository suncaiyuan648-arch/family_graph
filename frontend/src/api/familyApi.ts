import type {
  Announcement,
  Family,
  FamilyEvent,
  FamilyTreeEdge,
  FamilyTreeNode,
  PersonProfile,
  Relationship,
  ReviewItem,
} from "@family-graph/shared";
import { apiClient } from "./client";

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
};

async function getData<T>(url: string) {
  const response = await apiClient.get<ApiEnvelope<T>>(url);
  return response.data.data;
}

export const familyApi = {
  getMyFamilies: () => getData<{ families: Family[]; activeFamilyId: string }>("/families/my"),
  getFamily: (familyId: string) => getData<Family>(`/families/${familyId}`),
  getStats: (familyId: string) =>
    getData<{
      totalMembers: number;
      registeredMembers: number;
      unregisteredMembers: number;
      deceasedMembers: number;
      pendingReviews: number;
      unreadAnnouncements: number;
    }>(`/families/${familyId}/stats`),
  listMembers: (familyId: string) => getData<PersonProfile[]>(`/families/${familyId}/members`),
  getMember: (familyId: string, memberId: string) => getData<PersonProfile>(`/families/${familyId}/members/${memberId}`),
  listEditHistory: (familyId: string, memberId: string) =>
    getData<Array<{
      id: string;
      familyId: string;
      personId: string;
      editorName: string;
      fieldName: string;
      oldValueMasked?: string;
      newValueMasked?: string;
      reason?: string;
      createdAt: string;
    }>>(`/families/${familyId}/members/${memberId}/edit-history`),
  getTree: (familyId: string) =>
    getData<{ nodes: FamilyTreeNode[]; edges: FamilyTreeEdge[] }>(`/families/${familyId}/tree`),
  listRelationships: (familyId: string) => getData<Relationship[]>(`/families/${familyId}/relationships`),
  listApprovals: (familyId: string) => getData<ReviewItem[]>(`/families/${familyId}/approvals`),
  listAnnouncements: (familyId: string) => getData<Announcement[]>(`/families/${familyId}/announcements`),
  listEvents: (familyId: string) => getData<FamilyEvent[]>(`/families/${familyId}/events`),
};

