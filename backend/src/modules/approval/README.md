# approval 模块说明

## 职责

提供审核中心能力：按类型/状态筛选审核项，处理通过、拒绝、补充材料。

## 路由

- `GET /api/families/:familyId/approvals`
- `GET /api/families/:familyId/approvals/:approvalId`
- `POST /api/families/:familyId/approvals/:approvalId/approve`
- `POST /api/families/:familyId/approvals/:approvalId/reject`
- `POST /api/families/:familyId/approvals/:approvalId/need-more-proof`
- `POST /api/families/:familyId/approvals/:approvalId/request-more-info`

## 主要模型

- `ReviewItem`
- `UserAccount`（申请人信息）

## 当前实现状态

- 审核列表和详情已可读写 Prisma。
- 通过 `toReviewDto` 对外统一输出。
- 审核动作会更新 `status` 和 `reviewedAt`。

