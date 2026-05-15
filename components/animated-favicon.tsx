"use client";

import { useEffect } from "react";

const SIZE = 64;
const FPS = 20;
const FRAME_MS = Math.round(1000 / FPS);

const STAMP_MS = 360;
const HOLD_MS = 1100;
const EXIT_MS = 480;
const REVEAL_MS = 520;
const TOTAL_MS = STAMP_MS + HOLD_MS + EXIT_MS + REVEAL_MS;
const FRAME_COUNT = Math.ceil(TOTAL_MS / FRAME_MS);

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;

function drawHankoBox(
  ctx: CanvasRenderingContext2D,
  alpha: number,
  scale: number,
  rotate: number,
) {
  if (alpha <= 0 || scale <= 0) return;
  ctx.save();
  ctx.translate(SIZE / 2, SIZE / 2);
  ctx.rotate(rotate);
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#9B2C2C";
  const r = 8;
  const hw = (SIZE - 8) / 2;
  const hh = (SIZE - 8) / 2;
  ctx.beginPath();
  ctx.moveTo(-hw + r, -hh);
  ctx.lineTo(hw - r, -hh);
  ctx.quadraticCurveTo(hw, -hh, hw, -hh + r);
  ctx.lineTo(hw, hh - r);
  ctx.quadraticCurveTo(hw, hh, hw - r, hh);
  ctx.lineTo(-hw + r, hh);
  ctx.quadraticCurveTo(-hw, hh, -hw, hh - r);
  ctx.lineTo(-hw, -hh + r);
  ctx.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawHankoLetter(
  ctx: CanvasRenderingContext2D,
  alpha: number,
  scale: number,
  translateX: number,
  rotate: number,
) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.translate(SIZE / 2 + translateX, SIZE / 2);
  ctx.rotate(rotate);
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#FAF7F1";
  ctx.font = "700 44px 'Playfair Display', Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("A", 0, 2);
  ctx.restore();
}

function drawLogo(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  alpha: number,
  scale: number,
) {
  if (alpha <= 0 || !img.complete || img.naturalWidth === 0) return;
  ctx.save();
  ctx.translate(SIZE / 2, SIZE / 2);
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, -SIZE / 2, -SIZE / 2, SIZE, SIZE);
  ctx.restore();
}

function renderFrameAt(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  t: number,
) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  if (t < STAMP_MS) {
    const p = clamp01(t / STAMP_MS);
    drawHankoBox(ctx, clamp01(p * 2.2), easeOutBack(p), 0);
    const letterP = clamp01((t - STAMP_MS * 0.55) / (STAMP_MS * 0.45));
    drawHankoLetter(
      ctx,
      easeOutCubic(letterP),
      0.7 + 0.3 * easeOutCubic(letterP),
      0,
      0,
    );
  } else if (t < STAMP_MS + HOLD_MS) {
    drawHankoBox(ctx, 1, 1, 0);
    drawHankoLetter(ctx, 1, 1, 0, 0);
  } else if (t < STAMP_MS + HOLD_MS + EXIT_MS) {
    const localT = (t - STAMP_MS - HOLD_MS) / EXIT_MS;
    const letterT = easeInCubic(localT);
    const boxT = easeInOutCubic(clamp01((localT - 0.12) / 0.88));
    drawHankoLetter(
      ctx,
      1 - letterT,
      1 + 0.06 * letterT,
      SIZE * 0.75 * letterT,
      0.22 * letterT,
    );
    drawHankoBox(ctx, 1 - boxT, 1 - 0.7 * boxT, -0.28 * boxT);
  } else if (t < TOTAL_MS) {
    const localT = (t - STAMP_MS - HOLD_MS - EXIT_MS) / REVEAL_MS;
    const e = easeOutCubic(localT);
    drawLogo(ctx, img, e, 0.72 + 0.28 * e);
  } else {
    drawLogo(ctx, img, 1, 1);
  }
}

export function AnimatedFavicon() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let linkEl: HTMLLinkElement | null = null;
    function ensureLink() {
      if (linkEl?.isConnected) return linkEl;
      document.head.querySelectorAll("link[rel*='icon']").forEach((n) => n.remove());
      linkEl = document.createElement("link");
      linkEl.rel = "icon";
      linkEl.type = "image/png";
      document.head.appendChild(linkEl);
      return linkEl;
    }
    function setHref(href: string) {
      ensureLink().href = href;
    }

    const logoImg = new Image();
    logoImg.src = "/brand/logo-mark.png";

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    function buildFrames(): string[] {
      if (!ctx) return [];
      const frames: string[] = new Array(FRAME_COUNT);
      for (let i = 0; i < FRAME_COUNT; i++) {
        renderFrameAt(ctx, logoImg, i * FRAME_MS);
        frames[i] = canvas.toDataURL("image/png");
      }
      renderFrameAt(ctx, logoImg, TOTAL_MS + 1);
      frames.push(canvas.toDataURL("image/png"));
      return frames;
    }

    function play(frames: string[]) {
      if (cancelled || frames.length === 0) return;
      setHref(frames[0]);
      let i = 1;
      intervalId = setInterval(() => {
        if (cancelled) {
          if (intervalId) clearInterval(intervalId);
          return;
        }
        setHref(frames[i]);
        i++;
        if (i >= frames.length) {
          if (intervalId) clearInterval(intervalId);
          intervalId = null;
        }
      }, FRAME_MS);
    }

    function staticOnly() {
      if (!ctx) return;
      renderFrameAt(ctx, logoImg, TOTAL_MS + 1);
      setHref(canvas.toDataURL("image/png"));
    }

    if (prefersReducedMotion) {
      if (logoImg.complete && logoImg.naturalWidth > 0) staticOnly();
      else logoImg.onload = staticOnly;
      return;
    }

    function startAfterLogoReady() {
      if (cancelled) return;
      const frames = buildFrames();
      play(frames);
    }

    if (logoImg.complete && logoImg.naturalWidth > 0) {
      startAfterLogoReady();
    } else {
      logoImg.onload = startAfterLogoReady;
      logoImg.onerror = () => {
        if (!ctx) return;
        renderFrameAt(ctx, logoImg, 0);
        setHref(canvas.toDataURL("image/png"));
      };
    }

    return () => {
      cancelled = true;
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, []);

  return null;
}
