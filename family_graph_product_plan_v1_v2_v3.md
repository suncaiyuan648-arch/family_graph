# 家族图谱系统产品开发 Plan

> 文档用途：用于统一产品需求、指导 Figma 页面设计、指导 Codex / Cursor / Claude Code 分阶段开发。  
> 当前策略：保留完整产品愿景，但第一版只做可落地的 MVP，复杂家族治理、群聊、互助、AI 等能力作为后续扩展。

---

## 0. 产品一句话定位

本产品是一个以 **家族图谱** 和 **家族档案** 为核心的数字族谱系统，支持族长创建家族、录入成员、建立亲属关系、展示家族图谱；支持未注册成员、本人身份认领、成员资料编辑记录、加入与退出审核，并为后续多家族治理、小家庭同步、公告、大事记、群聊、互助和 AI 分析预留扩展能力。

---

## 1. 产品边界与版本规划

### 1.1 当前判断

这个系统完整形态会很大，如果第一版就做完全部需求，会导致设计、开发、测试和上线都非常困难。因此采用三阶段规划：

- **V1：数字族谱 MVP** —— 先让一个家族能跑起来。
- **V2：家族治理版** —— 解决多人协作维护、权限细分、多家族、小家庭等问题。
- **V3：扩展生态版** —— 扩展轻社交、互助、AI、导出和跨家族体系。

---

### 1.2 V1：数字族谱 MVP

目标：让族长可以创建家族、录入成员、建立关系，成员可以加入和认领身份，所有已加入成员能看到清晰的家族图谱。

#### V1 必做功能

1. 身份证 / 护照注册。
2. 手机号绑定。
3. 手机验证码快捷登录。
4. 创建家族。
5. 搜索并申请加入家族。
6. 族长审核加入申请。
7. 成员档案管理。
8. 未注册成员录入。
9. 未注册成员展示。
10. 本人身份认领申请。
11. 族长审核身份认领。
12. 父亲、母亲、配偶、子女关系管理。
13. 基础家族图谱展示。
14. 资料整理人、最后编辑人、资料来源、可信度展示。
15. 基础编辑历史记录。
16. 成员申请退出家族。
17. 族长审核退出家族。
18. 移动端适配。

#### V1 暂不做

1. 群聊。
2. 互助平台。
3. AI 分析。
4. 复杂上下级家族体系。
5. 小家庭自动同步到大家族。
6. 家族管理员 / 小家庭管理员复杂权限。
7. 完整 Git 式回滚。
8. 传统族谱导出。
9. 复杂多配偶自动排版。
10. 离线通知 / 推送。

---

### 1.3 V2：家族治理版

目标：支持多人协作维护族谱，解决权限、审核、多家族、小家庭和资料可信问题。

#### V2 功能

1. 家族切换功能。
2. 一个自然人加入多个家族。
3. 每个自然人只能创建一个“小家庭”。
4. 小家庭作为独立家族空间存在。
5. 小家庭成员可选择公开或并入更大家族。
6. 族长可设置家族管理员。
7. 族长可设置小家庭管理员。
8. 管理员权限范围控制。
9. 资料修改审批。
10. 他人编辑在世注册用户资料，需要本人审核。
11. 完整编辑历史、版本对比、必要时回滚。
12. 家族公告。
13. 家族大事记。
14. 成员公开申请、成员并入申请。
15. 多家族之间的关联展示。

---

### 1.4 V3：扩展生态版

目标：从数字族谱工具扩展为轻量家族平台。

#### V3 功能

1. 家族群聊。
2. 小家庭群聊。
3. 私聊。
4. 家族互助平台。
5. AI 家族分析。
6. 传统族谱导出。
7. 现代全亲缘图谱。
8. 上下级家族体系。
9. 跨家族成员关联。
10. 复杂多配偶、多婚姻、收养、过继图谱展示。
11. 家族资源分析。
12. 家族迁徙路线。
13. 家族人口结构分析。

---

## 2. V1 核心业务规则

### 2.1 注册与登录规则

1. 用户注册使用身份证号或护照号。
2. 手机号不是唯一注册依据，而是绑定后用于验证码快捷登录。
3. 身份证号、护照号属于敏感信息，前端展示时必须脱敏。
4. V1 不做复杂实名认证，只做身份字段采集、加密存储和审核辅助。
5. 支持：
   - 证件号 + 密码登录。
   - 手机号 + 验证码登录。
   - 手机号 + 密码登录，可选。

---

### 2.2 家族规则

1. 用户可以创建家族。
2. 创建家族的用户默认为族长。
3. V1 中每个家族作为独立空间存在。
4. V1 可先支持用户加入多个家族的数据能力，但前端家族切换可以简化处理或作为 V2 完整功能。
5. 所有家族内页面都应保留 `familyId` 上下文，避免后续多家族切换时重构。

---

### 2.3 加入家族规则

1. 用户可以通过以下方式搜索家族：
   - 家族名称。
   - 家族编号。
   - 族长姓名。
   - 成员姓名。
   - 身份证号 / 护照号匹配。
2. 使用身份证号或护照号搜索时，不应直接暴露完整匹配成员信息。
3. 加入家族必须经过族长审核。
4. 审核通过后，族长可以为申请人分配关系、代际、支系等信息。
5. 被拒绝后应展示拒绝原因。

---

### 2.4 未注册成员规则

未注册成员是 V1 的核心能力。

#### 未注册成员包括

