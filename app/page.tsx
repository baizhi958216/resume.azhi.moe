import { FiExternalLink, FiMail } from 'react-icons/fi'
import { SiGithub, SiWechat, SiX } from 'react-icons/si'
import HeroContactCard from './HeroContactCard'
import IconStickers from './IconStickers'
import TextType from './TextType'
import ThemeToggle from './ThemeToggle'

const sectionClass = 'grid scroll-mt-[100px] grid-cols-[240px_minmax(0,1fr)] gap-[clamp(44px,6vw,80px)] border-b border-line px-[18px] py-[110px] max-[900px]:grid-cols-1 max-[900px]:gap-[46px] max-[900px]:px-[10px] max-[900px]:py-[84px] max-sm:scroll-mt-[76px] max-sm:gap-[38px] max-sm:px-2 max-sm:py-[72px]'
const bulletListClass = 'm-0 list-none p-0 [&_li]:relative [&_li]:border-t [&_li]:border-line [&_li]:py-[11px] [&_li]:pl-[17px] [&_li]:text-[15px] [&_li]:leading-[1.8] [&_li]:text-muted [&_li]:before:absolute [&_li]:before:left-px [&_li]:before:top-[21px] [&_li]:before:size-1 [&_li]:before:rounded-full [&_li]:before:bg-accent'

const skillGroups = [
  {
    title: '前端工程',
    english: 'Front-end Engineering',
    skills: 'Vue 3、Nuxt 3/4、Astro、TypeScript、Vite、Pinia',
  },
  {
    title: '互动与媒体',
    english: 'Motion & Media',
    skills: 'GSAP、Three.js、PixiJS、Spine、Canvas、WebGL',
  },
  {
    title: 'AI 应用',
    english: 'AI Applications',
    skills: 'OpenAI API、Function Calling、RAG、pgvector、Drizzle ORM、SSE、Node.js',
  },
  {
    title: '交付与质量',
    english: 'Product Delivery',
    skills: 'Vue I18n、多语言 SEO、OAuth / OIDC、阿里云 OSS、Docker、Nginx',
  },
]

