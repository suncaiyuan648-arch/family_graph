# event 模块说明

## 职责

提供家族大事记能力，支持列表查看和事件新增。

## 路由

- `GET /api/families/:familyId/events`
- `POST /api/families/:familyId/events`

## 主要模型

- `FamilyEvent`
- `PersonProfile`（用于关联成员名展示）

## 当前实现状态

- 列表接口可从 `FamilyEvent` 查询并映射相关成员名。
- 新增接口写入 `FamilyEvent`。
- 输出由 `toEventDto` 统一格式。