1. 刚出生的孩子。
2. 年幼未注册成员。
3. 已故长辈。
4. 不使用系统的老人。
5. 历史族谱人物。
6. 由族长或亲属代为整理的成员。

#### 展示状态

未注册成员在页面和图谱中需要显示：

- 未注册。
- 已故。
- 待认领。
- 资料待确认。

#### 未注册成员展示方式

1. 图谱头像边框使用虚线。
2. 头像或姓名旁展示“未注册”标签。
3. 已故成员头像灰度显示。
4. 档案页展示资料整理人、最后编辑人、资料来源和可信度。

---

### 2.5 身份认领规则

1. 认领机制只允许本人认领。
2. 父母、配偶、子女、族长、亲属不能代替本人认领。
3. 其他人可以补充资料、提交纠错、协助完善，但不能完成身份认领。
4. 已故成员不可被认领。
5. 被锁定为历史人物或存在争议的档案不可直接认领。
6. 认领申请必须经过族长审核。
7. 审核通过后，注册账号与该成员档案绑定。

---

### 2.6 退出家族规则

1. 成员加入家族后，不能直接退出。
2. 退出家族需要提交申请。
3. 族长审核通过后才可退出。
4. 退出不删除历史档案和历史关系。
5. 退出后只改变该用户对该家族的访问权限。
6. 退出后成员状态可显示为“已退出”，但历史图谱可根据权限继续保留显示。

---

### 2.7 关系规则

V1 只支持核心关系：

1. 父亲。
2. 母亲。
3. 配偶。
4. 子女。

V1 数据结构应预留多配偶能力，但页面可先用简单方式展示。

#### 多配偶预留规则

1. 系统不能假设一个人只有一个配偶。
2. 一个成员可以存在多个配偶关系。
3. 每段婚姻关系应预留状态：当前、已离异、丧偶、历史关系、未知。
4. 子女应归属到对应父母组合下，避免多个配偶场景下关系混乱。
5. V1 可以简单展示多个配偶列表，不做复杂自动图谱排版。

---

### 2.8 资料编辑规则

1. 每一次资料编辑都要记录。
2. 编辑记录至少包含：
   - 编辑人。
   - 被编辑成员。
   - 编辑字段。
   - 修改前内容。
   - 修改后内容。
   - 编辑时间。
   - 编辑原因。
   - 审核状态。
3. 编辑自己的资料，编辑记录默认不对其他普通成员公开。
4. 编辑他人的资料，需要在对方档案中展示资料整理和最后编辑信息。
5. 如果被编辑对象是“在世 + 已注册用户”，他人修改其资料需要本人审核同意。
6. V1 可先实现基础编辑历史，不要求完整 Git 式回滚。

---

## 3. V1 角色与权限

### 3.1 V1 角色

V1 只实现最小权限集合：

1. 族长。
2. 普通成员。
3. 申请中用户。
4. 未注册成员。

V2 再扩展：

1. 家族管理员。
2. 小家庭管理员。
3. 支系管理员。

---

### 3.2 族长权限

族长可以查看：

1. 全部成员列表。
2. 全部未注册成员。
3. 完整家族图谱。
4. 待审核加入申请。
5. 待审核认领申请。
6. 待审核退出申请。
7. 待审核关系修改申请。
8. 成员资料整理人。
9. 成员最后编辑人。
10. 资料来源。
11. 资料可信度。
12. 基础编辑历史。

族长可以操作：

1. 编辑家族信息。
2. 审核加入家族。
3. 审核退出家族。
4. 审核身份认领。
5. 添加未注册成员。
6. 编辑未注册成员资料。
7. 建立父母、配偶、子女关系。
8. 修改成员关系。
9. 分配代际。
10. 分配支系。
11. 锁定争议档案，V2 可完善。

族长对敏感字段的处理：

1. 默认只看脱敏身份证号、护照号、手机号、住址。
2. 在认领审核、身份冲突、关系争议等必要场景下，可查看或比对敏感字段。
3. 查看敏感字段应记录操作日志。

---

### 3.3 普通成员权限

普通成员可以查看：

1. 家族基础信息。
2. 家族图谱基础视图。
3. 自己的成员档案。
4. 直系亲属公开档案。
5. 公开成员信息。
6. 自己提交的申请状态。
7. 与自己相关的审核结果。

普通成员可以操作：

1. 编辑自己的非敏感资料。
2. 申请修改自己的重要资料。
3. 申请建立关系。
4. 申请认领未注册身份。
5. 申请退出家族。
6. 提交他人资料纠错或补充。

普通成员不能直接操作：

1. 删除关系。
2. 修改他人档案并直接生效。
3. 查看他人身份证号。
4. 查看他人护照号。
5. 查看他人手机号。
6. 查看他人详细住址。
7. 查看全部审核记录。
8. 导出完整家族数据。

---

### 3.4 申请中用户权限

申请中用户可以查看：

1. 自己申请加入的家族名称。
2. 申请状态。
3. 审核结果。
4. 需要补充材料的提示。

申请中用户不能查看：

1. 家族完整图谱。
2. 家族成员列表。
3. 家族成员档案。
4. 家族内部公告。

---

### 3.5 未注册成员权限

未注册成员没有登录账号，不具备主动操作权限。

未注册成员可以被：

1. 族长录入。
2. 族长编辑。
3. 族长建立关系。
4. 本人未来注册后申请认领。

---

## 4. V1 前端页面详细规划

### 4.1 全局设计要求

