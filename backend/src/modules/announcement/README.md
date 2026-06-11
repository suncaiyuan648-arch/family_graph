# announcement 模块说明

## 职责

管理家族公告，供公告页和首页摘要使用。

## 路由

- `GET /api/families/:familyId/announcements`
- `POST /api/families/:familyId/announcements`
- `POST /api/families/:familyId/announcements/:announcementId/confirm`

## 主要模型

- `Announcement`

## 当前实现状态

- 列表和新增均支持 Prisma。
- 使用 `toAnnouncementDto` 输出前端字段。
- 确认接口当前为轻量占位响应，后续可扩展签到/确认明细表。