const projects = [
  {
    name: '内部 AI 客服邮件回复平台',
    url: null,
    websiteLabel: null,
    role: 'AI 应用工程实践',
    type: 'AI 应用 / 独立设计实现',
    period: '2026.07 — 至今',
    stack: 'Nuxt 4 · Vue 3 · TypeScript · Node.js · PostgreSQL · pgvector · Drizzle ORM · OpenAI API · SSE',
    description: '面向游戏客服场景的 AI 邮件处理平台，覆盖邮件接收、知识检索、智能回复生成、草稿保存与发送的处理闭环。',
    bullets: [
      '四种知识方案严格隔离：实时飞书、本地 XLSX、Markdown Skill、RAG 共享 Agent 编排框架但不共享读取路径，路径失败不静默切换，保证回复依据与审计一致。',
      '工具调用由代码强制，不只靠 prompt：named tool_choice + 工具白名单按序执行必需工具，safe / write / dangerous 权限分级，每次调用写入审计日志；高风险场景转人工复核。',
      'RAG 检索链路：约 1000 字符分块（200 重叠）、Top-K 5、余弦距离阈值 0.5；2048 维向量超过 pgvector HNSW 上限（2000），改用精确余弦排序并保留迁移重建流程。',
      '知识同步流水线：SHA-256 内容哈希识别变更，只对变更工作表增量向量化，事务内替换来源；"快照成功"与"向量成功"分离，同步失败不影响本地方案。',
      'SSE 流式交互：stage / reply_delta / complete / generation_error 四类事件，配合 X-Accel-Buffering: no 防止代理缓冲；批处理最多 10 封串行，避免压垮模型。',
    ],
  },
  {
    name: 'Muse Dash 2 官网及预约活动页',
    url: 'https://md2.peropero.net/',
    websiteLabel: 'md2.peropero.net',
    role: '核心前端开发',
    type: '游戏官网 / 营销活动',
    period: '2026.05 — 至今',
    stack: 'Astro · Vue 3 · TypeScript · Three.js · Spine · GSAP · UnoCSS · Axios',
    description: '面向全球玩家的游戏官网与预约活动页，支持中文、繁中、英文、日文、韩文五种语言，包含官网展示、预约登录、OAuth 授权及奖励进度。',
    bullets: [
      'Astro + Vue Islands 架构：官网以静态为主、预约等交互按需注入 JS，拆分公共布局、预约、弹窗和奖励进度模块，兼顾加载性能与交互能力。',
      'Three.js + Spine 角色舞台：多层角色动画、鼠标 / 陀螺仪视差、横竖屏响应式适配；预约人数文字按视口宽度与文字长度动态缩放，自建骨骼 / 图层调试面板辅助素材校准。',
      '预约人数稳定更新：30 秒轮询 + 进行中请求复用 + AbortController 取消过期请求 + 请求序号防旧响应覆盖 + 无消费者自动停止轮询。',
      '完成手机号 / 邮箱验证码预约、Google / Apple OAuth、Steam / TapTap 外部预约与重复预约状态处理；Docker + nginx 部署。',
    ],
  },
  {
    name: 'peropero 官网',
    url: 'https://www.peropero.net/',
    websiteLabel: 'peropero.net',
    role: '核心前端开发',
    type: '品牌官网 / 招聘投递',
    period: '2025.08 — 至今',
    stack: 'Nuxt 4 · Vue 3 · TypeScript · Pinia · UnoCSS · GSAP · Canvas · WebGL · Docker',
    description: '公司品牌官网，负责产品展示、招聘职位、在线投递与联系我们等核心模块，提供桌面端与移动端独立体验。',
    bullets: [
      '双端路由体系：桌面端与移动端独立页面，通过 User-Agent 全局路由中间件自动跳转，避免两套入口错配。',
      '大文件分片上传：超过 5MB 触发分片，自建 QPS 3 限流队列，Promise.all 汇总分片后提交合并，处理进度、失败重试与多文件状态。',
      'CSS Variables 主题系统：校验主题 JSON、合并默认主题、按亮 / 暗模式写入变量，支持运行时切换与开发环境主题编辑。',
      '使用 GSAP、Swiper、Canvas、WebGL 实现视差、滚轮切屏、粒子与海报转场；完成多语言、SEO、结构化数据与 Docker 构建流程。',
    ],
  },
  {
    name: '宇宙电台 Cosmic Radio 2025',
    url: 'https://cosmicradio.peropero.net/',
    websiteLabel: 'cosmicradio.peropero.net',
    role: '核心前端开发',
    type: '国际赛事 / 内容平台',
    period: '2025.03 — 2025.12',
    stack: 'Nuxt 4 · Vue 3 · TypeScript · Pinia · PrimeVue · GSAP · Vue I18n · Docker',
    description: '面向全球用户的五语种原创音乐赛事平台，覆盖赛事展示、作品投稿、候选曲目投票、结果发布、评委点评、视频播放与社交分享。',
    bullets: [
      '基于 Vue I18n prefix 路由完成中繁英日韩多语言适配，处理长文案排版与移动端兼容；实现投稿链接解析回填、表单 / 邮箱校验、歌曲选择、视频预览、评委点评与滚动导航。',
      '负责首页、投稿、投票、结果、奖项与下载等核心页面及公共组件，使用 IntersectionObserver、图片懒加载和请求防抖优化页面体验。',
      '配置 Nuxt Image、sitemap、Open Graph / Twitter Meta 与 CDN 资源管理，接入埋点和社交分享，覆盖投稿 → 投票 → 结果公布完整赛程。',
    ],
  },
]

const moreProjects = [
  {
    name: 'Muse Dash 客服中心',
    url: 'https://service.peropero.net/',
    websiteLabel: 'service.peropero.net',
    type: '玩家服务 / 多语言平台',
    period: '2025.03 — 至今',
    description: '多语言工单平台：配置驱动的动态表单、OSS 分片上传（压缩 / 进度 / 取消）、RSA 2048 加密、滑动验证与全局异常上报。',
  },
  {
    name: '企业内部商城',
    url: null,
    websiteLabel: null,
    type: '企业系统 / 订货平台',
    period: '2024.10 — 至今',
    description: '订货系统：梳理并落地 9 种订单状态流转，完成飞书 SSO / OIDC 权限、Excel 导出与 OSS + STS 上传。',
  },
  {
    name: 'Muse Dash 官网',
    url: 'https://musedash.peropero.net/',
    websiteLabel: 'musedash.peropero.net',
    type: '游戏官网 / 互动体验',
    period: '2024.09 — 至今',
    description: '0 - 1 重写网站，实现 PixiJS + Spine 动画方案封装与资源回收，支撑版本专题与周年活动，通过依赖分包与构建体积分析优化重资源页面。',
  },
]