1. 移动端优先，建议设计尺寸 390 × 844。
2. 风格：米白背景、深棕色主色、圆角卡片、低饱和色标签。
3. 页面结构要简单清晰，适合中老年和年轻成员共同使用。
4. 底部 Tab 建议保留：
   - 首页。
   - 图谱。
   - 成员。
   - 审核，仅族长显示。
   - 我的。
5. 每个家族内页面都需要携带当前家族上下文。

---

### 4.2 登录页

#### 页面路径

`/login`

#### 页面功能

1. 证件号 + 密码登录。
2. 手机号 + 验证码登录。
3. 跳转注册。
4. 忘记密码。

#### 字段

1. 证件类型：身份证 / 护照。
2. 证件号码。
3. 手机号。
4. 验证码。
5. 密码。

#### 展示内容

1. 产品名称：家族图谱 / 家族档案。
2. 副标题：连接亲人，记录传承。
3. 隐私提示：证件信息仅用于身份识别和家族身份认领，不会公开展示。

#### 权限

所有用户可访问。

---

### 4.3 注册页

#### 页面路径

`/register`

#### 页面功能

1. 身份证或护照注册。
2. 绑定手机号。
3. 设置密码。
4. 勾选隐私协议。

#### 字段

1. 证件类型。
2. 证件号码。
3. 真实姓名。
4. 手机号。
5. 短信验证码。
6. 密码。
7. 确认密码。

#### 提示

1. 证件号不会公开展示。
2. 注册后可申请加入家族或认领已有家族身份。

---

### 4.4 家族首页

#### 页面路径

`/families/:familyId/home`

#### 页面功能

1. 展示当前家族概览。
2. 快捷进入图谱、成员、审核、申请、我的档案。
3. 展示最近动态，V1 可做简单 mock 或基础列表。

#### 展示字段

1. 家族名称。
2. 家族编号。
3. 我的身份：族长 / 成员 / 申请中。
4. 总成员数。
5. 已注册成员数。
6. 未注册成员数。
7. 已故成员数。
8. 待审核数量，族长可见。
9. 最近更新。

#### 族长可见

1. 待审核入口。
2. 添加成员按钮。
3. 家族设置入口。
4. 未注册成员管理入口。

#### 普通成员可见

1. 图谱入口。
2. 成员列表入口。
3. 我的档案入口。
4. 申请修改关系入口。
5. 申请退出家族入口。

#### 申请中用户可见

1. 申请状态。
2. 补充资料入口。
3. 不展示家族完整数据。

---

### 4.5 家族图谱页

#### 页面路径

`/families/:familyId/tree`

#### 页面功能

1. 展示家族成员关系图。
2. 支持缩放、拖拽。
3. 点击节点打开成员简要信息抽屉。
4. 支持搜索成员。
5. 支持按状态筛选：全部、未注册、已故、待确认。

#### 节点展示字段

1. 头像。
2. 姓名。
3. 代际。
4. 注册状态。
5. 生卒状态。
6. 关系状态。

#### 节点视觉规则

1. 已注册成员：正常头像边框。
2. 未注册成员：虚线边框。
3. 已故成员：灰度头像 + 已故标签。
4. 待确认关系：黄色虚线连线。
5. 配偶关系：横向连线。
6. 父母子女关系：纵向连线。

#### 族长可见

1. 完整图谱。
2. 待审核关系。
3. 未注册成员。
4. 添加关系按钮。
5. 编辑关系按钮。

#### 普通成员可见

1. 基础图谱。
2. 自己相关关系路径。
3. 公开成员信息。
4. 不显示敏感字段。

#### V1 限制

1. 只做父母、配偶、子女关系。
2. 多配偶只做简单列表或分组展示。
3. 不做复杂自动排版优化。

---

### 4.6 成员列表页

#### 页面路径

`/families/:familyId/members`

#### 页面功能

1. 查看成员列表。
2. 搜索成员。
3. 按状态筛选。
4. 进入成员档案。
5. 族长可添加成员。

#### 搜索字段

1. 姓名。
2. 曾用名。
3. 代际。
4. 支系。
5. 状态。
6. 证件号搜索仅族长审核场景使用，展示脱敏结果。

#### 列表卡片字段

1. 头像。
2. 姓名。
3. 代际。
4. 支系。
5. 状态标签：已注册 / 未注册 / 已故 / 待认领 / 资料待确认。
6. 与我的关系，普通成员视角可见。
7. 最后更新时间。

#### 族长可见

1. 添加成员。
2. 批量筛选未注册成员。
3. 查看待认领成员。
4. 查看资料待确认成员。

#### 普通成员可见

1. 可见成员列表。
2. 成员公开档案入口。
3. 不显示证件号、手机号、详细住址。

---

### 4.7 成员档案页

#### 页面路径

`/families/:familyId/member/:personId`

#### 页面功能

1. 展示成员完整档案。
2. 按权限显示不同字段。
3. 展示资料整理与编辑信息。
4. 支持编辑、纠错、认领、关系修改等操作。

#### 基础字段

1. 头像。
2. 姓名。
3. 曾用名。
4. 性别。
5. 证件类型。
6. 脱敏证件号。
7. 出生日期。
8. 出生日期类型：阴历 / 阳历。
9. 是否已故。
10. 去世日期。
11. 去世日期类型。
12. 籍贯。
13. 出生地。
14. 现居地，按权限显示。
15. 学历。
16. 毕业院校。
17. 职业。
18. 工作单位。
19. 职务。
20. 个人生平。

#### 家族关系字段

