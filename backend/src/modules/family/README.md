# family 模块说明

## 职责

管理家族信息、检索和统计，是首页和家族入口页的核心数据来源。

## 路由

- `GET /api/families/my`
- `GET /api/families/search`
- `POST /api/families`
- `POST /api/families/:familyId/join`
- `GET /api/families/:familyId`
- `GET /api/families/:familyId/stats`

## 主要模型

- `Family`
- `FamilyMember`
- `PersonProfile`
- `ReviewItem`
- `Announcement`

## 当前实现状态

- 优先查 Prisma。
- 数据库不可用时回退 `mockData`。
- 通过 `toFamilyDto` 统一输出字段，前端无需感知数据库结构细节。

