#!/usr/bin/env python3
"""Compress generated deploy images without changing their public URLs."""
from __future__ import annotations

import os
from pathlib import Path
from tempfile import NamedTemporaryFile

try:
    from PIL import Image, ImageOps
except ImportError as exc:  # pragma: no cover - environment guard for local installs
    print(f"[optimize-images] Pillow is not installed; skipping image optimization: {exc}")
    raise SystemExit(0)

PUBLIC_FOTOS_DIR = Path("public/fotos")
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_DIMENSION = 1600
JPEG_QUALITY = 78
WEBP_QUALITY = 80
MIN_SAVINGS_BYTES = 2048


def resize_if_needed(image: Image.Image) -> Image.Image:
    width, height = image.size
    largest_side = max(width, height)

    if largest_side <= MAX_DIMENSION:
        return image

    scale = MAX_DIMENSION / largest_side
    resized_size = (max(1, round(width * scale)), max(1, round(height * scale)))
    return image.resize(resized_size, Image.Resampling.LANCZOS)


def save_optimized(image: Image.Image, suffix: str, destination: Path) -> None:
    suffix = suffix.lower()

    if suffix in {".jpg", ".jpeg"}:
        if image.mode not in {"RGB", "L"}:
            image = image.convert("RGB")
        image.save(destination, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        return

    if suffix == ".webp":
        image.save(destination, format="WEBP", quality=WEBP_QUALITY, method=6)
        return

    if suffix == ".png":
        image.save(destination, format="PNG", optimize=True)
        return

    raise ValueError(f"Unsupported image type: {suffix}")


def optimize_file(path: Path) -> tuple[int, int]:
    original_size = path.stat().st_size

    try:
        with Image.open(path) as opened:
            image = ImageOps.exif_transpose(opened)
            image = resize_if_needed(image)

            with NamedTemporaryFile(delete=False, suffix=path.suffix) as temporary_file:
                temp_path = Path(temporary_file.name)

            try:
                save_optimized(image, path.suffix, temp_path)
                optimized_size = temp_path.stat().st_size

                if optimized_size + MIN_SAVINGS_BYTES < original_size:
                    os.replace(temp_path, path)
                    return original_size, optimized_size

                temp_path.unlink(missing_ok=True)
                return original_size, original_size
            except Exception:
                temp_path.unlink(missing_ok=True)
                raise
    except Exception as exc:  # continue optimizing the rest of the deploy package
        print(f"[optimize-images] skipped {path}: {exc}")
        return original_size, original_size


def main() -> None:
    if not PUBLIC_FOTOS_DIR.exists():
        print(f"[optimize-images] {PUBLIC_FOTOS_DIR} not found; nothing to optimize.")
        return

    images = [
        path
        for path in PUBLIC_FOTOS_DIR.rglob("*")
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    ]

    before_total = 0
    after_total = 0
    changed = 0

    for image_path in images:
        before, after = optimize_file(image_path)
        before_total += before
        after_total += after
        if after < before:
            changed += 1

    saved = before_total - after_total
    print(
        "[optimize-images] "
        f"processed={len(images)} changed={changed} "
        f"before={before_total / 1048576:.2f}MB "
        f"after={after_total / 1048576:.2f}MB "
        f"saved={saved / 1048576:.2f}MB"
    )


if __name__ == "__main__":
    main()
