# exit 模块说明

## 职责

负责退出家族申请，包括提交申请和查询申请列表。

## 路由

- `POST /api/families/:familyId/exit-requests`
- `GET /api/families/:familyId/exit-requests`

## 主要模型

- `ExitRequest`

## 当前实现状态

- 已接入 Prisma 写入和读取。
- 数据库不可用时回退 `mockData.exitRequests`。
- 已覆盖隐私选项字段（保留档案、隐藏联系方式等）。