1. 父亲。
2. 母亲。
3. 配偶。
4. 子女。
5. 代际。
6. 支系。
7. 与当前用户关系。

#### 档案可信信息

1. 资料整理人。
2. 首次整理时间。
3. 最后编辑人。
4. 最后更新时间。
5. 资料来源。
6. 可信度：待确认 / 基本可信 / 已确认 / 存在争议。

#### 族长可见按钮

1. 编辑档案。
2. 修改关系。
3. 添加父亲。
4. 添加母亲。
5. 添加配偶。
6. 添加子女。
7. 设置代际。
8. 设置支系。
9. 查看编辑历史。
10. 锁定档案，V2 可完善。

#### 普通成员可见按钮

1. 编辑我的资料，仅本人档案显示。
2. 申请修改关系。
3. 提交资料纠错。
4. 申请认领，仅未注册且可认领时显示。

#### 未注册成员可见状态

1. 未注册。
2. 待认领。
3. 已故。
4. 资料待确认。
5. 资料由谁整理。

#### 敏感字段显示规则

1. 本人可见自己的完整手机号、证件号、详细住址。
2. 普通成员不可见他人的证件号、手机号、详细住址。
3. 族长默认看脱敏信息，在审核必要场景可查看或比对。

---

### 4.8 添加 / 编辑成员页

#### 页面路径

`/families/:familyId/members/new`  
`/families/:familyId/member/:personId/edit`

#### 页面功能

1. 添加注册成员资料。
2. 添加未注册成员资料。
3. 编辑成员资料。
4. 提交编辑原因。
5. 自动生成编辑记录。

#### 字段

1. 姓名。
2. 曾用名。
3. 性别。
4. 是否未注册。
5. 是否已故。
6. 出生日期。
7. 阴历 / 阳历。
8. 去世日期。
9. 籍贯。
10. 现居地。
11. 学历。
12. 工作。
13. 个人生平。
14. 资料来源。
15. 可信度。
16. 编辑原因。

#### 权限

1. 族长可直接添加未注册成员。
2. 普通成员添加他人资料应进入审核或纠错流程。
3. 编辑在世已注册他人资料，需要本人审核。

---

### 4.9 加入家族页

#### 页面路径

`/families/join`

#### 页面功能

1. 搜索家族。
2. 查看搜索结果。
3. 提交加入申请。
4. 查看申请状态。

#### 搜索字段

1. 家族名称。
2. 家族编号。
3. 族长姓名。
4. 成员姓名。
5. 身份证号 / 护照号。

#### 申请字段

1. 申请人姓名。
2. 证件类型。
3. 脱敏证件号。
4. 手机号。
5. 与家族中某人的关系。
6. 申请说明。
7. 证明材料，可选。

#### 展示规则

1. 搜索结果不暴露完整敏感信息。
2. 申请中用户只能看到申请状态。

---

### 4.10 身份认领页

#### 页面路径

`/claim`

#### 页面功能

1. 系统展示可能属于本人的未注册档案。
2. 用户申请认领。
3. 查看认领申请状态。

#### 候选档案字段

1. 姓名。
2. 出生年月，脱敏或部分展示。
3. 所属家族。
4. 代际。
5. 资料整理人。
6. 资料来源。
7. 匹配说明。

#### 规则

1. 只能本人申请认领。
2. 已故成员不可认领。
3. 认领需要族长审核。

---

### 4.11 审核中心页

#### 页面路径

`/families/:familyId/approvals`

#### 页面功能

1. 族长处理各类审核。
2. 查看申请详情。
3. 同意、拒绝、要求补充材料。

#### V1 审核类型

1. 加入家族。
2. 退出家族。
3. 身份认领。
4. 添加成员。
5. 修改关系。
6. 修改他人资料。

#### 审核卡片字段

1. 申请类型。
2. 申请人。
3. 关联成员。
4. 申请说明。
5. 提交时间。
6. 状态。
7. 证明材料。
8. 审核操作。

#### 族长可见

全部审核列表。

#### 普通成员可见

不可进入审核中心，只能在“我的申请”中查看自己的申请。

---

### 4.12 退出家族申请页

#### 页面路径

`/families/:familyId/exit`

#### 页面功能

1. 成员提交退出家族申请。
2. 查看审核状态。

#### 字段

1. 退出原因。
2. 是否隐藏个人联系方式。
3. 是否允许族谱继续显示姓名。
4. 是否保留历史档案。

#### 提示

退出家族需要族长审核。审核通过后，你将不再拥有该家族访问权限，但历史族谱关系不会被直接删除。

---

### 4.13 我的页面

#### 页面路径

`/profile`

#### 页面功能

1. 查看我的账号信息。
2. 查看我的档案。
3. 查看我加入的家族。
4. 查看我的申请。
5. 绑定手机号。
6. 退出登录。

#### 字段

1. 头像。
2. 姓名。
3. 当前家族。
4. 当前角色。
5. 手机号。
6. 证件类型。
7. 脱敏证件号。

#### V1 可简化

1. 只显示当前家族。
2. 多家族切换入口可预留为 V2。

---

## 5. V2 / V3 前端预留页面

### 5.1 V2 预留页面

1. 家族切换页。
2. 我的小家庭页。
3. 小家庭成员管理页。
4. 成员公开到大家族页。
5. 管理员设置页。
6. 完整编辑历史页。
7. 家族公告页。
8. 家族大事记页。

---

### 5.2 V3 预留页面

