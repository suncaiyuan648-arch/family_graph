# claim 模块说明

## 职责

处理身份认领流程：候选档案、认领申请提交、认领申请列表。

## 路由

- `GET /api/claim/candidates`
- `POST /api/claim`
- `GET /api/claim`
- `GET /api/families/:familyId/claim-requests`（同一模块挂载）

## 主要模型

- `PersonProfile`
- `ClaimRequest`
- `ReviewItem`

## 当前实现状态

- 候选档案从未注册且允许认领的人物中生成。
- 提交申请写入 `ClaimRequest`。
- 列表接口可读 `ReviewItem` 中 `CLAIM_PROFILE` 类型。

