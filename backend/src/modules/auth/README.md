# auth 模块说明

## 职责

负责认证相关接口：注册、登录、短信验证码、当前登录用户信息。

## 路由

- `POST /api/auth/register`
- `POST /api/auth/login-by-id`
- `POST /api/auth/send-phone-code`
- `POST /api/auth/login-by-phone-code`
- `POST /api/auth/bind-phone`
- `GET /api/auth/me`
- `POST /api/auth/logout`

## 数据依赖

当前主要返回 mock 结构，后续可扩展到 `UserAccount` 表作为真实认证数据源。

## 当前实现状态

- 已提供完整 API 形态（便于前端联调）。
- 返回结构稳定，但认证安全（密码哈希校验、JWT、验证码网关）仍是后续增强点。

