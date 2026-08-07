from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    PageTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "阿纸-前端开发工程师-简历.pdf"
PUBLIC = ROOT / "public" / "阿纸-前端开发工程师-简历.pdf"

PAPER = colors.white
INK = colors.HexColor("#17272A")
MUTED = colors.HexColor("#5B6B6E")
SAGE = colors.HexColor("#2F7D72")
MINT = colors.HexColor("#EAF6F2")
LINE = colors.HexColor("#D8E6E2")
TAG = colors.HexColor("#3F6B63")
ITEM = colors.HexColor("#8A9A9C")

WINDOWS_FONTS = Path("C:/Windows/Fonts")
if WINDOWS_FONTS.exists():
    pdfmetrics.registerFont(TTFont("YaHei", str(WINDOWS_FONTS / "msyh.ttc")))
    pdfmetrics.registerFont(TTFont("YaHeiBold", str(WINDOWS_FONTS / "msyhbd.ttc")))
else:
    pdfmetrics.registerFont(TTFont("YaHei", "/System/Library/Fonts/STHeiti Light.ttc", subfontIndex=1))
    pdfmetrics.registerFont(TTFont("YaHeiBold", "/System/Library/Fonts/STHeiti Medium.ttc", subfontIndex=1))


def style(name, **kwargs):
    base = dict(fontName="YaHei", fontSize=8.8, leading=14, textColor=MUTED)
    base.update(kwargs)
    return ParagraphStyle(name, **base)


S = {
    "name": style("name", fontName="YaHeiBold", fontSize=23, leading=28, textColor=INK),
    "header_title": style("header_title", fontName="YaHeiBold", fontSize=12.5, leading=16, textColor=INK),
    "header_tags": style("header_tags", fontSize=7.6, leading=11, textColor=SAGE),
    "header_contact": style("header_contact", fontSize=8, leading=13.5, textColor=MUTED, alignment=TA_RIGHT),
    "lead": style("lead", fontSize=11.5, leading=17.5, textColor=INK),
    "section": style("section", fontName="YaHeiBold", fontSize=14, leading=19, textColor=INK),
    "section_en": style("section_en", fontName="YaHeiBold", fontSize=7, leading=10, textColor=SAGE, alignment=TA_RIGHT),
    "body": style("body", fontSize=8.8, leading=14, textColor=MUTED),
    "body_ink": style("body_ink", fontSize=8.8, leading=14, textColor=INK),
    "bullet": style("bullet", fontSize=8.4, leading=13.2, textColor=MUTED, leftIndent=11, firstLineIndent=-9),
    "stack": style("stack", fontSize=7.6, leading=11, textColor=TAG),
    "project": style("project", fontName="YaHeiBold", fontSize=11.5, leading=15, textColor=INK),
    "item_num": style("item_num", fontName="YaHeiBold", fontSize=8, leading=10.5, textColor=ITEM),
    "right": style("right", fontSize=7.8, leading=12, alignment=TA_RIGHT, textColor=MUTED),
    "exp_period": style("exp_period", fontName="YaHeiBold", fontSize=9.5, leading=13.5, textColor=INK),
    "exp_role": style("exp_role", fontName="YaHeiBold", fontSize=12, leading=16, textColor=INK),
    "cap_title": style("cap_title", fontName="YaHeiBold", fontSize=9.5, leading=13, textColor=INK, spaceAfter=2),
    "cap_skills": style("cap_skills", fontSize=8.2, leading=12.4, textColor=MUTED),
}


def header_footer(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("YaHei", 6.5)
    canvas.drawString(16 * mm, 10 * mm, "阿纸 · 前端开发工程师")
    canvas.setFont("YaHeiBold", 6.5)
    canvas.drawRightString(width - 16 * mm, 10 * mm, f"{doc.page:02d}")
    canvas.restoreState()


def rule(space_before=1.5, space_after=8):
    table = Table([[""]], colWidths=[178 * mm])
    table.setStyle(TableStyle([
        ("LINEABOVE", (0, 0), (-1, -1), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), space_before),
        ("BOTTOMPADDING", (0, 0), (-1, -1), space_after),
    ]))
    return table


def section_heading(english, chinese):
    return Table(
        [[Paragraph(chinese, S["section"]), Paragraph(english, S["section_en"])]],
        colWidths=[122 * mm, 56 * mm],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ]),
    )


