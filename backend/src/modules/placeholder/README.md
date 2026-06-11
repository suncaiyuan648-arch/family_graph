# placeholder 模块说明

## 职责

承载 V1 阶段占位接口与图谱接口，避免前端页面阻塞。

## 路由

- `GET /api/families/:familyId/tree`
- `GET /api/families/:familyId/chat/rooms`
- `GET /api/families/:familyId/marketplace`
- `GET /api/families/:familyId/ai`

## 主要模型

- `PersonProfile`
- `Relationship`

## 当前实现状态

- `tree` 优先查 Prisma，并通过 `toTreeDto` 生成节点/边。
- 其余接口为占位数据，后续可迁移到独立模块实现。

