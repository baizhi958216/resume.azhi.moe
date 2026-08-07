# 阿纸

## 前端开发工程师｜Vue / Nuxt / TypeScript｜AI 应用前端

广州 ｜ 微信：AndyCongDev ｜ 1475289190@qq.com ｜ [GitHub：baizhi958216](https://github.com/baizhi958216) ｜ X：[@baizhi958216](https://x.com/baizhi958216)

**求职意向：** 前端开发工程师 / AI 应用工程师
**求职方向：** Vue / Nuxt / TypeScript、AI 应用前端、游戏与内容产品、出海 Web

---

## 个人概述

前端开发工程师，有两条清晰的主线：

1. **复杂互动与内容 Web**——在 peropero 面向全球玩家交付游戏官网、预约活动、品牌官网与客服中心，覆盖中繁英日韩五种语言、PC / 移动双端，从页面与组件、动画与媒体，到性能、多语言和上线部署形成完整闭环。
2. **AI 应用工程化**——独立设计并实现 AI 客服邮件回复平台，从零完成 Agent 工具编排、RAG 知识库、SSE 流式交互与知识增量同步，能够从产品交互和工程边界出发，把模型能力接入可维护、可审计的业务系统。

我理解"前端 + AI"不是写几个 prompt 或接一个流式接口，而是要把模型行为放进可控的工程边界里：工具权限、数据源约束、调用顺序、人工复核和审计日志，缺一不可。

工作之外保持高频开源输出：近一年 GitHub 770+ 次贡献、40 周持续活跃；向 AI 互动剧情游戏 InfiPlot（364★）合并 10 个 PR，是 doocs 开源社区成员，并持续产出 Rust / Tauri 桌面工具、VSCode 扩展与 MCP server 等独立作品。

---

## 核心技能

### 前端与框架

- 熟练使用 **Vue 3、Nuxt 3 / 4、Astro、TypeScript、Vite、Pinia** 进行 Web 产品开发。
- 熟悉组件化、Composition API、状态管理、SSR / 静态站点、路由与权限、异步数据加载、响应式与移动端适配。
- 有 **Expo / React Native** 移动端开发实践：Expo Router、NativeWind、登录与会话管理、推送通知、EAS 多环境构建。

### 互动视觉与媒体

- 有 **Three.js、PixiJS、Spine、GSAP、Canvas、WebGL** 实战经验，可处理角色骨骼动画、粒子、视差、切屏、视频 / 音频同步及高资源页面加载。
- 关注动画和媒体的生命周期：页面可见性、IntersectionObserver、资源回收、响应式舞台适配、移动端差异化加载与异常兜底。

### AI 应用与服务集成

- 熟悉 **OpenAI API、Function Calling、RAG、Embedding、pgvector、PostgreSQL、Drizzle ORM、Node.js、SSE**，有 Agent 工具编排、知识库构建、向量检索与流式生成实践。
- 能完成 REST / SSE 接口集成、OAuth / OIDC、JWT、飞书 SSO、验证码、RSA 敏感信息加密、阿里云 OSS / STS 临时凭证上传等业务接入。

### 工程化与产品能力

- 熟悉 **Vue I18n、多语言路由、SEO、结构化数据、Docker、Nginx、Git**。
- 有复杂表单、分片上传、订单状态流转、Excel 导出、异常上报、埋点、请求取消 / 防抖 / 缓存等生产业务处理经验。
- 有 **Rust / Tauri 桌面端、VSCode 扩展、MCP server、Cloudflare Workers** 等独立开源作品，熟悉开源协作与审查流程（GitHub PR / Issue）。

---

## 工作经历

### PeroPeroGames｜前端开发工程师

**2024.09 — 至今｜广州**

负责面向全球玩家的游戏官网、预约活动、品牌官网、客服中心，以及 AI 客服平台的前端交付。工作按两条能力主线展开：

1. **互动与内容 Web**：使用 Vue / Nuxt / Astro + TypeScript 交付多语言、重动画、重媒体产品，参与从需求评审、组件拆分、接口联调到生产部署的完整流程；持续沉淀国际化、SEO、动画媒体生命周期、动态表单和构建部署能力。
2. **AI 应用工程化**：独立设计并实现 AI 客服邮件回复平台，覆盖 Agent 工具编排、RAG 知识库、SSE 流式输出与知识增量同步，让模型输出可控制、可追溯。

---

## 精选项目

### 内部 AI 客服邮件回复平台｜AI 应用工程实践（独立设计实现）

**Nuxt 4、Vue 3、TypeScript、Node.js、PostgreSQL、pgvector、Drizzle ORM、OpenAI API、飞书、XLSX、Zod、SSE**

面向游戏客服场景的 AI 邮件处理平台，目标是完成邮件接收、知识检索、智能回复生成、草稿保存及发送的完整处理闭环。

**关键设计：**

- **四种知识方案严格隔离，不静默降级**。实时飞书、本地 XLSX 快照、本地 Markdown Skill 与 pgvector RAG 共享 Agent 编排框架，但不共享知识读取路径；某条路径失败时只允许请求人工复核，不允许自动改用其他数据源，保证页面展示、审计记录与实际回复依据一致。
- **必需工具调用由代码强制，不只靠 prompt**。为每种方案定义 `requiredToolNames` 与最大模型轮次，编排器每轮只把第一个未完成的必需工具放进 `allowedToolNames`，并用 named `tool_choice` 强制模型调用；必需工具全部完成后才进入流式正文轮次。
- **工具权限与审计**。工具按 `safe` / `write` / `dangerous` 分级，执行前检查授权；每次调用在 `agent_tool_calls` 中记录 `running → done / error`。回复上下文固定只读，写操作只开放给独立运维 Agent。读取失败或涉及退款、封禁、支付争议时转入人工复核。
- **RAG 检索链路**。文本按约 1000 字符分块、200 重叠；Embedding 后写入 pgvector，查询使用余弦距离、Top-K 5 且距离阈值 0.5。当前 2048 维超过 pgvector HNSW 的 2000 维上限，因此不建 HNSW、采用精确余弦排序，并保留维度迁移与全量重建流程。
- **知识同步流水线与部分成功语义**。lark-cli 导出 XLSX → 逐表计算 SHA-256 → 刷新薄 Skill 路由 → 生成版本化 Markdown Skill → 仅对内容 hash 变化的工作表增量向量化 → 事务内替换来源并清理失效数据。"快照成功"与"向量成功"是两个独立结果：Embedding 失败时快照照常激活，页面同时展示同步结果与 `indexError`。
- **SSE 流式交互与状态机**。以 `stage` / `reply_delta` / `complete` / `generation_error` 四类事件输出生成进度与文本流，设置 `X-Accel-Buffering: no` 避免代理缓冲；邮件状态机覆盖 `pending → draft / answered / failed`，批处理最多 10 封串行，每日 17:00 定时同步。

---

### Muse Dash 2 官网及预约活动页｜核心前端开发

**Astro、Vue 3、TypeScript、Three.js、Spine、GSAP、UnoCSS、Axios**

面向全球玩家的游戏官网与预约活动页，包含官网展示、手机号 / 邮箱预约、第三方登录、外部平台预约和动态奖励进度；覆盖中繁英日韩五种语言。

**关键设计：**

- **Astro + Vue Islands**：官网内容以静态渲染为主，预约、弹窗、奖励进度等交互模块按需注入 Vue，在保证交互能力的同时控制 JS 体积与首屏加载。
- **Three.js + Spine 角色舞台**：封装 Spine + Three 播放器，实现多层角色动画、动态文字、鼠标 / 陀螺仪视差与横竖屏响应式舞台；预约人数文字根据视口宽度与文字长度动态计算缩放，并提供骨骼 / 图层 / 相机 / 文本视差调试面板辅助素材校准。
- **预约人数稳定更新**：30 秒轮询 + 模块级缓存 + 进行中请求复用，使用 AbortController 取消过期请求、请求序号避免旧响应覆盖新数据；无消费者时自动停止轮询，接口异常回退到展示态。
- **多语言与外部渠道**：完成多语言路由、文案与法务页面；对接 Google / Apple OAuth、Steam / TapTap 外部预约及重复预约状态处理。
- **性能控制**：结合 IntersectionObserver、页面可见性检测与资源销毁控制动画运行时机，降低重交互页面在移动端的渲染与内存压力。

---

### PeroPero 品牌官网及招聘投递平台｜核心前端开发

**Nuxt 4、Vue 3、TypeScript、Pinia、UnoCSS、GSAP、Swiper、Canvas、WebGL、Docker**

公司品牌官网，负责产品展示、招聘职位、在线投递和联系我们等核心模块，提供桌面端与移动端独立页面体验。

**关键设计：**

- **双端路由体系**：桌面端与移动端独立页面，通过 Nuxt 全局路由中间件按 User-Agent 映射并自动跳转，避免两套入口错配。
- **大文件分片上传**：超过 5MB 的文件先请求分片参数，再按块上传；自建 QPS 3 限流队列控制并发，`Promise.all` 汇总分片结果后提交合并，处理上传进度、失败重试与多文件状态。
- **CSS Variables 主题系统**：校验主题 JSON 结构、合并生成的默认主题、按亮 / 暗模式写入 CSS 变量，支持运行时主题切换和仅开发环境启用的本地主题编辑。
- 使用 GSAP、Swiper、Canvas、WebGL 实现首页视差、滚轮切屏、粒子动画和产品海报转场，并针对不同设备做交互降级；完善招聘投递表单、多语言、SEO、结构化数据与 Docker 构建。

---

### 宇宙电台 Cosmic Radio 2025｜核心前端开发

**2025.03 — 2025.12｜Nuxt 4、Vue 3、TypeScript、Pinia、PrimeVue、UnoCSS、GSAP、Vue I18n、Docker**

面向全球用户的多语言原创音乐赛事平台，交付首页、投稿、投票、结果、奖项与下载等核心页面，覆盖赛事展示、作品投稿、候选曲目投票、结果发布、评委点评、视频播放与社交分享，支持中繁英日韩五种语言。

**关键设计：**

- **多语言赛事闭环**：基于 Vue I18n `prefix` 路由完成五语种适配，处理长文案排版与移动端兼容；完成投稿链接解析回填、表单校验、歌曲选择、视频预览、评委点评与滚动导航。
- **性能与资源管理**：使用 IntersectionObserver、图片懒加载、请求防抖和视频统一管理优化页面体验；配置 Nuxt Image、sitemap、Open Graph / Twitter Meta 与 CDN 资源管理。
- **增长与分发**：接入埋点和社交分享，覆盖投稿 → 投票 → 结果公布完整赛程。

---

## 更多项目

### Muse Dash 玩家客服中心｜前端开发

**2025.03 — 至今｜Vue 3、Nuxt 3、TypeScript、Varlet、UnoCSS、Vue I18n、阿里云 OSS、Docker、Nginx**

面向全球玩家的多语言客服平台，覆盖账号找回、人工换绑、存档恢复、内购、退款、Bug 反馈与作弊举报。抽象配置驱动的动态表单组件统一字段、校验与业务插槽；封装阿里云 OSS 上传（图片压缩、`multipartUpload` 进度、AbortSignal 取消）；实现 RSA 2048 敏感信息加密、滑动验证与全局异常上报。

### 企业内部商城｜前端开发

**2024.10 — 至今｜Vue 3、Vite、Vue Router、Vuex、Naive UI、Axios、阿里云 OSS、Docker、Nginx**

企业员工及管理人员的订货平台。梳理并落地 9 种订单状态流转（已下单 / 审核通过 / 库存异常 / 仓库发货 / 已拒绝 / 订单撤回 / 预报关 / 报关完成 / 报关异常），完成订单审核、发货、报关与 Excel 导出；基于飞书 SSO / OIDC、JWT 与路由守卫实现角色权限；使用 OSS + STS 临时凭证上传，并通过懒加载、KeepAlive 与 Gzip / Brotli 优化体验。

### Muse Dash 官网重构、版本专题与周年活动｜前端开发

**2024.09 — 至今｜Vue 3、TypeScript、Vite、Pinia、PixiJS、Spine、Howler.js、Canvas、Vue I18n、Docker**

基于旧版官网进行前端重构，重新梳理页面与组件边界、资源加载和多语言组织，支撑版本专题、周年活动与互动小游戏持续迭代。封装 PixiJS + Spine 动画方案，统一骨骼动画加载、控制、响应式适配与资源回收，兼容 JSON / 二进制 Skeleton 与单页 / 多页 Atlas；实现角色动画、粒子、烟花、故障文字、爆炸彩蛋及 Spine 与背景音乐的进度同步；通过依赖分包、移动端差异化加载与 rollup visualizer 体积分析优化重资源页面。

---

## 开源与社区

### InfiPlot｜核心贡献者 · 开源 Web + 移动端 App / 全栈

**2026.06 — 至今｜React Native / Expo、TypeScript、Next.js、Hono、Cloudflare Workers、AI 生成**

InfiPlot 是全球首个在游玩过程中由 AI 实时生成全部图文内容的互动剧情游戏（GitHub 364★）。作为核心贡献者，同时参与开源 Web 端（10 个 PR 被合并）与移动端 App / API / 引擎的全栈开发：

**开源 Web 端与引擎：**

- **分享与导出体系**：实现加密剧情分享导出 / 导入（含多图床打包），场景图集 zip 打包下载，并统一抽离下载工具模块。
- **游玩体验**：新增游玩历史与视觉点击（vision click）设置，修复画布换图时的帧抖动，保证长剧情播放稳定。
- **模型接入层**：增加客户端模型配置与服务端回退、错误反馈优化；将 OpenAI 兼容图片 aspect 参数改造为 provider 可扩展，隐藏上游模型错误对剧情文本的干扰。

**移动端 App 与全栈：**

- **移动端 App（Expo SDK 57 / React Native）**：基于 Expo Router + NativeWind 交付首页信息流、剧情创作、评论与通知中心；完成邮箱 OTP、Apple / Google 登录与 Secure Store 会话管理，维护 dev / staging / prod 三套 EAS 原生构建。
- **消息与推送**：实现 App 内通知收件箱、未读数与生成进度通知；配合 API 侧可重试的推送投递、推送权限加固与事件兜底。
- **创作链路**：实现草稿与分支式创作流程、云端草稿元数据、作品发布库，重构创作页与故事生成表单交互。
- **API / 引擎**：参与 Hono + Cloudflare Workers 服务端（邮箱 OTP / GitHub OAuth 认证、故事发布接口、DashScope 模型接入）与故事引擎流式输出优化；熟悉 PR 拆分、Review 与 conventional commits 的协作流程。

### doocs 开源社区｜成员

**2025 — 至今**

加入知名 Java / 前端知识社区 doocs（旗下 doocs/md 微信 Markdown 编辑器 13k★、leetcode、advanced-java 等），参与文档维护并合并 docs-cn 文档 PR。

### dbx｜贡献者

**2026.05**

为轻量跨平台数据库客户端（dbx）合并 PR：持久化 MongoDB 浏览器视图模式偏好。

### 个人开源作品

#### Yet-Another-Yume-Archive（YAYA / 娅娅）｜独立开发 · Rust / Tauri 多平台下载工具

**2026.07 — 至今｜Rust、Tauri 2、Vue 3、UnoCSS**

面向多平台的现代化下载工具，覆盖 Tauri 2 桌面端、移动端与 Web：

- 内置 HTTP / HTTPS 多线程分片下载引擎，支持断点续传、实时限速与文件校验；Rust workspace 拆分 app-core、download-engine 等 crate，配套 CI 与多平台发布流程。
- 采用 Provider 扩展机制，站点能力由独立 Provider（如 yaya-provider-bilibili、yaya-provider-torrent）提供，宿主保持内容中立；Vue 3 + UnoCSS 实现响应式布局、明暗模式与主题色切换。

#### Fast-Node-Switcher｜独立开发 · VSCode 扩展

**2026.01 — 至今｜JavaScript、VSCode API**

VSCode 扩展，把分散的 Node.js 版本管理工具统一到编辑器内一键操作：

- 自动检测 nvm / nvm-windows / fnm / pnpm / Volta / mise 并默认优先 nvm；状态栏实时显示当前 Node 版本与所用管理工具。
- 支持全局 / 项目级切换与直接安装新版本，自动应用 .nvmrc、.node-version 与 Volta package.json 配置，跨 Windows / macOS / Linux 使用。

#### wuwa2025｜独立开发 · WebGL / Three.js 创意页面

**2026.01｜Nuxt 4、Vue 3、Three.js、GLSL**

《鸣潮》2025 年度回忆跑马灯，纯前端创意页面：

- 使用 Three.js 与自定义 shader 实现环境水波动画、焦散、色差、菲涅尔边缘高光与镜面高光。
- 搭配图片跑马灯轮播、背景音乐与交互控制营造年度回顾氛围；代码开源，仅供学习参考。

#### 其他作品

- **another-yutto-gui**（Rust、Tauri 2、Vue 3）：B 站下载器 yutto 的跨平台桌面 GUI，支持视频链接识别、任务队列暂停 / 取消、字幕 / 弹幕预览，内置 yutto + ffmpeg 打包发布。
- **pmx-three**（TypeScript、Three.js）：面向 TypeScript 的 PMX 2.x 解析与 Three.js 渲染工具集，服务 VTube Studio 类模型展示场景。
- **ollama-lark-contentreader**（TypeScript、MCP）：读取飞书 / Lark 文档内容的 MCP server，供 LLM Agent 直接消费。
- **async-image-generation**（JavaScript）：Codex skill，基于异步任务端点生成图片；另有基金区域配置分析（fund-region-allocation）等数据可视化技能。
