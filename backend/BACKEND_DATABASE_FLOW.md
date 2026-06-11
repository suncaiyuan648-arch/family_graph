# 后端-数据库流程说明

## 1. 整体调用链

前端页面调用 `frontend/src/api/familyApi.ts` 中的接口方法，访问 `http://localhost:3000/api/*`。

后端链路：

1. `server.ts` 启动 Express 服务。
2. `app.ts` 注册中间件（`cors`、`json`、`morgan`）和 `/api` 路由。
3. `routes.ts` 按业务模块分发到 `modules/*/*.routes.ts`。
4. 每个模块先尝试走 Prisma（真实数据库），失败时回退到 `data/mockData.ts`（兜底数据）。
5. 返回统一结构：`{ success: true, data }`。

## 2. 数据库访问策略

当前实现是“Prisma 优先 + Mock 回退”：

- `lib/database.ts`：`databaseEnabled()` 判断是否配置了 `DATABASE_URL`。
- `lib/prisma.ts`：提供 PrismaClient 单例，避免热更新重复建连接。
- 各模块 `try/catch` 内查询 Prisma；异常时返回 mock。

这让项目在数据库不可用时仍可开发 UI，在数据库可用时自动切回真实数据。

## 3. 数据映射层

`lib/mappers.ts` 负责把 Prisma 模型转换为前端需要的 DTO 形态，例如：

- `toPersonDto`
- `toFamilyDto`
- `toReviewDto`
- `toTreeDto`

意义：

- 后端可以自由调整数据库字段。
- 前端接口字段保持稳定，减少联动修改。

## 4. 迁移与 Seed 流程

数据库定义在 `backend/prisma/schema.prisma`。

初始化步骤：

1. `npm run prisma:generate`
2. `npm run prisma:migrate -- --name init`
3. `npm run prisma:seed`

相关文件：

- 迁移脚本：`backend/prisma/migrations/20260529001000_init/migration.sql`
- 种子数据：`backend/prisma/seed.ts`

## 5. 当前模块分工

- `auth`：登录、注册、短信码、当前用户信息
- `family`：家族基础信息、检索、统计
- `member`：成员列表、详情、编辑、编辑历史、未注册成员新增
- `relationship`：关系查询和新增/变更
- `approval`：审核列表、详情、同意/拒绝
- `claim`：身份认领候选、认领申请
- `exit`：退出家族申请
- `announcement`：公告列表和发布
- `event`：大事记列表和新增
- `placeholder`：图谱、群聊/互助/AI 占位接口

## 6. 你需要重点记住的实践

1. 先保证 PostgreSQL 可用，再跑 migration/seed。
2. 新增接口时优先写 Prisma 分支，再保留 mock 回退。
3. 对外响应字段尽量经由 `mappers.ts` 输出，避免直接暴露数据库结构。
4. 前端只通过 `familyApi.ts` 调后端，不要再在页面里硬编码 mock 数组。
