import { Router } from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { familyRouter } from "./modules/family/family.routes";
import { memberRouter } from "./modules/member/member.routes";
import { relationshipRouter } from "./modules/relationship/relationship.routes";
import { approvalRouter } from "./modules/approval/approval.routes";
import { claimRouter } from "./modules/claim/claim.routes";
import { exitRouter } from "./modules/exit/exit.routes";
import { announcementRouter } from "./modules/announcement/announcement.routes";
import { eventRouter } from "./modules/event/event.routes";
import { placeholderRouter } from "./modules/placeholder/placeholder.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/families", familyRouter);
apiRouter.use("/families/:familyId/members", memberRouter);
apiRouter.use("/families/:familyId/relationships", relationshipRouter);
apiRouter.use("/families/:familyId/approvals", approvalRouter);
apiRouter.use("/families/:familyId/claim-requests", claimRouter);
apiRouter.use("/families/:familyId/exit-requests", exitRouter);
apiRouter.use("/families/:familyId/announcements", announcementRouter);
apiRouter.use("/families/:familyId/events", eventRouter);
apiRouter.use("/families/:familyId", placeholderRouter);
