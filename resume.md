# 阿纸

**前端开发工程师｜Vue / Nuxt / TypeScript｜AI 应用前端**

广州 ｜ 微信：AndyCongDev ｜ 1475289190@qq.com ｜ [GitHub：baizhi958216](https://github.com/baizhi958216) ｜ X：[@baizhi958216](https://x.com/baizhi958216)

求职意向：前端开发工程师 / AI 应用工程师

## 个人概述

前端开发工程师，主攻两条线：

1. **复杂互动与内容 Web**：游戏官网、预约活动、品牌官网与客服中心，覆盖中繁英日韩五种语言、PC / 移动双端，从页面、动画、性能一直做到上线部署。
2. **AI 应用工程化**：近期独立完成 AI 客服回复平台，从零设计 Agent 工具编排、RAG 知识库、SSE 流式交互与知识同步，把模型能力落地为可控、可审计的业务系统。

我的不同点在于：不只是"会写前端、会调 API"，而是会从工程边界出发设计 AI 流程——工具权限、数据源约束、人工复核与审计日志都在考虑范围内。

同时保持高频开源输出：近一年 770+ 次 GitHub 贡献，向 AI 互动剧情游戏 InfiPlot（364★）合并 10 个 PR，是 doocs 开源社区成员，并持续产出 Rust / Tauri 桌面工具、VSCode 扩展与 MCP server 等独立作品。

## 核心能力

- **前端工程：** Vue 3、Nuxt 3/4、Astro、TypeScript、Vite、Pinia
- **移动端：** React Native / Expo、Expo Router、NativeWind、EAS 多环境构建
- **互动与媒体：** GSAP、Three.js、PixiJS、Spine、Canvas、WebGL
- **AI 应用：** OpenAI API、Function Calling、RAG、pgvector、Drizzle ORM、SSE、Node.js
- **交付与质量：** Vue I18n、多语言 SEO、OAuth / OIDC、阿里云 OSS、Docker、Nginx
- **开源与工具链：** 持续参与 InfiPlot、doocs 等社区项目，熟悉开源协作流程；有 Rust / Tauri 桌面端、VSCode 扩展、MCP server、Cloudflare Workers 等独立作品

## 工作经历

### peropero｜前端开发工程师

**2024.09 — 至今**

负责面向全球玩家的游戏官网、预约活动、品牌官网与客服中心，以及 AI 客服平台的前端交付：

1. **互动与内容 Web**：使用 Vue / Nuxt / Astro + TypeScript 交付多语言、重动画、重媒体产品，处理从需求拆分、组件设计、接口联调到上线维护的完整闭环；沉淀国际化、SEO、动画与媒体生命周期、动态表单和生产部署能力。
2. **AI 应用工程化**：独立设计并实现 AI 客服邮件回复平台，覆盖 Agent 工具编排、RAG 知识库、SSE 流式输出与知识增量同步，让模型输出可控制、可追溯。

## 精选项目

### 01 内部 AI 客服邮件回复平台｜AI 应用工程实践

**Nuxt 4、Vue 3、TypeScript、Node.js、PostgreSQL、pgvector、Drizzle ORM、OpenAI API、SSE**

面向游戏客服场景的 AI 邮件处理平台，覆盖邮件接收、知识检索、智能回复生成、草稿保存与发送的完整闭环。

- **四种知识方案严格隔离**：实时飞书、本地 XLSX、Markdown Skill、RAG 共享 Agent 编排框架但不共享读取路径，路径失败不静默切换，保证回复依据与审计一致。
- **工具调用用代码强制，不只靠 prompt**：以 named tool_choice + 工具白名单按序执行必需工具；safe / write / dangerous 权限模型，每次调用写入审计日志；读取失败及退款、封禁、支付争议等高风险场景转人工复核。
- **RAG 检索链路**：约 1000 字符分块（200 重叠）、Top-K 5、余弦距离阈值 0.5；2048 维向量超过 pgvector HNSW 上限（2000），改用精确余弦排序并保留迁移重建流程。
- **知识同步流水线**：导出 → SHA-256 内容哈希识别变更 → 仅对变更工作表增量向量化 → 事务替换；"快照成功"与"向量成功"分离的部分成功语义，同步失败不影响本地方案。
- **SSE 流式交互**：stage / reply_delta / complete / generation_error 四类事件，配合 X-Accel-Buffering: no 防止代理缓冲；邮件状态机与最多 10 封串行的批处理避免压垮模型。

### 02 Muse Dash 2 官网及预约活动页｜核心前端开发

**Astro、Vue 3、TypeScript、Three.js、Spine、GSAP、UnoCSS、Axios**

面向全球玩家的游戏官网与预约活动页，支持中繁英日韩五种语言，包含官网展示、预约登录、OAuth 授权及奖励进度。

- **Astro + Vue Islands 架构**：官网以静态为主、预约等交互按需注入 JS，兼顾加载性能与交互能力；拆分公共布局、预约、弹窗和奖励进度模块。
- **Three.js + Spine 角色舞台**：多层角色动画、鼠标 / 陀螺仪视差、横竖屏响应式适配；预约人数文字按视口宽度与文字长度动态缩放，自建骨骼 / 图层调试面板辅助素材校准。
- **预约人数稳定更新**：30 秒轮询 + 进行中请求复用 + AbortController 取消过期请求 + 请求序号防旧响应覆盖 + 无消费者自动停止轮询。
- 完成手机号 / 邮箱验证码预约、Google / Apple OAuth、Steam / TapTap 外部预约与重复预约状态处理；Docker + nginx 部署。

### 03 peropero 官网｜核心前端开发

**Nuxt 4、Vue 3、TypeScript、Pinia、UnoCSS、GSAP、Swiper、Canvas、WebGL、Docker**

公司品牌官网，包含产品展示、招聘职位、在线投递与联系我们，提供桌面端与移动端独立体验。

- **双端路由体系**：桌面端与移动端独立页面，通过 User-Agent 全局路由中间件自动跳转，避免两套入口错配。
- **大文件分片上传**：超过 5MB 触发分片，自建 QPS 3 限流队列，Promise.all 汇总分片后提交合并，处理进度、失败重试与多文件状态。
- **CSS Variables 主题系统**：校验主题 JSON、合并默认主题、按亮 / 暗模式写入变量，支持运行时切换与开发环境主题编辑。
- 使用 GSAP、Swiper、Canvas、WebGL 实现视差、滚轮切屏、粒子与海报转场；完成多语言、SEO、结构化数据与 Docker 构建流程。

### 04 宇宙电台 Cosmic Radio 2025｜核心前端开发

**Nuxt 4、Vue 3、TypeScript、Pinia、PrimeVue、UnoCSS、GSAP、Vue I18n、Docker**

面向全球用户的原创音乐赛事平台，包含赛事展示、作品投稿、候选曲目投票、结果发布、评委点评、视频播放与社交分享，支持中繁英日韩五种语言。

- **多语言赛事闭环**：基于 Vue I18n prefix 路由完成五语种适配，处理长文案排版与移动端兼容；完成投稿链接解析回填、表单 / 邮箱校验、歌曲选择、视频预览、评委点评与滚动导航。
- **性能与资源管理**：使用 IntersectionObserver、图片懒加载、请求防抖和视频统一管理优化页面体验；配置 Nuxt Image、sitemap、Open Graph / Twitter Meta 与 CDN 资源管理。
- **增长与分发**：接入埋点、社交分享与结构化数据，覆盖投稿 → 投票 → 结果公布完整赛程。

## 更多项目

- **Muse Dash 客服中心**（2025.03 — 至今）：多语言工单平台，配置驱动的动态表单、OSS 分片上传（压缩 / 进度 / 取消）、RSA 2048 加密、滑动验证与全局异常上报。
- **企业内部商城**（2024.10 — 至今）：Vue 3 订货系统，梳理并落地 9 种订单状态流转，完成飞书 SSO / OIDC 权限、Excel 导出与 OSS + STS 上传。
- **Muse Dash 官网重构**（2024.09 — 至今）：封装 PixiJS + Spine 动画方案并管理资源回收，支撑版本专题与周年活动，通过依赖分包与构建体积分析优化重资源页面。

## 开源与社区

- **InfiPlot｜核心贡献者（开源 Web + 移动端 App）**（2026.06 — 至今）：AI 实时生成图文内容的互动剧情游戏（GitHub 364★）。开源 Web 端 10 个 PR 被合并（加密剧情分享导出 / 导入、场景图集 zip 下载、游玩历史、视觉点击、画布帧稳定、OpenAI 兼容图片参数扩展）；同时负责移动端 App 与全栈开发：Expo / React Native App（邮箱 OTP / Apple / Google 登录、创作与评论、通知推送）、Hono + Cloudflare Workers API 与故事引擎。
- **doocs 开源社区｜成员**：参与 doocs/md（13k★）所属社区文档维护，合并 docs-cn 文档 PR。
- **Yet-Another-Yume-Archive（YAYA）｜独立开发**（2026.07 — 至今）：面向多平台的现代化下载工具，覆盖 Tauri 2 桌面端 / 移动端 / Web：内置 HTTP / HTTPS 多线程分片下载引擎（断点续传、实时限速、文件校验），采用 Provider 扩展机制保持宿主内容中立。
- **Fast-Node-Switcher｜独立开发**（2026.01 — 至今）：VSCode 扩展，一键在 nvm / nvm-windows / fnm / pnpm / Volta / mise 之间切换 Node.js 版本：自动检测管理工具、状态栏实时显示、全局 / 项目级切换，支持 .nvmrc / .node-version 自动应用。
- **wuwa2025｜独立开发**（2026.01）：《鸣潮》2025 年度回忆跑马灯，Nuxt + Vue 3 + Three.js WebGL 页面：自研 shader 实现环境水波动画、焦散、色差、菲涅尔与镜面高光。
- **其他个人作品**：another-yutto-gui（Tauri 2 + Vue 3 + Rust 的 B 站下载器 GUI）、pmx-three（PMX 2.x 解析 + Three.js 渲染工具集）、ollama-lark-contentreader（飞书文档 MCP server）、async-image-generation（Codex skill）。