const openSourceItems = [
  {
    name: 'InfiPlot',
    role: '核心贡献者',
    period: '2026.06 — 至今',
    type: '开源 Web + 移动端 App',
    url: 'https://github.com/zonghaoyuan/infiplot',
    description: 'AI 实时生成图文内容的互动剧情游戏：开源 Web 端 10 个 PR 被合并（加密剧情分享导出 / 导入、场景图集 zip 打包下载、游玩历史、视觉点击设置、画布帧稳定、OpenAI 兼容图片参数扩展）；同时负责移动端 App 与全栈开发：Expo / React Native App（邮箱 OTP、Apple / Google 登录、剧情创作与评论、通知推送）、Hono + Cloudflare Workers API 与故事引擎。',
    stack: 'TypeScript · Next.js · React Native / Expo · Hono · Cloudflare Workers',
  },
  {
    name: 'Yet-Another-Yume-Archive',
    role: '独立开发',
    period: '2026.07 — 至今',
    type: 'Rust / Tauri 多平台下载工具',
    url: 'https://github.com/baizhi958216/Yet-Another-Yume-Archive',
    description: '面向多平台的现代化下载工具 YAYA（娅娅），覆盖 Tauri 2 桌面端 / 移动端 / Web：内置 HTTP / HTTPS 多线程分片下载引擎，支持断点续传、实时限速与文件校验；采用 Provider 扩展机制，站点能力由独立 Provider 提供、宿主保持内容中立；Vue 3 + UnoCSS 响应式界面，支持明暗模式与主题色。',
    stack: 'Rust · Tauri 2 · Vue 3 · UnoCSS',
  },
  {
    name: 'Fast-Node-Switcher',
    role: '独立开发',
    period: '持续更新',
    type: 'VSCode 扩展',
    url: 'https://github.com/baizhi958216/Fast-Node-Switcher',
    description: 'VSCode 扩展，在编辑器内一键切换 Node.js 版本：自动检测 nvm / nvm-windows / fnm / pnpm / Volta / mise 并优先 nvm，状态栏实时显示当前版本与管理工具，支持全局 / 项目级切换与直接安装新版本，自动应用 .nvmrc、.node-version 与 Volta 配置，跨 Windows / macOS / Linux。',
    stack: 'JavaScript · VSCode API',
  },
  {
    name: 'wuwa2025',
    role: '独立开发',
    period: '2026.01',
    type: 'WebGL / Three.js 创意页面',
    url: 'https://wuwa2025.azhi.moe',
    description: '《鸣潮》2025 年度回忆跑马灯：Nuxt + Vue 3 + Three.js 打造 WebGL 创意页面，自定义 shader 实现环境水波动画、焦散、色差、菲涅尔边缘高光与镜面高光，搭配图片轮播、背景音乐与交互控制还原年度回顾氛围。',
    stack: 'Nuxt · Vue 3 · Three.js · GLSL',
  },
  {
    name: '其他个人作品',
    role: '持续产出',
    period: '持续更新',
    type: '独立项目',
    url: 'https://github.com/baizhi958216?tab=repositories',
    description: 'another-yutto-gui（Tauri 2 + Vue 3 + Rust 的 B 站下载器 yutto GUI）、pmx-three（PMX 2.x 解析 + Three.js 渲染工具集）、ollama-lark-contentreader（飞书 / Lark 文档 MCP server）、async-image-generation（Codex skill）等。',
    stack: 'Rust · Tauri · TypeScript · Three.js · MCP',
  },
]

function SectionHeading({ number, title, english }: { number: string, title: string, english: string }) {
  return (
    <header className="sticky top-[110px] grid self-start grid-cols-[34px_1fr] max-[900px]:static" data-reveal>
      <span className="pt-1.5 font-mono text-xs leading-none text-accent">{number}</span>
      <div>
        <h2 className="mb-[7px] font-serif text-[25px] leading-[1.25] font-medium tracking-[-0.04em]">{title}</h2>
        <p className="font-mono text-xs leading-[1.3] tracking-[0.09em] text-muted uppercase">{english}</p>
      </div>
    </header>
  )
}

