from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "public" / "images" / "matching-service" / "raw"
OUT_DIR = ROOT / "public" / "images" / "matching-service" / "processed"
CONFIG_PATH = ROOT / "image-process.config.json"

MODES = {
    "icon": (800, 800, 0.08),
    "arrow": (400, 400, 0.08),
    "wide": (1200, 700, 0.04),
    "card": (1000, 650, 0.04),
    "product": (1200, 1200, 0.06),
}

STEP_ICON_CROPS = {
    "step-1-whatsapp.png": (500, 260, 1030, 980),
    "step-2-tonnage.png": (330, 300, 1140, 900),
    "step-3-coupler.png": (365, 290, 1160, 910),
    "step-4-quote-shipping.png": (330, 320, 1165, 910),
}

STEP_ICON_OUTPUTS = {
    "step-1-whatsapp.png": "step-1-whatsapp-icon.png",
    "step-2-tonnage.png": "step-2-tonnage-icon.png",
    "step-3-coupler.png": "step-3-coupler-icon.png",
    "step-4-quote-shipping.png": "step-4-quote-shipping-icon.png",
}

SPECIAL_CROPS = {
    "expert-message.png": (220, 146, 1243, 840),
}

TARGET_GOLD = (245, 184, 0)
EXPERT_BUBBLE_FILL = (13, 43, 77)
EXPERT_BUBBLE_BORDER = (90, 130, 170)


