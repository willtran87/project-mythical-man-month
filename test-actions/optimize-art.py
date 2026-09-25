"""Create game-sized WebP copies of the large legacy PNG illustrations."""

from pathlib import Path
import re

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / "src/battle-main.js").read_text(encoding="utf-8")
paths = {(ROOT / "public" / match.lstrip("/")).with_suffix(".png") for match in re.findall(r"/assets/[^'\"]+\.(?:png|webp)", source)}
paths = {path for path in paths if path.is_file()}
paths.update((ROOT / "public/assets/cards").glob("*.png"))

for path in sorted(paths):
    if not path.is_file():
        raise FileNotFoundError(path)
    with Image.open(path) as image:
        image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        image.thumbnail((900, 900), Image.Resampling.LANCZOS)
        image.save(path.with_suffix(".webp"), "WEBP", quality=90, method=6)
    print(f"{path.relative_to(ROOT)} -> {path.with_suffix('.webp').relative_to(ROOT)}")
