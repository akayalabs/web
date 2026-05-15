"use client";

import { useEffect } from "react";

const SIZE = 64;
const HANKO_DURATION_MS = 1800;
const TRANSITION_FRAMES = 16;
const TRANSITION_DURATION_MS = 600;

function setFaviconHref(href: string) {
  const head = document.head;
  // Remove every existing icon link so the browser picks our dynamic one
  head.querySelectorAll("link[rel*='icon']").forEach((node) => node.remove());
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = href;
  head.appendChild(link);
}

function drawHanko(ctx: CanvasRenderingContext2D, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#9B2C2C";
  const r = 8;
  const x = 4;
  const y = 4;
  const w = SIZE - 8;
  const h = SIZE - 8;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#FAF7F1";
  ctx.font = "700 44px 'Playfair Display', Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("A", SIZE / 2, SIZE / 2 + 2);
  ctx.restore();
}

function drawLogo(ctx: CanvasRenderingContext2D, img: HTMLImageElement, alpha = 1) {
  if (!img.complete || img.naturalWidth === 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, 0, 0, SIZE, SIZE);
  ctx.restore();
}

export function AnimatedFavicon() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = "/brand/logo-mark.png";

    if (prefersReducedMotion) {
      logoImg.onload = () => {
        ctx.clearRect(0, 0, SIZE, SIZE);
        drawLogo(ctx, logoImg);
        setFaviconHref(canvas.toDataURL("image/png"));
      };
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    function render(stage: "hanko" | "transition" | "logo", progress = 0) {
      if (!ctx) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      if (stage === "hanko") {
        drawHanko(ctx, 1);
      } else if (stage === "transition") {
        drawHanko(ctx, 1 - progress);
        drawLogo(ctx, logoImg, progress);
      } else {
        drawLogo(ctx, logoImg, 1);
      }
      setFaviconHref(canvas.toDataURL("image/png"));
    }

    function start() {
      if (cancelled) return;
      render("hanko");
      timeouts.push(
        setTimeout(() => {
          let frame = 0;
          intervalId = setInterval(() => {
            frame += 1;
            const progress = frame / TRANSITION_FRAMES;
            render("transition", Math.min(progress, 1));
            if (frame >= TRANSITION_FRAMES) {
              if (intervalId) clearInterval(intervalId);
              render("logo");
            }
          }, TRANSITION_DURATION_MS / TRANSITION_FRAMES);
        }, HANKO_DURATION_MS),
      );
    }

    if (logoImg.complete && logoImg.naturalWidth > 0) {
      start();
    } else {
      logoImg.onload = start;
      logoImg.onerror = () => {
        // Fallback: at least set hanko once if logo fails
        render("hanko");
      };
    }

    return () => {
      cancelled = true;
      timeouts.forEach((t) => clearTimeout(t));
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return null;
}