def load_config() -> dict[str, str]:
    if not CONFIG_PATH.exists():
        return {}
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def remove_solid_background_if_needed(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    alpha = image.getchannel("A")

    if alpha.getextrema()[0] < 250:
        return image

    width, height = image.size
    pixels = image.load()
    corners = [
        pixels[0, 0],
        pixels[width - 1, 0],
        pixels[0, height - 1],
        pixels[width - 1, height - 1],
    ]
    average = tuple(round(sum(color[channel] for color in corners) / 4) for channel in range(3))
    max_corner_distance = max(
        sum((first[channel] - second[channel]) ** 2 for channel in range(3)) ** 0.5
        for first in corners
        for second in corners
    )

    if max_corner_distance > 32:
        return image

    transparent_distance = 18
    feather_distance = 48

    for y in range(height):
        for x in range(width):
            red, green, blue, alpha_value = pixels[x, y]
            distance = sum((value - average[index]) ** 2 for index, value in enumerate((red, green, blue))) ** 0.5
            if distance <= transparent_distance:
                pixels[x, y] = (red, green, blue, 0)
            elif distance < feather_distance:
                new_alpha = round(((distance - transparent_distance) / (feather_distance - transparent_distance)) * alpha_value)
                pixels[x, y] = (red, green, blue, new_alpha)

    return image


def alpha_bounds(image: Image.Image) -> tuple[int, int, int, int]:
    alpha = image.getchannel("A")
    bounds = alpha.point(lambda value: 255 if value > 2 else 0).getbbox()
    return bounds or (0, 0, image.width, image.height)


def harmonize_gold_pixels(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    pixels = image.load()

    for y in range(image.height):
        for x in range(image.width):
            red, green, blue, alpha = pixels[x, y]
            if alpha == 0:
                continue

            is_bright_gold_pixel = (
                red > 130
                and green > 75
                and blue < 125
                and red > blue * 1.7
                and green > blue * 1.25
                and red >= green * 0.82
            )
            is_olive_gold_pixel = (
                red > 45
                and green > 70
                and blue < 115
                and green > blue * 1.2
                and red + green > 150
            )
            if not (is_bright_gold_pixel or is_olive_gold_pixel):
                continue

            brightness = max(red, green) / 255
            shade = max(0.68, min(1.18, 0.52 + brightness * 0.62))
            pixels[x, y] = (
                min(255, round(TARGET_GOLD[0] * shade)),
                min(255, round(TARGET_GOLD[1] * shade)),
                min(255, round(TARGET_GOLD[2] * shade)),
                alpha,
            )

    return image


def is_goldish_pixel(red: int, green: int, blue: int) -> bool:
    is_bright_gold_pixel = (
        red > 130
        and green > 75
        and blue < 125
        and red > blue * 1.7
        and green > blue * 1.25
        and red >= green * 0.82
    )
    is_olive_gold_pixel = (
        red > 45
        and green > 70
        and blue < 115
        and green > blue * 1.2
        and red + green > 150
    )
    return is_bright_gold_pixel or is_olive_gold_pixel


def style_expert_message(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    width, height = image.size
    pixels = image.load()

    small_bubble_mask = Image.new("L", (width, height), 0)
    mask_pixels = small_bubble_mask.load()

    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if alpha == 0:
                continue

            in_person_art = 112 <= x <= 330 and 245 <= y <= 520
            in_small_bubble = x <= 260 and y <= 190

            if in_small_bubble:
                mask_pixels[x, y] = alpha

                if red > 178 and green > 178 and blue > 178:
                    pixels[x, y] = (255, 255, 255, alpha)
                    continue

                if is_goldish_pixel(red, green, blue):
                    pixels[x, y] = (
                        EXPERT_BUBBLE_BORDER[0],
                        EXPERT_BUBBLE_BORDER[1],
                        EXPERT_BUBBLE_BORDER[2],
                        min(178, max(108, alpha)),
                    )
                    continue

                if red < 55 and green < 95 and blue < 145:
                    pixels[x, y] = (
                        EXPERT_BUBBLE_FILL[0],
                        EXPERT_BUBBLE_FILL[1],
                        EXPERT_BUBBLE_FILL[2],
                        max(alpha, 230),
                    )
                    continue

            in_main_frame = (
                (45 <= x <= width - 8 and 176 <= y <= 238)
                or (64 <= x <= width - 8 and y >= height - 86)
                or (64 <= x <= 100 and 176 <= y <= height - 48)
                or (width - 44 <= x <= width - 1 and 176 <= y <= height - 48)
            )
            in_text_area = 312 <= x <= width - 74 and 238 <= y <= 520

            if not in_person_art and (in_main_frame or in_text_area):
                is_visible_line_or_text = alpha > 8 and (red + green + blue > 92)
                if is_visible_line_or_text:
                    pixels[x, y] = (255, 255, 255, alpha)
                    continue

            if is_goldish_pixel(red, green, blue) and not in_person_art:
                pixels[x, y] = (255, 255, 255, alpha)

    shadow_mask = small_bubble_mask.filter(ImageFilter.GaussianBlur(14))
    glow_mask = small_bubble_mask.filter(ImageFilter.GaussianBlur(6))
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow = Image.new("RGBA", (width, height), (90, 130, 170, 0))
    shadow.putalpha(shadow_mask.point(lambda value: round(value * 0.18)))
    glow.putalpha(glow_mask.point(lambda value: round(value * 0.12)))

    staged = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    staged.alpha_composite(shadow, (0, 8))
    staged.alpha_composite(glow)
    staged.alpha_composite(image)
    return staged


def process_one(path: Path, config: dict[str, str]) -> tuple[Path, tuple[int, int]]:
    relative = path.relative_to(RAW_DIR).as_posix()
    mode_name = config.get(f"matching-service/{relative}", config.get(relative, "product"))
    width, height, padding_ratio = MODES[mode_name]
    padding_x = round(width * padding_ratio)
    padding_y = round(height * padding_ratio)
    inner_width = width - padding_x * 2
    inner_height = height - padding_y * 2

    image = remove_solid_background_if_needed(Image.open(path))
    if path.name in SPECIAL_CROPS:
        image = image.crop(SPECIAL_CROPS[path.name])
    cropped = image.crop(alpha_bounds(image))
    if path.name in {"arrow-right.png", "expert-message.png"}:
        cropped = harmonize_gold_pixels(cropped)
    if path.name == "expert-message.png":
        cropped = style_expert_message(cropped)
    cropped.thumbnail((inner_width, inner_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    left = (width - cropped.width) // 2
    top = (height - cropped.height) // 2
    canvas.alpha_composite(cropped, (left, top))

    output_path = OUT_DIR / relative
    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output_path, "PNG", optimize=True)
    return output_path, (width, height)


def process_step_icon(path: Path) -> tuple[Path, tuple[int, int]]:
    width, height, padding_ratio = MODES["icon"]
    padding_x = round(width * padding_ratio)
    padding_y = round(height * padding_ratio)
    inner_width = width - padding_x * 2
    inner_height = height - padding_y * 2

    image = remove_solid_background_if_needed(Image.open(path))
    cropped = image.crop(STEP_ICON_CROPS[path.name])
    cropped = cropped.crop(alpha_bounds(cropped))
    cropped = harmonize_gold_pixels(cropped)
    cropped.thumbnail((inner_width, inner_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    left = (width - cropped.width) // 2
    top = (height - cropped.height) // 2
    canvas.alpha_composite(cropped, (left, top))

    output_path = OUT_DIR / STEP_ICON_OUTPUTS[path.name]
    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output_path, "PNG", optimize=True)
    return output_path, (width, height)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    config = load_config()
    files = sorted(RAW_DIR.glob("*.png"))

    if not files:
        print(f"No PNG files found in {RAW_DIR}")
        return

    for file in files:
        output_path, size = process_one(file, config)
        print(f"- {file.name} -> {output_path.relative_to(ROOT)} [{size[0]}x{size[1]}]")

        if file.name in STEP_ICON_CROPS:
            icon_output_path, icon_size = process_step_icon(file)
            print(f"- {file.name} -> {icon_output_path.relative_to(ROOT)} [{icon_size[0]}x{icon_size[1]} no step number]")

    print(f"Processed {len(files)} matching service PNG file(s).")


if __name__ == "__main__":
    main()