1. 家族群聊页。
2. 小家庭群聊页。
3. 家族互助平台页。
4. AI 分析页。
5. 传统族谱导出页。
6. 跨家族关联页。

---

## 6. 后端技术方案

### 6.1 技术栈

前端：

- React。
- TypeScript。
- Vite。
- Tailwind CSS。
- React Router。
- Zustand。
- React Flow，图谱展示。

后端：

- Node.js。
- Express 或 NestJS。
- TypeScript。
- PostgreSQL。
- Prisma。
- JWT。
- bcrypt。
- Multer，本地文件上传，V1 可选。

部署：

- 个人电脑部署。
- Cloudflare Tunnel 推荐。
- Docker Compose 管理 PostgreSQL。
- PM2 或 Docker 管理 Node 服务。

---

## 7. V1 数据库设计

以下为 V1 完整可实现版本，已为 V2 / V3 预留扩展空间。

---

### 7.1 UserAccount 用户账号表

用于登录和认证。

```prisma
model UserAccount {
  id                 String   @id @default(uuid())
  idType             IdType
  idNumberHash       String   @unique
  idNumberEncrypted  String
  realName           String
  phone              String?  @unique
  phoneVerified      Boolean  @default(false)
  email              String?  @unique
  passwordHash       String
  status             AccountStatus @default(ACTIVE)
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  lastLoginAt        DateTime?

  personProfile      PersonProfile?
}

enum IdType {
  CHINA_ID
  PASSPORT
}

enum AccountStatus {
  ACTIVE
  DISABLED
}
```

---

### 7.2 PersonProfile 自然人档案表

用于存储一个自然人的真实档案。未注册成员也存在 PersonProfile，但 userAccountId 为空。

```prisma
model PersonProfile {
  id                  String   @id @default(uuid())
  userAccountId       String?  @unique
  userAccount         UserAccount? @relation(fields: [userAccountId], references: [id])

  realName            String
  formerName          String?
  gender              Gender?
  avatarUrl           String?

  idType              IdType?
  idNumberHash        String?
  idNumberEncrypted   String?

  birthDate           DateTime?
  birthCalendarType   CalendarType?
  deathDate           DateTime?
  deathCalendarType   CalendarType?
  isAlive             Boolean  @default(true)

  birthPlace          String?
  nativePlace         String?
  currentAddress      String?

  education           String?
  school              String?
  occupation          String?
  company             String?
  jobTitle            String?
  biography           String?

  isRegistered        Boolean  @default(false)
  claimable           Boolean  @default(true)
  claimStatus         ClaimStatus @default(NONE)

  sourceType          SourceType?
  confidenceLevel     ConfidenceLevel @default(PENDING_CONFIRM)

  createdByPersonId   String?
  lastEditedByPersonId String?

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  familyMembers       FamilyMember[]
}

enum Gender {
  MALE
  FEMALE
  OTHER
  UNKNOWN
}

enum CalendarType {
  SOLAR
  LUNAR
}

enum ClaimStatus {
  NONE
  PENDING
  APPROVED
  REJECTED
}

enum SourceType {
  SELF
  PARENT
  FAMILY_LEADER
  OLD_GENEALOGY
  RELATIVE_ORAL
  TOMBSTONE
  PUBLIC_RECORD
  OTHER
}

enum ConfidenceLevel {
  PENDING_CONFIRM
  BASIC_TRUSTED
  CONFIRMED
  DISPUTED
}
```

---

### 7.3 Family 家族表

```prisma
model Family {
  id              String   @id @default(uuid())
  name            String
  code            String   @unique
  description     String?
  leaderPersonId  String
  originPlace     String?
  coverImageUrl   String?
  status          FamilyStatus @default(ACTIVE)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  members         FamilyMember[]
}

enum FamilyStatus {
  ACTIVE
  DISABLED
}
```

---

### 7.4 FamilyMember 家族成员表

一个自然人在不同家族中的身份不同，因此角色、代际、支系都放在 FamilyMember 中。

```prisma
model FamilyMember {
  id            String   @id @default(uuid())
  familyId      String
  family        Family   @relation(fields: [familyId], references: [id])
  personId      String
  person        PersonProfile @relation(fields: [personId], references: [id])

  role          FamilyRole @default(MEMBER)
  generation    Int?
  branch        String?
  relationLabel String?

  memberStatus  MemberStatus @default(ACTIVE)
  joinStatus    JoinStatus @default(APPROVED)
  exitStatus    ExitStatus @default(NONE)

  joinedAt      DateTime?
  leftAt        DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@unique([familyId, personId])
}

enum FamilyRole {
  LEADER
  MEMBER
}

enum MemberStatus {
  ACTIVE
  LEFT
  REMOVED
  DECEASED
  UNREGISTERED
}

enum JoinStatus {
  PENDING
  APPROVED
  REJECTED
}

enum ExitStatus {
  NONE
  EXIT_PENDING
  EXIT_APPROVED
  EXIT_REJECTED
}
```

V2 可扩展 FamilyRole：

```txt
FAMILY_ADMIN
HOUSEHOLD_ADMIN
BRANCH_ADMIN
```

---

### 7.5 Marriage 婚姻 / 配偶关系表

V1 可简单使用，V2 支持复杂多配偶。

```prisma
model Marriage {
  id              String   @id @default(uuid())
  familyId        String
  personAId       String
  personBId       String
  marriageOrder   Int?
  marriageDate    DateTime?
  divorceDate     DateTime?
  status          MarriageStatus @default(CURRENT)
  notes           String?
  createdBy       String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum MarriageStatus {
  CURRENT
  DIVORCED
  WIDOWED
  HISTORICAL
  UNKNOWN
}
```