export default function ResumePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': '阿纸',
    'jobTitle': '前端开发工程师',
    'address': { '@type': 'PostalAddress', 'addressLocality': '广州', 'addressCountry': 'CN' },
    'email': 'mailto:1475289190@qq.com',
    'sameAs': ['https://github.com/baizhi958216', 'https://x.com/baizhi958216'],
    'knowsAbout': ['Vue 3', 'Nuxt', 'TypeScript', 'AI 应用前端', 'GSAP', 'WebGL'],
  }

  return (
    <>
      {/* eslint-disable-next-line react/dom-no-dangerously-set-innerhtml -- JSON-LD 为本地硬编码静态数据，无用户输入 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className="fixed top-2 left-2 z-[100] -translate-y-[150%] rounded-lg bg-ink px-3.5 py-2.5 text-paper focus:translate-y-0" href="#resume">跳到简历正文</a>
      <div className="reading-progress fixed top-0 left-0 z-80 h-0.5 w-full origin-left scale-x-0 bg-[#789bc5] motion-reduce:hidden" aria-hidden="true" />

      <header className="sticky top-4 z-40 mx-auto mt-4 mb-5 grid min-h-[62px] w-[min(1240px,calc(100%_-_40px))] grid-cols-[1fr_auto_1fr] items-center rounded-2xl border border-white/70 bg-paper/80 pr-2.5 pl-3 text-[13px] shadow-[0_12px_40px_rgba(23,24,23,.08)] backdrop-blur-[18px] max-sm:top-2.5 max-sm:mr-3 max-sm:mb-3.5 max-sm:ml-auto max-sm:flex max-sm:min-h-0 max-sm:w-fit max-sm:p-1 max-sm:rounded-[13px]">
        <nav className="col-start-2 flex gap-1 rounded-[11px] border border-line bg-white/35 p-1 text-muted max-[900px]:hidden [&_a]:rounded-[7px] [&_a]:px-3 [&_a]:py-[7px] [&_a]:transition-colors [&_a]:hover:bg-white/80 [&_a]:hover:text-ink [&_a]:focus-visible:bg-white/80 [&_a]:focus-visible:text-ink" aria-label="简历导航">
          <a href="#skills">技能</a>
          <a href="#experience">经历</a>
          <a href="#projects">项目</a>
          <a href="#opensource">开源</a>
        </nav>
        <div className="col-start-3 flex items-center gap-2 justify-self-end max-sm:col-auto max-sm:justify-self-auto">
          <ThemeToggle />
          <a className="rounded-[10px] bg-night px-4 py-3 font-mono text-xs leading-none tracking-[0.06em] text-paper uppercase transition hover:-translate-y-px hover:bg-accent max-sm:px-[13px] max-sm:py-[11px]" href="/阿纸-前端开发工程师-简历.pdf" download>下载 PDF ↓</a>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-5 pb-20 outline-none max-sm:px-3 max-sm:pb-[50px]" id="resume">
        <section className="resume-hero relative isolate grid min-h-[590px] grid-cols-[minmax(0,1.55fr)_minmax(280px,.75fr)] items-center gap-[8%] overflow-hidden rounded-[22px] border border-ink/10 bg-white/35 p-[clamp(58px,7vw,82px)] text-ink shadow-[0_24px_60px_rgba(23,24,23,.08)] max-[900px]:grid-cols-[1.35fr_.75fr] max-[900px]:px-[42px] max-[900px]:py-[58px] max-sm:min-h-0 max-sm:grid-cols-1 max-sm:px-[26px] max-sm:pt-[54px] max-sm:pb-[30px]" id="top">
          <IconStickers />
          <div>
            <div className="mb-[30px] flex items-center gap-[18px] max-sm:mb-7" data-reveal>
              <div className="relative w-max shrink-0">
                {/* eslint-disable-next-line next/no-img-element -- 静态头像，无需 next/image 优化 */}
                <img className="block size-24 rounded-[28px] border-[5px] border-white/80 object-cover shadow-[0_10px_28px_rgba(23,24,23,.12)] [filter:saturate(.78)_contrast(.97)] max-sm:size-[88px] max-sm:rounded-[26px]" src="/avatar.png" alt="阿纸头像" width="120" height="120" />
                <span className="absolute -right-0.5 -bottom-0.5 size-[18px] rounded-full border-4 border-paper bg-[#789f89]" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-[7px]">
                <span className="font-mono text-xs leading-[1.3] tracking-[0.06em] text-muted">你好，我是</span>
                <strong className="font-serif text-base leading-[1.2] font-medium tracking-[0.02em] text-ink">阿纸</strong>
              </div>
            </div>
            <p className="mb-6 flex items-center gap-[9px] font-mono text-xs leading-[1.4] tracking-[0.08em] text-muted max-sm:leading-[1.5]" data-reveal data-reveal-delay="0.05">
              <span className="size-[7px] rounded-full bg-[#8eb7a0] shadow-[0_0_0_4px_rgba(142,183,160,.1)]" />
              {' '}
              AVAILABLE FOR OPPORTUNITIES
            </p>
            <TextType
              as="h1"
              className="min-h-[2.16em] font-serif text-[clamp(48px,5vw,68px)] leading-[1.08] font-medium tracking-[-0.055em] [&_em]:not-italic [&_em]:text-accent max-sm:text-[clamp(44px,14vw,58px)]"
              phrases={[[{ text: '前端开发' }, { text: '工程师', accent: true }]]}
              typingSpeed={85}
              deletingSpeed={45}
              pauseDuration={2400}
              initialDelay={550}
              loop={false}
              variableSpeed={{ min: 60, max: 140 }}
              cursorCharacter="▍"
              cursorBlinkDuration={0.6}
            />
            <p className="mt-[26px] mb-2.5 font-serif text-[clamp(16px,1.7vw,21px)] leading-[1.5] max-sm:mt-6 max-sm:text-[22px]" data-reveal data-reveal-delay="0.15">把复杂的交互与 AI 能力，打磨成可靠、懂用户的 Web 产品。</p>
            <p className="max-w-[620px] font-serif text-base leading-[1.8] text-muted max-sm:text-[15px]" data-reveal data-reveal-delay="0.2">实现一些奇奇怪怪的想法~</p>
            <div className="mt-7 flex flex-wrap gap-2 max-sm:mt-[22px] [&_span]:rounded-full [&_span]:border [&_span]:border-accent/15 [&_span]:bg-accent-soft/35 [&_span]:px-[13px] [&_span]:py-[9px] [&_span]:font-mono [&_span]:text-xs [&_span]:leading-none [&_span]:tracking-[0.025em] [&_span]:text-accent" aria-label="技术方向" data-reveal data-reveal-delay="0.25">
              <span>Vue / Nuxt</span>
              <span>Creative Web</span>
              <span>AI Applications</span>
              <span>Full Stack</span>
            </div>
            <div className="mt-[34px] grid max-w-[520px] grid-cols-[64px_1fr] border-t border-line pt-[17px] max-sm:mt-7 max-sm:grid-cols-[58px_1fr]" data-reveal data-reveal-delay="0.3">
              <span className="font-mono text-xs leading-[1.6] text-accent">求职意向</span>
              <p className="text-[15px] text-ink">前端开发工程师 / AI 应用工程师</p>
            </div>
            <div className="hidden max-sm:mt-[26px] max-sm:block" data-reveal data-reveal-delay="0.35">
              <div className="flex items-center gap-[10px]">
                <span className="font-mono text-[11px] leading-none tracking-[0.1em] text-accent">CONTACT</span>
                <span className="h-px w-7 bg-accent/20" aria-hidden="true" />
                <div className="ml-auto flex items-center gap-2.5 [&_a]:flex [&_a]:text-[17px] [&_a]:text-accent [&_a]:transition-colors [&_a]:hover:text-ink">
                  <a href="https://github.com/baizhi958216" target="_blank" rel="noreferrer" aria-label="GitHub：baizhi958216"><SiGithub aria-hidden="true" /></a>
                  <a href="https://x.com/baizhi958216" target="_blank" rel="noreferrer" aria-label="X：@baizhi958216"><SiX aria-hidden="true" /></a>
                </div>
              </div>
              <dl className="mt-4 space-y-2.5 [&_div]:grid [&_div]:grid-cols-[16px_1fr] [&_div]:items-center [&_div]:gap-[9px] [&_dd]:m-0 [&_dd]:text-[15px] [&_dd]:leading-[1.5] [&_dd]:text-ink/85 [&_dd]:[overflow-wrap:anywhere]">
                <div>
                  <SiWechat className="text-[15px] text-accent" aria-hidden="true" />
                  <dt className="sr-only">微信</dt>
                  <dd>AndyCongDev</dd>
                </div>
                <div>
                  <FiMail className="text-[15px] text-accent" aria-hidden="true" />
                  <dt className="sr-only">邮箱</dt>
                  <dd><a className="transition-colors hover:text-accent" href="mailto:1475289190@qq.com">1475289190@qq.com</a></dd>
                </div>
              </dl>
            </div>
          </div>

          <HeroContactCard />
        </section>

        <section className={sectionClass} id="summary">
          <header className="sticky top-[110px] grid self-start grid-cols-[34px_1fr] max-[900px]:static">
            <span className="pt-1.5 font-mono text-xs leading-none text-accent">01</span>
            <div>
              <h2 className="mb-[7px] font-serif text-[25px] leading-[1.25] font-medium tracking-[-0.04em]">个人概述</h2>
              <p className="font-mono text-xs leading-[1.3] tracking-[0.09em] text-muted uppercase">Profile</p>
            </div>
          </header>
          <div className="grid min-w-0 grid-cols-2 gap-[42px] max-sm:grid-cols-1 max-sm:gap-5 [&_p]:font-serif [&_p]:text-[clamp(15px,1.4vw,17px)] [&_p]:leading-[1.85] max-sm:[&_p]:text-[15px]">
            <p className="first-letter:float-left first-letter:mt-1.5 first-letter:mr-2 first-letter:font-serif first-letter:text-[40px] first-letter:leading-[.7] first-letter:font-medium first-letter:text-accent">具备游戏官网、品牌营销活动、玩家服务与内部业务系统的前端交付经验，长期使用 Vue 3、Node.js、TypeScript 完成从页面搭建到上线维护的完整闭环。</p>
            <p className="text-muted">擅长多语言与响应式适配、复杂动效及媒体互动、动态表单与文件上传等业务场景；近期完成 Agent、RAG、流式生成等 AI 应用工程实践，能够将模型能力落地的 Web 产品。</p>
          </div>
        </section>

        <section className={sectionClass} id="skills">
          <SectionHeading number="02" title="核心能力" english="Skills" />
          <div className="grid min-w-0 grid-cols-2 gap-3 max-sm:grid-cols-1">
            {skillGroups.map((group, index) => (
              <article className="relative min-h-[190px] overflow-hidden rounded-2xl border border-line bg-white/35 p-[27px] transition duration-250 hover:-translate-y-[3px] hover:border-accent/25 hover:shadow-[0_18px_38px_rgba(23,24,23,.07)] max-sm:min-h-0 max-sm:p-6" key={group.title}>
                <span className="absolute top-[25px] right-[25px] font-mono text-xs leading-none text-accent/50">
                  0
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-[7px] font-serif text-[17px] leading-[1.4] font-medium">{group.title}</h3>
                  <p className="font-mono text-xs leading-[1.4] tracking-[0.05em] text-accent uppercase">{group.english}</p>
                </div>
                <p className="mt-[35px] text-[15px] leading-[1.85] text-muted max-sm:mt-7">{group.skills}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={sectionClass} id="experience">
          <SectionHeading number="03" title="工作经历" english="Experience" />
          <div className="grid min-w-0 grid-cols-[1fr_1.3fr_3.6fr] gap-[30px] rounded-[18px] border border-line bg-white/40 p-[34px] max-[900px]:grid-cols-[1fr_1.4fr] max-sm:grid-cols-1 max-sm:gap-[25px] max-sm:p-[25px]">
            <div className="flex flex-col gap-2 font-mono text-xs leading-[1.5]">
              <time className="text-accent">2024.09 — 至今</time>
              <span className="text-muted">广州</span>
            </div>
            <div>
              <h3 className="-mt-[5px] mb-2 font-serif text-[30px] leading-[1.2] font-medium tracking-[-0.04em]">peropero</h3>
              <p className="text-sm text-muted">前端开发工程师</p>
            </div>
            <div className="max-[900px]:col-span-full max-sm:col-auto">
              <p className="mb-[25px] font-serif text-base leading-[1.85]">负责面向全球玩家的游戏官网、预约活动、品牌官网与客服中心，以及 AI 客服平台的前端交付。</p>
              <ul className={bulletListClass}>
                <li>互动与内容 Web：使用 Vue / Nuxt / Astro + TypeScript 交付多语言、重动画、重媒体产品，覆盖从需求拆分、组件设计、接口联调到上线维护的完整闭环。</li>
                <li>AI 应用工程化：独立设计并实现 AI 客服邮件回复平台，覆盖 Agent 工具编排、RAG 知识库、SSE 流式输出与知识增量同步。</li>
                <li>持续沉淀国际化、SEO、动画与媒体生命周期、动态表单和生产部署能力，保障重资源页面与业务流程的稳定性。</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={`${sectionClass} pb-[60px]`} id="projects">
          <SectionHeading number="04" title="项目经历" english="Projects" />
          <div className="min-w-0">
            <ol className="m-0 list-none p-0">
              {projects.map((project, index) => (
                <li className="grid gap-6 py-12 max-sm:py-[42px]" key={project.name} data-reveal>
                  <div className="grid grid-cols-[48px_minmax(0,1fr)_auto] items-start gap-[18px] max-[900px]:grid-cols-[40px_minmax(0,1fr)] max-sm:grid-cols-[32px_minmax(0,1fr)] max-sm:gap-2.5">
                    <span className="pt-2 font-mono text-xs leading-none text-accent" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="mb-[9px] font-serif text-[clamp(21px,2.1vw,28px)] leading-[1.3] font-medium tracking-[-0.04em] max-sm:text-[22px]">{project.name}</h3>
                      <p className="font-mono text-xs leading-[1.5] tracking-[0.05em] text-muted uppercase">{project.type}</p>
                    </div>
                    <div className="flex flex-col items-end gap-[9px] pt-[3px] text-right max-[900px]:col-start-2 max-[900px]:flex-row max-[900px]:flex-wrap max-[900px]:items-baseline max-[900px]:gap-x-4 max-[900px]:gap-y-1.5 max-[900px]:text-left max-sm:gap-x-3.5">
                      <p className="flex items-baseline gap-2.5">
                        <b className="text-[13px] font-medium">{project.role}</b>
                        {project.period && <time className="font-mono text-xs leading-none text-muted">{project.period}</time>}
                      </p>
                      {project.url
                        ? (
                            <a className="inline-flex items-baseline gap-[5px] border-b border-accent/30 pb-0.5 font-mono text-[13px] leading-[1.1] text-accent transition-colors hover:border-accent focus-visible:border-accent" href={project.url} target="_blank" rel="noreferrer" aria-label={`访问${project.name}网站（新窗口打开）`}>
                              {project.websiteLabel}
                              {' '}
                              <i className="text-[13px] not-italic" aria-hidden="true">↗</i>
                            </a>
                          )
                        : (
                            <span className="font-mono text-xs leading-[1.2] text-muted">内部项目 · 暂无公开地址</span>
                          )}
                    </div>
                  </div>
                  <div className="ml-[66px] grid max-[900px]:ml-[58px] max-sm:ml-[42px]">
                    <p className="mb-4 max-w-[780px] font-serif text-base leading-[1.85]">{project.description}</p>
                    <p className="mb-3 font-mono text-xs leading-[1.8] text-accent">{project.stack}</p>
                    <ul className={`${bulletListClass} grid grid-cols-1 max-sm:[&_li]:py-3`}>
                      {project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 border-t border-line pt-[46px]" data-reveal>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-[24px] leading-[1.3] font-medium tracking-[-0.04em]">更多项目</h3>
                <p className="font-mono text-xs leading-[1.3] tracking-[0.09em] text-muted uppercase">More Work</p>
              </div>
              <ul className="m-0 list-none p-0">
                {moreProjects.map(project => (
                  <li className="grid grid-cols-[112px_minmax(0,1fr)_auto] items-baseline gap-x-6 border-t border-line py-[18px] max-[900px]:grid-cols-[104px_minmax(0,1fr)] max-sm:grid-cols-1 max-sm:gap-y-[7px] max-sm:py-4" key={project.name}>
                    <time className="font-mono text-xs leading-[1.5] text-muted">{project.period}</time>
                    <div>
                      <h4 className="font-serif text-[17px] leading-[1.5] font-medium">{project.name}</h4>
                      <p className="mt-1 max-w-[760px] text-[14px] leading-[1.7] text-muted">{project.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-[7px] max-sm:items-start">
                      <span className="font-mono text-xs leading-[1.4] text-accent">{project.type}</span>
                      {project.url && (
                        <a className="inline-flex items-baseline gap-[5px] border-b border-accent/30 pb-0.5 font-mono text-[13px] leading-[1.1] text-accent transition-colors hover:border-accent focus-visible:border-accent" href={project.url} target="_blank" rel="noreferrer" aria-label={`访问${project.name}网站（新窗口打开）`}>
                          {project.websiteLabel}
                          {' '}
                          <i className="text-[13px] not-italic" aria-hidden="true">↗</i>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={sectionClass} id="opensource">
          <SectionHeading number="05" title="开源与社区" english="Open Source" />
          <div className="min-w-0">
            <ol className="m-0 list-none p-0">
              {openSourceItems.map(item => (
                <li className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-line py-[20px] max-sm:grid-cols-1 max-sm:gap-y-[7px]" key={item.name} data-reveal>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                      <h3 className="mb-[9px] font-serif text-[clamp(21px,2.1vw,28px)] leading-[1.3] font-medium tracking-[-0.04em] max-sm:text-[22px]">{item.name}</h3>
                      <span className="font-mono text-xs leading-[1.4] text-accent">{item.role}</span>
                      <span className="font-mono text-xs leading-[1.4] text-muted">{item.type}</span>
                    </div>
                    <p className="mt-2 max-w-[820px] text-[14.5px] leading-[1.75] text-muted">{item.description}</p>
                    <p className="mt-2.5 font-mono text-xs leading-[1.8] text-accent">{item.stack}</p>
                  </div>
                  <div className="flex min-w-0 max-w-[250px] flex-col items-end gap-[7px] max-sm:max-w-full max-sm:items-start">
                    <time className="font-mono text-xs leading-[1.5] text-muted">{item.period}</time>
                    {item.url
                      ? (
                          <a className="inline-flex max-w-full items-center gap-[6px] border-b border-accent/30 pb-0.5 font-mono text-[13px] leading-[1.35] text-accent transition-colors hover:border-accent focus-visible:border-accent" href={item.url} target="_blank" rel="noreferrer" aria-label={`访问${item.name}（新窗口打开）`}>
                            {item.url.includes('github.com')
                              ? <SiGithub className="size-[14px] shrink-0" aria-hidden="true" />
                              : <FiExternalLink className="size-[14px] shrink-0" aria-hidden="true" />}
                            <span className="truncate">{item.name}</span>
                          </a>
                        )
                      : (
                          <span className="font-mono text-xs leading-[1.2] text-muted">内部项目 · 暂无公开地址</span>
                        )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

      </main>

      <footer className="mx-auto flex w-[min(1240px,calc(100%_-_40px))] items-center justify-center gap-3 px-5 pt-6 pb-9 font-mono text-xs leading-[1.6] tracking-[0.02em] text-muted max-sm:w-[calc(100%_-_24px)] max-sm:flex-col max-sm:gap-1 max-sm:px-3 max-sm:pt-5 max-sm:pb-[30px]">
        <p>© 2026 阿纸</p>
        <a
          className="flex items-center gap-[5px] transition-opacity hover:opacity-80 focus-visible:opacity-80"
          href="https://icp.gov.moe/?keyword=20265173"
          target="_blank"
          rel="noreferrer"
          aria-label="萌ICP备20265173号（前往萌国ICP备案查询）"
        >
          <img
            src="https://icp.gov.moe/images/gov.svg"
            alt=""
            className="h-4 w-4"
          />
          <span>
            <span style={{ color: '#ff0000' }}>萌</span>
            <span style={{ color: '#ca7900' }}>I</span>
            <span style={{ color: '#48ab18' }}>C</span>
            <span style={{ color: '#2720ac' }}>P</span>
            <span style={{ color: '#9b17ae' }}>备</span>
            {' '}
            <span style={{ color: '#ff0000' }}>20</span>
            <span style={{ color: '#ca7900' }}>26</span>
            <span style={{ color: '#48ab18' }}>51</span>
            <span style={{ color: '#2720ac' }}>73</span>
            <span style={{ color: '#f40428' }}>号</span>
          </span>
        </a>
      </footer>
    </>
  )
}
