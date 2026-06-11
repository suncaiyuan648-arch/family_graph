# 家族图谱 Family Graph

项目按需求文档初始化为前后端分离结构，当前包含前端页面骨架、Express API、Prisma 数据库模型、Mock/Seed 数据和基础开发脚本。

## 目录

- `frontend`: React + TypeScript + Vite 前端，包含前端共享类型 `frontend/shared`
- `backend`: Node.js + TypeScript + Express 后端，包含 Prisma、数据库脚本和 Docker 配置
- `DEVELOPMENT.md`: 本地开发、数据库、Docker、内网穿透说明

## 启动

前端：

```powershell
npm run dev:frontend
```

后端基础开发：

```powershell
npm run dev:backend
```

后端完整启动（数据库初始化、连接检查、API 启动、cloudflared 隧道）：

```powershell
npm run dev:backend:full
```

## 本阶段范围

- 不实现完整系统
- 已接入 PostgreSQL + Prisma，数据库不可用时保留 Mock 回退
- 不处理真实认证、短信、文件上传和图谱自动布局
- 页面使用 Mock 数据展示核心信息结构