---

### 7.6 ParentChild 父母子女关系表

```prisma
model ParentChild {
  id              String   @id @default(uuid())
  familyId        String
  childPersonId   String
  fatherPersonId  String?
  motherPersonId  String?
  marriageId      String?
  relationType    ParentChildType @default(BIOLOGICAL)
  status          RelationStatus @default(APPROVED)
  createdBy       String?
  approvedBy      String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum ParentChildType {
  BIOLOGICAL
  ADOPTIVE
  STEP
  UNKNOWN
}

enum RelationStatus {
  PENDING
  APPROVED
  REJECTED
  INACTIVE
}
```

---

### 7.7 ApprovalRequest 审核申请表

统一处理加入、退出、认领、资料修改、关系修改。

```prisma
model ApprovalRequest {
  id                String   @id @default(uuid())
  familyId          String
  applicantUserId   String?
  applicantPersonId String?
  targetPersonId    String?
  type              ApprovalType
  payload           Json
  status            ApprovalStatus @default(PENDING)
  reviewerPersonId  String?
  reviewComment     String?
  createdAt         DateTime @default(now())
  reviewedAt        DateTime?
}

enum ApprovalType {
  JOIN_FAMILY
  EXIT_FAMILY
  CLAIM_PERSON
  ADD_MEMBER
  UPDATE_PERSON_INFO
  UPDATE_RELATIONSHIP
}

enum ApprovalStatus {
  PENDING
  APPROVED
  REJECTED
  NEED_MORE_PROOF
}
```

---

### 7.8 PersonEditHistory 编辑历史表

```prisma
model PersonEditHistory {
  id              String   @id @default(uuid())
  personId        String
  editorPersonId  String?
  editorUserId    String?
  editType        EditType
  changedFields   Json
  beforeData      Json?
  afterData       Json?
  reason          String?
  approvalId      String?
  visibility      EditHistoryVisibility @default(PRIVATE_RELATED)
  createdAt       DateTime @default(now())
}

enum EditType {
  CREATE
  UPDATE
  RELATION_UPDATE
  CLAIM_APPROVED
  STATUS_CHANGE
}

enum EditHistoryVisibility {
  PRIVATE_SELF
  PRIVATE_RELATED
  PUBLIC_FAMILY
  ADMIN_ONLY
}
```

---

### 7.9 Announcement 公告表，V2 正式启用

```prisma
model Announcement {
  id          String   @id @default(uuid())
  familyId    String
  title       String
  content     String
  type        AnnouncementType
  importance  ImportanceLevel @default(NORMAL)
  createdBy   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum AnnouncementType {
  GENERAL
  GATHERING
  WORSHIP
  OBITUARY
  WEDDING
  BIRTH
  TODO
}

enum ImportanceLevel {
  NORMAL
  IMPORTANT
  CRITICAL
}
```

---

### 7.10 FamilyEvent 家族大事记表，V2 正式启用

```prisma
model FamilyEvent {
  id              String   @id @default(uuid())
  familyId        String
  title           String
  content         String?
  eventDate       DateTime?
  calendarType    CalendarType?
  eventType       FamilyEventType
  importance      ImportanceLevel @default(NORMAL)
  location        String?
  relatedPersonIds String[]
  images          String[]
  createdBy       String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum FamilyEventType {
  BIRTH
  MARRIAGE
  EDUCATION
  MOVE
  CAREER
  DEATH
  WORSHIP
  GATHERING
  HONOR
  GENEALOGY_UPDATE
  OTHER
}
```

---

## 8. V1 后端接口设计

### 8.1 Auth 认证接口

```txt
POST /api/auth/register
POST /api/auth/login-by-id
POST /api/auth/send-phone-code
POST /api/auth/login-by-phone-code
POST /api/auth/bind-phone
GET  /api/auth/me
POST /api/auth/logout
```

#### register 请求字段

```json
{
  "idType": "CHINA_ID",
  "idNumber": "string",
  "realName": "string",
  "phone": "string",
  "phoneCode": "string",
  "password": "string"
}
```

---

### 8.2 Family 家族接口

```txt
POST /api/families
GET  /api/families/my
GET  /api/families/search
GET  /api/families/:familyId
PATCH /api/families/:familyId
POST /api/families/:familyId/join
```

#### 创建家族

```json
{
  "name": "林氏家族",
  "description": "string",
  "originPlace": "string"
}
```

#### 搜索家族

支持 query：

```txt
name
code
leaderName
memberName
idNumber
```

---

### 8.3 Member 成员接口

```txt
GET  /api/families/:familyId/members
GET  /api/families/:familyId/members/:personId
POST /api/families/:familyId/members
PATCH /api/families/:familyId/members/:personId
```

#### 获取成员列表支持筛选

```txt
keyword
status
isRegistered
isAlive
generation
branch
```

#### 添加成员

```json
{
  "realName": "string",
  "gender": "MALE",
  "isRegistered": false,
  "isAlive": true,
  "birthDate": "2020-01-01",
  "birthCalendarType": "SOLAR",
  "sourceType": "PARENT",
  "confidenceLevel": "PENDING_CONFIRM"
}
```

---

### 8.4 Relationship 关系接口

