# Family Graph 开发运行文档

本文档用于本地开发、调试和临时分享访问。产品规则、页面优先级和业务字段以 `family_graph_product_plan_v1_v2_v3.md` 为准。

## 1. 项目结构

```text
apps/web      React + TypeScript + Vite 前端
apps/api      Node.js + Express API 服务
packages      共享类型与工具包
prisma        Prisma schema、migration、seed
```

## 2. 环境依赖

当前项目依赖：

- Node.js / npm
- PostgreSQL 16
- Prisma
- Docker Desktop，可选，用于容器化运行 PostgreSQL
- cloudflared，可选，用于内网穿透

本机已安装并配置：

- PostgreSQL 服务：`postgresql-x64-16`
- Docker Desktop / Docker CLI
- cloudflared

## 3. 环境变量

本地使用 `.env`：

```env
DATABASE_URL="postgresql://family_graph:family_graph@localhost:5432/family_graph?schema=public"
JWT_SECRET="replace-with-local-secret"
API_PORT=3000
WEB_PORT=5173
VITE_API_BASE_URL="http://localhost:3000/api"
```

首次配置可复制：

```powershell
Copy-Item .env.example .env
```

## 4. 数据库

当前推荐使用本机 PostgreSQL，不需要 Docker 即可开发。

检查 PostgreSQL 服务：

```powershell
Get-Service postgresql*
```

检查数据库数据：

```powershell
node -e "const {PrismaClient}=require('@prisma/client'); const p=new PrismaClient(); Promise.all([p.family.count(),p.personProfile.count(),p.reviewItem.count()]).then(([families,people,reviews])=>console.log({families,people,reviews})).finally(()=>p.$disconnect())"
```

首次初始化数据库：

```powershell
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

常用 Prisma 命令：

```powershell
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## 5. 启动后端 API

开发模式：

```powershell
npm run dev:api
```

构建后运行：

```powershell
npm --workspace apps/api run build
node apps/api/dist/server.js
```

默认地址：

```text
http://localhost:3000/api
```

快速验证：

```powershell
Invoke-RestMethod http://localhost:3000/api/families/family-lin/stats
```

## 6. 启动前端

通常命令：

```powershell
npm run dev:web
```

注意：当前 Windows 机器保留了 `5141-5240` 端口段，所以默认 `5173` 可能无法监听。已验证可用端口为 `5400`：

```powershell
npm --workspace apps/web run dev -- --host 127.0.0.1 --port 5400
```

访问：

```text
http://localhost:5400/login
```

如果需要局域网其他设备访问前端，改为监听 `0.0.0.0`，并使用未被系统保留的端口：

```powershell
npm --workspace apps/web run dev -- --host 0.0.0.0 --port 5400
```

如果被防火墙拦截，需要允许该端口入站访问。

## 7. Docker 的作用

Docker 在本项目中不是必须项，但推荐用于团队统一开发环境。

主要用途：

- 用容器启动 PostgreSQL，避免每个人手动安装数据库
- 保证数据库版本、用户名、密码、端口一致
- 后续可以加入 Redis、对象存储、搜索服务等依赖

项目已提供 `docker-compose.yml`，用于启动 PostgreSQL：

```powershell
docker compose up -d postgres
```

注意：如果本机 PostgreSQL 已经占用 `5432`，不要同时启动 compose 里的 PostgreSQL，否则会端口冲突。二选一即可：

- 本机 PostgreSQL：使用当前 `.env`
- Docker PostgreSQL：停止本机 PostgreSQL 或修改 compose/`.env` 端口

检查 Docker：

```powershell
docker --version
docker compose version
docker info
```

如果 Docker Desktop 显示 ready，但命令行提示 pipe 权限问题，确认当前用户已加入 `docker-users` 组，并重新登录 Windows。

## 8. 内网穿透

用于把本机前端临时暴露给其他人访问。推荐用 cloudflared。

前提：前端已启动，例如：

```powershell
npm --workspace apps/web run dev -- --host 127.0.0.1 --port 5400
```

启动临时隧道：

```powershell
cloudflared tunnel --url http://localhost:5400
```

命令输出中会出现一个公网地址，类似：

```text
https://xxxx.trycloudflare.com
```

把这个地址发给别人即可访问前端页面。

如果前端页面需要调用本机 API，前端当前默认调用：

```text
http://localhost:3000/api
```

这只对本机浏览器有效。给别人访问时有两种做法：

1. 同时给 API 也开一个 cloudflared tunnel，并把前端 `VITE_API_BASE_URL` 改成 API 的公网地址。
2. 临时把前后端部署到同一公网环境。

API 隧道示例：

```powershell
cloudflared tunnel --url http://localhost:3000
```

然后在 `.env` 或启动命令中设置：

```env
VITE_API_BASE_URL="https://你的-api-tunnel.trycloudflare.com/api"
```

修改前端环境变量后，需要重启前端 dev server。

## 9. 常见问题

### 5173 端口无法启动

检查 Windows 保留端口：

```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```

当前机器 `5141-5240` 被保留，所以 `5173` 不可用。改用 `5400`。

### Prisma generate 报 EPERM

通常是 API 进程占用了 Prisma 引擎文件。先停止 API，再执行：

```powershell
npm run prisma:generate
```

### Docker pipe permission denied

把当前用户加入 `docker-users` 组后重新登录：

```powershell
net localgroup docker-users %USERNAME% /add
```

### API 返回 mock 数据

后端代码会在没有 `DATABASE_URL` 或数据库不可用时降级到 mock 数据。确认：

- `.env` 存在
- `DATABASE_URL` 正确
- PostgreSQL 正在运行
- 已执行 migration 和 seed

## 10. 推荐开发启动顺序

1. 启动 PostgreSQL 或 Docker PostgreSQL。
2. 执行 `npm run prisma:migrate`。
3. 执行 `npm run prisma:seed`。
4. 启动 API：`npm run dev:api`。
5. 启动前端：`npm --workspace apps/web run dev -- --host 127.0.0.1 --port 5400`。
6. 访问 `http://localhost:5400/login`。

