# relationship 模块说明

## 职责

维护成员间关系（父母、配偶、子女），为图谱和关系页提供边数据。

## 路由

- `GET /api/families/:familyId/relationships`
- `POST /api/families/:familyId/relationships`
- `PATCH /api/families/:familyId/relationships/:relationshipId`

## 主要模型

- `Relationship`
- `PersonProfile`

## 当前实现状态

- 支持关系查询和新增。
- 新增默认 `PENDING`，可对接审核流程。
- 回应通过 `toRelationshipDto` 统一格式。