```txt
GET  /api/families/:familyId/relationships
POST /api/families/:familyId/parent-child
POST /api/families/:familyId/marriages
PATCH /api/families/:familyId/parent-child/:id
PATCH /api/families/:familyId/marriages/:id
```

#### 添加父母子女关系

```json
{
  "childPersonId": "string",
  "fatherPersonId": "string",
  "motherPersonId": "string",
  "relationType": "BIOLOGICAL"
}
```

#### 添加配偶关系

```json
{
  "personAId": "string",
  "personBId": "string",
  "status": "CURRENT",
  "marriageDate": "string"
}
```

---

### 8.5 Claim 身份认领接口

```txt
GET  /api/claim/candidates
POST /api/families/:familyId/persons/:personId/claim
GET  /api/families/:familyId/claim-requests
```

V1 可将 claim request 存在 ApprovalRequest 中。

---

### 8.6 Approval 审核接口

```txt
GET  /api/families/:familyId/approvals
GET  /api/families/:familyId/approvals/:approvalId
POST /api/families/:familyId/approvals/:approvalId/approve
POST /api/families/:familyId/approvals/:approvalId/reject
POST /api/families/:familyId/approvals/:approvalId/need-more-proof
```

---

### 8.7 Exit 退出家族接口

```txt
POST /api/families/:familyId/exit-request
GET  /api/families/:familyId/exit-requests
```

也可以统一进入 ApprovalRequest。

---

### 8.8 Edit History 编辑历史接口

```txt
GET /api/families/:familyId/persons/:personId/edit-history
```

权限规则：

1. 本人可看自己的编辑记录。
2. 族长可看家族内必要编辑记录。
3. 普通成员不可看他人的隐私编辑记录。

---

### 8.9 Tree 图谱接口

```txt
GET /api/families/:familyId/tree
```

返回：

```json
{
  "nodes": [
    {
      "personId": "string",
      "name": "string",
      "avatarUrl": "string",
      "generation": 18,
      "branch": "长房",
      "isRegistered": false,
      "isAlive": true,
      "statusTags": ["未注册"]
    }
  ],
  "edges": [
    {
      "type": "parent-child",
      "from": "fatherPersonId",
      "to": "childPersonId",
      "status": "APPROVED"
    },
    {
      "type": "marriage",
      "from": "personAId",
      "to": "personBId",
      "status": "CURRENT"
    }
  ]
}
```

---

## 9. 权限校验规则

### 9.1 后端权限原则

所有权限必须由后端校验，前端隐藏按钮只是用户体验，不能作为安全依据。

### 9.2 权限判断维度

1. 当前用户是否登录。
2. 当前用户是否拥有 PersonProfile。
3. 当前用户是否属于当前 familyId。
4. 当前用户在当前家族中的 role。
5. 当前操作对象是不是本人。
6. 当前操作对象是否已注册、是否在世。
7. 当前字段是否敏感。
8. 当前操作是否需要审核。

### 9.3 敏感字段

敏感字段包括：

1. 身份证号。
2. 护照号。
3. 手机号。
4. 邮箱。
5. 详细住址。
6. 证明材料。

展示规则：

1. 本人可看自己的完整敏感字段。
2. 普通成员不可看他人的敏感字段。
3. 族长默认看脱敏字段。
4. 审核必要时可查看或比对敏感字段，并记录日志。

---

## 10. Codex 实现步骤

以下内容可直接作为 Codex 的开发任务输入。

---

### 10.1 Codex 总提示词

```md
你正在开发一个“家族图谱与家族档案管理系统”。

请严格按本文档实现 V1 MVP，不要一次性实现 V2/V3 功能。

产品核心：
- 家族图谱
- 成员档案
- 未注册成员
- 本人身份认领
- 族长审核
- 基础关系管理

技术栈：
- 前端：React + TypeScript + Vite + Tailwind CSS
- 路由：React Router
- 状态：Zustand
- 图谱：React Flow
- 后端：Node.js + Express 或 NestJS + TypeScript
- 数据库：PostgreSQL + Prisma
- 认证：JWT

请先实现可运行的 V1 MVP。
Figma 只作为视觉参考，本文档是业务准则。
如果 Figma 与本文档冲突，以本文档为准。
```

---

### 10.2 Step 1：项目初始化

任务：

1. 创建 monorepo 结构。
2. 创建前端 Vite React TypeScript 项目。
3. 创建后端 Node.js TypeScript 项目。
4. 配置 ESLint / Prettier。
5. 配置 Tailwind CSS。
6. 配置 React Router。
7. 配置 Zustand。
8. 配置 Prisma。
9. 配置 PostgreSQL Docker Compose。

建议目录：

```txt
family-graph-app/
  apps/
    web/
      src/
        api/
        components/
        layouts/
        pages/
        routes/
        stores/
        types/
        mocks/
    server/
      src/
        modules/
        common/
        config/
        middlewares/
        prisma/
  docker-compose.yml
  package.json
  README.md
```

---

### 10.3 Step 2：定义类型与 Mock 数据

任务：

1. 定义前端 TypeScript 类型。
2. 创建 mock users。
3. 创建 mock families。
4. 创建 mock members。
5. 创建 mock relationships。
6. 创建 mock approvals。
7. 前端先用 mock 数据跑通页面。

必须定义的类型：

1. UserAccount。
2. PersonProfile。
3. Family。
4. FamilyMember。
5. ParentChild。
6. Marriage。
7. ApprovalRequest。
8. PersonEditHistory。

---

### 10.4 Step 3：前端基础页面骨架

