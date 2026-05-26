# 家族图谱 Family Graph

项目按需求文档初始化为前后端分离结构，当前阶段只包含目录结构、路由结构、共享类型、Mock 数据、Prisma 初版模型和基础页面骨架。

## 目录

- `apps/web`: React + TypeScript + Vite 前端，移动端优先页面骨架
- `apps/api`: Node.js + TypeScript + Express 后端模块骨架
- `packages/shared`: 前后端共享领域类型
- `prisma`: PostgreSQL 数据模型草案

## 本阶段范围

- 不实现完整系统
- 不接真实数据库
- 不处理真实认证、短信、文件上传和图谱自动布局
- 页面使用 Mock 数据展示核心信息结构
