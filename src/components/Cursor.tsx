import { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "link" | "explore">("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move);

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [role=button], input, textarea, select, [data-cursor]");
      if (!interactive) { setVariant("default"); setLabel(""); return; }
      const cur = interactive.getAttribute("data-cursor");
      if (cur === "explore") { setVariant("explore"); setLabel("EXPLORE"); }
      else { setVariant("link"); setLabel(""); }
    };
    window.addEventListener("mouseover", over);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          width: variant === "default" ? 36 : 64,
          height: variant === "default" ? 36 : 64,
          marginLeft: variant === "default" ? 0 : -14,
          marginTop: variant === "default" ? 0 : -14,
          border: "1.5px solid hsl(var(--gold))",
          background: variant === "link" ? "hsl(var(--gold) / 0.18)" : "hsl(var(--gold) / 0.08)",
          mixBlendMode: "normal",
        }}
      >
        {label && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] tracking-[0.2em] text-gold font-medium">
            {label}
          </span>
        )}
      </div>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block w-1.5 h-1.5 rounded-full bg-gold" />
    </>
  );
};

export default Cursor;