任务：

1. 实现登录页。
2. 实现注册页。
3. 实现家族首页。
4. 实现家族图谱页。
5. 实现成员列表页。
6. 实现成员档案页。
7. 实现添加 / 编辑成员页。
8. 实现加入家族页。
9. 实现身份认领页。
10. 实现审核中心页。
11. 实现退出家族申请页。
12. 实现我的页面。

页面先不接真实接口，用 mock 数据。

---

### 10.5 Step 4：前端权限显示

任务：

1. 实现 `useCurrentFamilyRole()`。
2. 实现 `canViewSensitiveField()`。
3. 实现 `canEditPerson()`。
4. 实现 `canApproveRequest()`。
5. 实现不同角色按钮显示。
6. 族长显示审核入口，普通成员隐藏。
7. 普通成员看不到他人敏感字段。
8. 未注册成员显示认领入口。

---

### 10.6 Step 5：后端 Prisma 模型

任务：

1. 建立 Prisma schema。
2. 实现 UserAccount。
3. 实现 PersonProfile。
4. 实现 Family。
5. 实现 FamilyMember。
6. 实现 Marriage。
7. 实现 ParentChild。
8. 实现 ApprovalRequest。
9. 实现 PersonEditHistory。
10. 执行 migration。
11. 创建 seed 数据。

---

### 10.7 Step 6：后端 Auth 模块

任务：

1. 实现注册。
2. 实现证件号登录。
3. 实现 JWT。
4. 实现手机号验证码登录，V1 可用 mock 验证码。
5. 实现获取当前用户。
6. 实现密码加密。
7. 实现证件号 hash 与加密存储。

---

### 10.8 Step 7：后端 Family 与 Member 模块

任务：

1. 创建家族。
2. 查询我的家族。
3. 搜索家族。
4. 获取家族详情。
5. 获取成员列表。
6. 获取成员详情。
7. 添加未注册成员。
8. 编辑成员资料。
9. 编辑时写入 PersonEditHistory。

---

### 10.9 Step 8：后端关系模块

任务：

1. 添加父母子女关系。
2. 添加配偶关系。
3. 获取家族关系数据。
4. 生成 tree 接口数据。
5. 修改关系时根据权限判断是否直接生效或进入审核。

---

### 10.10 Step 9：审核模块

任务：

1. 加入家族申请。
2. 退出家族申请。
3. 认领身份申请。
4. 添加成员申请。
5. 修改关系申请。
6. 修改他人资料申请。
7. 族长 approve。
8. 族长 reject。
9. 族长要求补充材料。

---

### 10.11 Step 10：前后端联调

任务：

1. 前端登录接真实接口。
2. 家族首页接真实接口。
3. 成员列表接真实接口。
4. 成员档案接真实接口。
5. 图谱页接 tree 接口。
6. 审核中心接真实接口。
7. 加入 / 退出 / 认领流程联调。
8. 权限显示与后端权限校验一致。

---

### 10.12 Step 11：部署

任务：

1. 编写 Docker Compose。
2. PostgreSQL 容器化。
3. 后端生产构建。
4. 前端生产构建。
5. PM2 或 Docker 启动后端。
6. 配置 Cloudflare Tunnel。
7. 配置环境变量。
8. 配置数据库备份脚本。
9. 配置 uploads 目录备份，V1 如启用头像上传。

---

## 11. Figma 页面设计指令

给 Figma 的设计要求：

```md
请设计一个移动端优先的家族图谱系统 V1 MVP。

风格：
- 米白色背景
- 深棕色主色
- 圆角卡片
- 温暖、可信、适合家族档案场景
- 不要过多 AI 插画

请只设计 V1 页面：
1. 登录页
2. 注册页
3. 家族首页
4. 家族图谱页
5. 成员列表页
6. 成员档案页
7. 添加 / 编辑成员页
8. 加入家族页
9. 身份认领页
10. 审核中心页
11. 退出家族申请页
12. 我的页面

页面中需要明确区分：
- 族长可见内容
- 普通成员可见内容
- 未注册成员状态
- 已故成员状态
- 敏感字段脱敏展示
- 资料整理人和最后编辑人
```

---

## 12. 项目收敛原则

1. V1 只做数字族谱 MVP。
2. 所有复杂治理功能只预留结构，不在第一版实现。
3. 前端只画 V1 页面。
4. Codex 只实现 V1。
5. 后端数据库可以预留扩展字段，但接口先只开放 V1 能力。
6. 图谱第一版只展示核心关系，不追求复杂排版。
7. 权限第一版只实现族长与普通成员的核心差异。
8. 敏感信息保护必须从 V1 开始做。

---

## 13. V1 验收标准

V1 完成后应满足：

1. 用户可以注册登录。
2. 用户可以创建家族并成为族长。
3. 其他用户可以申请加入家族。
4. 族长可以审核加入申请。
5. 族长可以添加未注册成员。
6. 族长可以建立父母、配偶、子女关系。
7. 成员可以查看家族图谱。
8. 成员可以查看自己有权限查看的档案。
9. 未注册成员在图谱和档案中有明确标识。
10. 本人可以申请认领未注册身份。
11. 族长可以审核认领申请。
12. 成员可以申请退出家族。
13. 族长可以审核退出申请。
14. 每次资料编辑都有记录。
15. 普通成员不能看到他人敏感信息。
16. 族长与普通成员看到的按钮和入口不同。
17. 系统可以在个人电脑部署，并通过内网穿透供外部访问。

