# Prisma 数据库模块说明

## 职责

`prisma` 目录负责数据库结构定义、迁移管理和初始化数据。

## 文件说明

- `schema.prisma`：数据库模型、枚举、关系和索引定义
- `migrations/*`：版本化 SQL 迁移脚本
- `seed.ts`：初始化 mock 业务数据

## 关键模型

- `UserAccount`：账号实体
- `Family`：家族实体
- `PersonProfile`：成员档案核心实体
- `FamilyMember`：成员与家族关系（角色、状态）
- `Relationship`：成员关系边（父母/配偶/子女）
- `ReviewItem`：审核流程
- `ClaimRequest`：认领申请
- `ExitRequest`：退出申请
- `Announcement`：公告
- `FamilyEvent`：大事记
- `EditHistory`：编辑记录

## 常用命令

```powershell
npm run prisma:generate
npm run prisma:migrate -- --name <name>
npm run prisma:seed
```

## 与后端的关系

`backend/src/lib/prisma.ts` 提供 PrismaClient 单例；各 `modules/*` 路由优先查询 Prisma，再通过 `lib/mappers.ts` 转换为前端 DTO。
