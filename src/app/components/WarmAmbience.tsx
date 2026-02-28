"use client";
import { useEffect, useRef, useCallback } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

function getTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export default function WarmAmbience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<"light" | "dark">("light");
  const sparksRef = useRef<Spark[]>([]);

  const updateCursorGradient = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (themeRef.current === "dark") {
      cursor.style.background =
        "radial-gradient(circle, rgba(240, 128, 112, 0.12) 0%, rgba(240, 128, 112, 0.05) 40%, transparent 70%)";
    } else {
      cursor.style.background =
        "radial-gradient(circle, rgba(247, 96, 69, 0.1) 0%, rgba(255, 160, 120, 0.05) 40%, transparent 70%)";
    }
  }, []);

  // Watch for theme changes
  useEffect(() => {
    themeRef.current = getTheme();
    updateCursorGradient();

    const observer = new MutationObserver(() => {
      themeRef.current = getTheme();
      updateCursorGradient();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [updateCursorGradient]);

  // Click sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnSparks = (e: MouseEvent) => {
      // Skip if clicking on a link or inside a link
      const target = e.target as HTMLElement;
      if (target.closest("a")) return;

      const sparks = sparksRef.current;
      const count = 5 + Math.floor(Math.random() * 3);

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const speed = 0.5 + Math.random() * 1.2;
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5,
          opacity: 0.35 + Math.random() * 0.2,
          life: 0,
          maxLife: 45 + Math.random() * 25,
        });
      }
    };

    window.addEventListener("click", spawnSparks);

    let animationId: number;
    let running = false;

    const animate = () => {
      const sparks = sparksRef.current;

      if (sparks.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        running = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = themeRef.current === "dark";

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02;
        s.vx *= 0.97;
        s.vy *= 0.97;

        const progress = s.life / s.maxLife;
        s.opacity = Math.max(0, (1 - progress) * 0.9);

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        const r = isDark ? 240 : 217;
        const g = isDark ? 128 : 86;
        const b = isDark ? 112 : 59;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${s.opacity})`;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
      }

      animationId = requestAnimationFrame(animate);
    };

    // Only run animation loop when there are sparks
    const onClickStart = () => {
      if (!running) {
        running = true;
        animationId = requestAnimationFrame(animate);
      }
    };
    window.addEventListener("click", onClickStart);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", spawnSparks);
      window.removeEventListener("click", onClickStart);
    };
  }, []);

  // Cursor warmth
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = "1";
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
      />
    </>
  );
}
