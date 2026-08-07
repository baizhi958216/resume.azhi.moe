from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
WIDTH, HEIGHT = 1200, 630

PAPER = "#F5F4ED"
PAPER_DEEP = "#ECEBE3"
INK = "#171817"
MUTED = "#6D706B"
ACCENT = "#193A65"
ACCENT_SOFT = "#DBE5F0"
GREEN = "#789F89"
LINE = "#D6D5CE"


def font(path: str, size: int, index: int = 0):
    return ImageFont.truetype(path, size=size, index=index)


WINDOWS_FONTS = Path("C:/Windows/Fonts")
if WINDOWS_FONTS.exists():
    SANS = str(WINDOWS_FONTS / "msyh.ttc")
    SANS_MEDIUM = str(WINDOWS_FONTS / "msyhbd.ttc")
    SERIF = str(WINDOWS_FONTS / "simkai.ttf")
else:
    SANS = "/System/Library/Fonts/STHeiti Light.ttc"
    SANS_MEDIUM = "/System/Library/Fonts/STHeiti Medium.ttc"
    SERIF = "/System/Library/Fonts/Supplemental/Songti.ttc"

f_meta = font(SANS_MEDIUM, 15, 1)
f_kicker = font(SANS, 18, 1)
f_name = font(SERIF, 29)
f_title = font(SERIF, 76)
f_statement = font(SERIF, 25)
f_body = font(SANS, 16, 1)
f_tag = font(SANS_MEDIUM, 14, 1)
f_card_meta = font(SANS_MEDIUM, 13, 1)


def rounded_avatar(size: int) -> Image.Image:
    source = Image.open(PUBLIC / "avatar.png").convert("RGB")
    source = source.resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size, size), radius=48, fill=255)
    result = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    result.paste(source, (0, 0), mask)
    return result


def draw_grid(layer: Image.Image) -> None:
    draw = ImageDraw.Draw(layer)
    for x in range(0, WIDTH, 42):
        draw.line((x, 0, x, HEIGHT), fill=(23, 24, 23, 7), width=1)
    for y in range(0, HEIGHT, 42):
        draw.line((0, y, WIDTH, y), fill=(23, 24, 23, 7), width=1)


def build():
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), PAPER)

    grid = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_grid(grid)
    canvas = Image.alpha_composite(canvas, grid)

    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse((820, -260, 1370, 290), fill=(219, 229, 240, 235))
    glow_draw.ellipse((960, 390, 1290, 720), fill=(120, 159, 137, 38))
    glow = glow.filter(ImageFilter.GaussianBlur(82))
    canvas = Image.alpha_composite(canvas, glow)
    draw = ImageDraw.Draw(canvas)

    # Main editorial frame, mirroring the resume hero card.
    draw.rounded_rectangle((32, 32, WIDTH - 32, HEIGHT - 32), radius=28, fill=(255, 255, 255, 105), outline=LINE, width=1)
    draw.line((780, 82, 780, 548), fill=LINE, width=1)

    draw.ellipse((78, 73, 86, 81), fill=GREEN)
    draw.text((99, 66), "AVAILABLE FOR OPPORTUNITIES", font=f_meta, fill=MUTED)
    draw.text((78, 111), "阿纸  /  AZHI", font=f_kicker, fill=ACCENT)

    draw.text((74, 157), "前端开发", font=f_title, fill=INK)
    draw.text((74, 247), "工程师", font=f_title, fill=ACCENT)
    draw.text((78, 355), "把复杂的交互与 AI 能力，", font=f_statement, fill=INK)
    draw.text((78, 394), "打磨成可靠、懂用户的 Web 产品。", font=f_statement, fill=INK)

    tags = ["VUE / NUXT", "CREATIVE WEB", "AI APPLICATIONS", "FULL STACK"]
    x = 78
    for label in tags:
        bbox = draw.textbbox((0, 0), label, font=f_tag)
        tag_width = bbox[2] - bbox[0] + 30
        draw.rounded_rectangle((x, 465, x + tag_width, 505), radius=20, fill="#EEF2F5", outline="#CFD9E4", width=1)
        draw.text((x + 15, 476), label, font=f_tag, fill=ACCENT)
        x += tag_width + 10

    draw.text((78, 542), "GUANGZHOU, CHINA", font=f_meta, fill=MUTED)
    draw.text((262, 542), "·", font=f_meta, fill=ACCENT)
    draw.text((280, 542), "RESUME 2026", font=f_meta, fill=MUTED)

    # Profile card.
    card = (836, 90, 1124, 540)
    shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((card[0] + 6, card[1] + 10, card[2] + 6, card[3] + 10), radius=30, fill=(23, 24, 23, 30))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    canvas = Image.alpha_composite(canvas, shadow)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(card, radius=30, fill=(245, 244, 237, 235), outline="#FFFFFF", width=2)

    avatar_size = 210
    avatar_x, avatar_y = 875, 125
    draw.rounded_rectangle((avatar_x - 9, avatar_y - 9, avatar_x + avatar_size + 9, avatar_y + avatar_size + 9), radius=56, fill="#FFFFFF", outline="#E2E1DA", width=1)
    canvas.alpha_composite(rounded_avatar(avatar_size), (avatar_x, avatar_y))
    draw = ImageDraw.Draw(canvas)
    draw.ellipse((avatar_x + avatar_size - 21, avatar_y + avatar_size - 21, avatar_x + avatar_size + 7, avatar_y + avatar_size + 7), fill=GREEN, outline=PAPER, width=6)

    draw.text((875, 374), "你好，我是", font=f_body, fill=MUTED)
    draw.text((875, 404), "阿纸", font=f_name, fill=INK)
    draw.text((875, 457), "FRONT-END ENGINEER", font=f_card_meta, fill=ACCENT)
    draw.line((875, 488, 1085, 488), fill=LINE, width=1)
    draw.text((875, 507), "resume.azhi.moe", font=f_card_meta, fill=MUTED)

    result = canvas.convert("RGB")
    for name in ("og.png", "og-resume.png"):
        result.save(PUBLIC / name, format="PNG", optimize=True)


if __name__ == "__main__":
    build()