def capability_cards():
    caps = [
        ("Front-end Engineering", "Vue 3 · Nuxt 3/4 · Astro · TypeScript · Vite · Pinia"),
        ("Motion & Media", "GSAP · Three.js · PixiJS · Spine · Canvas · WebGL"),
        ("AI Applications", "OpenAI API · Function Calling · RAG · pgvector · Drizzle ORM · SSE"),
        ("Product Delivery", "Vue I18n · SEO · OAuth / OIDC · 阿里云 OSS · Docker · Nginx"),
    ]
    rows = [[Paragraph(title, S["cap_title"]), Paragraph(items, S["cap_skills"])] for title, items in caps]
    table = Table(rows, colWidths=[60 * mm, 118 * mm])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 3.4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.4 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def project(number, name, role, period, stack, intro, bullets):
    header = Table(
        [[Paragraph(number, S["item_num"]), Paragraph(name, S["project"]), Paragraph(f"{role}<br/>{period}", S["right"])]],
        colWidths=[9 * mm, 128 * mm, 41 * mm],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ]),
    )
    flow = [
        header,
        Spacer(1, 1.2 * mm),
        Paragraph(stack, S["stack"]),
        Spacer(1, 2.4 * mm),
        Paragraph(intro, S["body_ink"]),
        Spacer(1, 1.6 * mm),
    ]
    for item in bullets:
        flow.append(Paragraph(f"•&nbsp;&nbsp;{item}", S["bullet"]))
    flow.append(Spacer(1, 3.5 * mm))
    return KeepTogether(flow)


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=15 * mm,
        bottomMargin=16 * mm,
        title="阿纸 - 前端开发工程师简历",
        author="阿纸",
        subject="Front-end Engineer / Creative Developer",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=header_footer)])

    identity = Table(
        [
            [Paragraph("阿纸", S["name"])],
            [Paragraph("前端开发工程师", S["header_title"])],
            [Paragraph("VUE / NUXT · CREATIVE WEB · AI APPLICATIONS", S["header_tags"])],
        ],
        colWidths=[70 * mm],
        style=TableStyle([
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]),
    )
    header_table = Table(
        [[
            Image(str(ROOT / "public" / "avatar.png"), width=19 * mm, height=19 * mm),
            identity,
            Paragraph("微信 AndyCongDev<br/>1475289190@qq.com<br/>github.com/baizhi958216<br/>x.com/baizhi958216", S["header_contact"]),
        ]],
        colWidths=[22 * mm, 70 * mm, 86 * mm],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (0, -1), 0),
            ("LEFTPADDING", (1, 0), (-1, -1), 3),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]),
    )

    story = [
        header_table,
        rule(space_before=2, space_after=21),
        Paragraph("把复杂的交互与 AI 能力，打磨成可靠、懂用户的 Web 产品。", S["lead"]),
        Spacer(1, 14 * mm),
        KeepTogether([
            section_heading("PROFILE", "个人概述"),
            rule(),
            Paragraph(
                "复杂互动与内容 Web、AI 应用工程化。在 peropero 负责面向全球玩家的游戏官网、预约活动、品牌官网与客服中心，覆盖中繁英日韩五种语言与 PC / 移动双端，从页面、动画、性能一直做到上线部署。近期独立完成 AI 客服回复平台，从零设计 Agent 工具编排、RAG 知识库、SSE 流式交互与知识同步，把模型能力落地为可控、可审计的业务系统。工作之余保持高频开源输出：向 InfiPlot（364★）合并 10 个 PR，是 doocs 开源社区成员，近一年 GitHub 770+ 次贡献。",
                S["body"],
            ),
        ]),
        Spacer(1, 13 * mm),
        KeepTogether([
            section_heading("CAPABILITY INDEX", "核心能力"),
            rule(),
            capability_cards(),
        ]),
        Spacer(1, 13 * mm),
        KeepTogether([
            section_heading("EXPERIENCE", "工作经历"),
            rule(),
            Table(
                [[
                    Paragraph("2024.09 — 至今<br/><font size='8' color='#5B6B6E'>peropero</font>", S["exp_period"]),
                    Paragraph("前端开发工程师", S["exp_role"]),
                    [
                        Paragraph("负责面向全球玩家的游戏官网、预约活动、品牌官网与客服中心，以及 AI 客服平台的前端交付：", S["body_ink"]),
                        Spacer(1, 1.4 * mm),
                        Paragraph("①&nbsp;&nbsp;互动与内容 Web：使用 Vue / Nuxt / Astro + TypeScript 交付多语言、重动画、重媒体产品，覆盖从需求拆分到上线维护的完整闭环。", S["bullet"]),
                        Paragraph("②&nbsp;&nbsp;AI 应用工程化：独立设计并实现 AI 客服邮件回复平台，覆盖 Agent 工具编排、RAG 知识库、 SSE&nbsp;流式输出与知识增量同步。", S["bullet"]),
                    ],
                ]],
                colWidths=[40 * mm, 52 * mm, 86 * mm],
                style=TableStyle([
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 1),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                ]),
            ),
        ]),
        Spacer(1, 11 * mm),
    ]

    story.append(KeepTogether([
        section_heading("PROJECTS", "负责项目"),
        rule(space_after=8),
        project(
            "01",
            "内部 AI 客服邮件回复平台",
            "AI 应用工程实践",
            "2026.07 — 至今",
            "Nuxt 4 · Vue 3 · TypeScript · PostgreSQL · pgvector · Drizzle ORM · OpenAI API · SSE",
            "面向游戏客服场景的 AI 邮件处理平台，独立设计实现，覆盖邮件接收、知识检索、智能回复、草稿保存与发送闭环。",
            [
                "四种知识方案严格隔离：实时飞书、本地 XLSX、Markdown Skill 与 RAG 不共享读取路径，失败不静默切换，保证回复依据与审计一致。",
                "工具调用由代码强制：named tool_choice + 工具白名单按序执行必需工具，safe / write / dangerous 权限分级与调用审计，高风险场景转人工复核。",
                "RAG 链路：1000 字符分块（200 重叠）、Top-K 5、距离阈值 0.5；2048 维向量超过 HNSW 上限，采用精确余弦排序。",
                "知识同步：SHA-256 内容哈希识别变更、仅增量向量化、事务替换；快照成功与向量成功分离。SSE 四类事件输出，X-Accel-Buffering: no 关闭代理缓冲。",
            ],
        ),
    ]))

    story.extend([
        project(
            "02",
            "Muse Dash 2 官网及预约活动页",
            "核心前端开发",
            "2026.05 — 至今",
            "Astro · Vue 3 · TypeScript · Three.js · Spine · GSAP · UnoCSS",
            "面向全球玩家的多语言游戏官网与预约活动页，包含官网展示、预约登录、OAuth 授权及奖励进度。",
            [
                "Astro + Vue Islands：官网静态为主、预约等交互按需注入 JS，拆分公共布局、预约、弹窗和奖励进度模块。",
                "Three.js + Spine 角色舞台：横竖屏响应式、预约人数文字按视口与文字长度动态缩放，自建骨骼 / 图层调试面板。",
                "预约人数稳定更新：30 秒轮询 + 请求复用 + AbortController + 请求序号防旧响应覆盖 + 无消费者自动停止轮询。",
                "完成 Google / Apple OAuth、Steam / TapTap 外部预约与重复预约状态处理；Docker + nginx 部署。",
            ],
        ),
        project(
            "03",
            "peropero 官网",
            "核心前端开发",
            "2025.08 — 至今",
            "Nuxt 4 · Vue 3 · TypeScript · Pinia · UnoCSS · GSAP · Canvas · WebGL",
            "公司品牌官网，负责产品展示、招聘职位、在线投递与联系我们，提供桌面端与移动端独立体验。",
            [
                "双端路由体系：桌面端与移动端独立页面，User-Agent 全局路由中间件自动跳转，避免两套入口错配。",
                "大文件分片上传：超过 5MB 触发分片，自建 QPS 3 限流队列，Promise.all 汇总分片后合并，处理进度与失败重试。",
                "CSS Variables 主题系统：校验主题 JSON、合并默认主题、按亮 / 暗模式写入变量，支持运行时切换。",
                "GSAP / Swiper / Canvas / WebGL 实现视差、滚轮切屏与粒子动画；完善多语言、SEO、结构化数据与 Docker 构建。",
            ],
        ),
        project(
            "04",
            "宇宙电台 Cosmic Radio 2025",
            "核心前端开发",
            "2025.03 — 2025.12",
            "Nuxt 4 · Vue 3 · TypeScript · Pinia · PrimeVue · GSAP · Vue I18n",
            "面向全球的多语言原创音乐赛事平台，覆盖赛事展示、作品投稿、候选曲目投票、结果发布、评委点评、视频播放与社交分享。",
            [
                "基于 Vue I18n prefix 路由完成中繁英日韩多语言适配，处理长文案排版与移动端兼容；实现投稿链接解析回填、表单 / 邮箱校验、歌曲选择、视频预览、评委点评与滚动导航。",
                "负责首页、投稿、投票、结果、奖项与下载等核心页面及公共组件，使用 IntersectionObserver、图片懒加载与请求防抖优化页面体验。",
                "配置 Nuxt Image、sitemap、Open Graph / Twitter Meta 与 CDN 资源管理，接入埋点和社交分享，覆盖投稿 → 投票 → 结果公布完整赛程。",
            ],
        ),
    ])

    story.append(PageBreak())

    story.append(KeepTogether([
        Paragraph("更多项目 · More Work", S["section"]),
        rule(space_after=6),
    ]))
    more_items = [
        ("2025.03 — 至今", "Muse Dash 客服中心", "多语言工单平台：配置驱动的动态表单、OSS 分片上传（压缩 / 进度 / 取消）、RSA 2048 加密、滑动验证与全局异常上报。"),
        ("2024.10 — 至今", "企业内部商城", "订货系统：梳理并落地 9 种订单状态流转，完成飞书 SSO / OIDC 权限、Excel 导出与 OSS + STS 上传。"),
        ("2024.09 — 至今", "Muse Dash 官网重构", "基于旧版 0-1 重写，封装 PixiJS + Spine 动画方案与资源回收，支撑版本专题与周年活动，通过依赖分包与体积分析优化重资源页面。"),
    ]
    for period, name, desc in more_items:
        story.append(
            Table(
                [[Paragraph(period, S["right"]), Paragraph(f"<b>{name}</b> — {desc}", S["body"])]],
                colWidths=[34 * mm, 144 * mm],
                style=TableStyle([
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE),
                    ("TOPPADDING", (0, 0), (-1, -1), 1.9 * mm),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.9 * mm),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (0, -1), 2 * mm),
                    ("LEFTPADDING", (1, 0), (1, -1), 2 * mm),
                    ("RIGHTPADDING", (1, 0), (1, -1), 0),
                ]),
            )
        )

    open_source_items = [
        ("2026.06 — 至今", "InfiPlot ｜ 核心贡献者（开源 Web + 移动端 App）", "AI 实时生成图文内容的互动剧情游戏：开源 Web 端 10 个 PR 被合并（加密剧情分享导出 / 导入、场景图集 zip 打包下载、游玩历史、视觉点击设置、画布帧稳定、OpenAI 兼容图片参数扩展）；同时负责移动端 App 与全栈开发：Expo / React Native App（邮箱 OTP、Apple / Google 登录、剧情创作与评论、通知推送）、Hono + Cloudflare Workers API 与故事引擎。"),
        ("2026.07 — 至今", "Yet-Another-Yume-Archive（YAYA）｜ 独立开发", "面向多平台的现代化下载工具 YAYA（娅娅），覆盖 Tauri 2 桌面端 / 移动端 / Web：内置 HTTP / HTTPS 多线程分片下载引擎，支持断点续传、实时限速与文件校验；采用 Provider 扩展机制，站点能力由独立 Provider 提供、宿主保持内容中立；Vue 3 + UnoCSS 响应式界面，支持明暗模式与主题色。"),
        ("持续更新", "Fast-Node-Switcher ｜ 独立开发", "VSCode 扩展，在编辑器内一键切换 Node.js 版本：自动检测 nvm / nvm-windows / fnm / pnpm / Volta / mise 并优先 nvm，状态栏实时显示当前版本与管理工具，支持全局 / 项目级切换与直接安装新版本，自动应用 .nvmrc、.node-version 与 Volta 配置，跨 Windows / macOS / Linux。"),
        ("2026.01", "wuwa2025 ｜ 独立开发", "《鸣潮》2025 年度回忆跑马灯：Nuxt + Vue 3 + Three.js 打造 WebGL 创意页面，自定义 shader 实现环境水波动画、焦散、色差、菲涅尔边缘高光与镜面高光，搭配图片轮播、背景音乐与交互控制还原年度回顾氛围。"),
        ("持续更新", "其他个人作品 ｜ 独立项目", "another-yutto-gui（Tauri 2 + Vue 3 + Rust 的 B 站下载器 yutto GUI）、pmx-three（PMX 2.x 解析 + Three.js 渲染工具集）、ollama-lark-contentreader（飞书 / Lark 文档 MCP server）、async-image-generation（Codex skill）等。"),
    ]
    open_source_flow = [section_heading("OPEN SOURCE", "开源贡献"), rule(space_after=6)]
    for period, name, desc in open_source_items:
        open_source_flow.append(
            Table(
                [[Paragraph(period, S["right"]), Paragraph(f"<b>{name}</b> — {desc}", S["body"])]],
                colWidths=[34 * mm, 144 * mm],
                style=TableStyle([
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE),
                    ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (0, -1), 2 * mm),
                    ("LEFTPADDING", (1, 0), (1, -1), 2 * mm),
                    ("RIGHTPADDING", (1, 0), (1, -1), 0),
                ]),
            )
        )
    story.append(KeepTogether(open_source_flow))

    doc.build(story)
    PUBLIC.write_bytes(OUTPUT.read_bytes())
    print(OUTPUT)
    print(PUBLIC)


if __name__ == "__main__":
    build()
