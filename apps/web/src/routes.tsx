import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./shell/AppShell";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { FamilyCreatePage } from "./pages/FamilyCreatePage";
import { FamilyJoinPage } from "./pages/FamilyJoinPage";
import { FamilyOverviewPage } from "./pages/FamilyOverviewPage";
import { FamilyTreePage } from "./pages/FamilyTreePage";
import { MembersPage } from "./pages/MembersPage";
import { MemberProfilePage } from "./pages/MemberProfilePage";
import { UnregisteredMemberNewPage } from "./pages/UnregisteredMemberNewPage";
import { ApprovalsPage } from "./pages/ApprovalsPage";
import { ClaimPage } from "./pages/ClaimPage";
import { ClaimRequestsPage } from "./pages/ClaimRequestsPage";
import { ExitRequestPage } from "./pages/ExitRequestPage";
import { ExitRequestsPage } from "./pages/ExitRequestsPage";
import { AnnouncementsPage } from "./pages/AnnouncementsPage";
import { EventsPage } from "./pages/EventsPage";
import { ChatPage } from "./pages/ChatPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { AiPage } from "./pages/AiPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    element: <AppShell />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/family/create", element: <FamilyCreatePage /> },
      { path: "/family/join", element: <FamilyJoinPage /> },
      { path: "/family/:familyId", element: <FamilyOverviewPage /> },
      { path: "/family/:familyId/tree", element: <FamilyTreePage /> },
      { path: "/family/:familyId/members", element: <MembersPage /> },
      { path: "/family/:familyId/member/:memberId", element: <MemberProfilePage /> },
      { path: "/family/:familyId/unregistered-members/new", element: <UnregisteredMemberNewPage /> },
      { path: "/family/:familyId/approvals", element: <ApprovalsPage /> },
      { path: "/family/:familyId/claim", element: <ClaimPage /> },
      { path: "/family/:familyId/claim-requests", element: <ClaimRequestsPage /> },
      { path: "/family/:familyId/exit-request", element: <ExitRequestPage /> },
      { path: "/family/:familyId/exit-requests", element: <ExitRequestsPage /> },
      { path: "/family/:familyId/announcements", element: <AnnouncementsPage /> },
      { path: "/family/:familyId/events", element: <EventsPage /> },
      { path: "/family/:familyId/chat", element: <ChatPage /> },
      { path: "/family/:familyId/marketplace", element: <MarketplacePage /> },
      { path: "/family/:familyId/ai", element: <AiPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);
