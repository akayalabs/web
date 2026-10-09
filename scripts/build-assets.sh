#!/usr/bin/env bash
# Sitenin ağır kaynak dosyalarından yayında kullanılan hafif türevleri üretir.
#
# 1) Fontlar: fonts-src/*.ttf → app/fonts/*.woff2
#    Shippori Mincho tek başına 8,7 MB'tı ve LCP'yi 30 saniyeye çekiyordu; sitede
#    Japonca karakter yok, yalnızca Latin + Türkçe glifler lazım. Yeni bir dil
#    eklenirse UNICODES aralığını genişlet ve script'i yeniden çalıştır.
# 2) Uygulama ikonları: brand-src/app-icon.png (1254 px, 2 MB) her sayfada favicon
#    olarak iniyordu. Next.js app/icon.png ve app/apple-icon.png'yi olduğu gibi
#    sunar; bu yüzden tarayıcı ve iOS'un istediği boyutlarda üretilir.
# 3) Favicon logosu: animasyonlu favicon 64 px'lik canvas'a çiziyor; 1024 px'lik
#    logo-mark.png yerine retina için 2 katı boyutta küçük bir kopya üretilir.
#
# Gereksinimler: uv (brew install uv), pngquant (brew install pngquant), sips (macOS).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FONT_SRC="$ROOT/fonts-src"
FONT_OUT="$ROOT/app/fonts"
BRAND="$ROOT/public/brand"
BRAND_SRC="$ROOT/brand-src"
APP_DIR="$ROOT/app"

# Basic Latin, Latin-1, Latin Extended-A (ğ ı İ ş), tipografik noktalama,
# para birimleri, ok işaretleri (→) ve ™.
UNICODES="U+0020-007E,U+00A0-017F,U+2000-206F,U+20A0-20CF,U+2122,U+2190-2199"
FEATURES="kern,liga,clig,calt,ccmp,locl,mark,mkmk,onum,lnum,tnum,pnum"

# Google arama favicon'u için 48'in katı, iOS ana ekran ikonu için Apple'ın 180 px'i.
ICON_PX=192
APPLE_ICON_PX=180

# components/animated-favicon.tsx içindeki SIZE ile aynı tutulmalı.
FAVICON_CANVAS=64
FAVICON_SCALE=2

size_of() { du -h "$1" | cut -f1; }

# sips ile yeniden boyutlandırır, pngquant ile kayıpsıza yakın sıkıştırır.
resize_png() {
  local src="$1" px="$2" out="$3"
  sips --resampleHeightWidth "$px" "$px" "$src" --out "$out" >/dev/null
  pngquant --force --skip-if-larger --quality=80-95 --output "$out" "$out" || true
  printf '%-32s %8s -> %8s\n' "$(basename "$out")" "$(size_of "$src")" "$(size_of "$out")"
}

mkdir -p "$FONT_OUT"
for ttf in "$FONT_SRC"/*.ttf; do
  name="$(basename "$ttf" .ttf)"
  uvx --quiet --from "fonttools[woff]" pyftsubset "$ttf" \
    --unicodes="$UNICODES" \
    --layout-features="$FEATURES" \
    --flavor=woff2 \
    --output-file="$FONT_OUT/$name.woff2"
  printf '%-32s %8s -> %8s\n' "$name" "$(size_of "$ttf")" "$(size_of "$FONT_OUT/$name.woff2")"
done

resize_png "$BRAND_SRC/app-icon.png" "$ICON_PX" "$APP_DIR/icon.png"
resize_png "$BRAND_SRC/app-icon.png" "$APPLE_ICON_PX" "$APP_DIR/apple-icon.png"
resize_png "$BRAND/logo-mark.png" "$((FAVICON_CANVAS * FAVICON_SCALE))" "$BRAND/logo-mark-$((FAVICON_CANVAS * FAVICON_SCALE)).png"
