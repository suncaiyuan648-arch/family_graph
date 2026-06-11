# member 模块说明

## 职责

负责成员档案相关能力：列表、详情、编辑、编辑历史、未注册成员新增。

## 路由

- `GET /api/families/:familyId/members`
- `POST /api/families/:familyId/members`
- `POST /api/families/:familyId/members/unregistered`
- `GET /api/families/:familyId/members/:memberId`
- `PATCH /api/families/:familyId/members/:memberId`
- `GET /api/families/:familyId/members/:memberId/edit-history`

## 主要模型

- `PersonProfile`
- `FamilyMember`
- `EditHistory`

## 当前实现状态

- 列表和详情已经走 Prisma 查询。
- `PATCH` 支持基础字段更新，并回写 `lastEditedByName`。
- 输出统一通过 `toPersonDto` / `toEditHistoryDto`。

