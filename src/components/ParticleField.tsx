import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; depth: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 90;
    const CONNECTION_DIST = 130;
    const GOLD = { r: 191, g: 154, b: 78 }; // hsl(43 52% 54%)

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // Create particles with depth layers
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const depth = Math.random(); // 0 = far, 1 = close
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (0.15 + depth * 0.25),
        vy: (Math.random() - 0.5) * (0.15 + depth * 0.25),
        size: 0.4 + depth * 1.8,
        opacity: 0.08 + depth * 0.28,
        depth,
      };
    });

    let frame = 0;
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update positions + subtle mouse repulsion
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.4 * p.depth;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        // Wrap edges
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]; const b = particles[j];
          const dx = a.x - b.x; const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / CONNECTION_DIST) * 0.04 * Math.min(a.depth, b.depth);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        // Soft outer glow for close particles
        if (p.depth > 0.6) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
          grad.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${p.opacity * 0.4})`);
          grad.addColorStop(1, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${p.opacity})`;
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ mixBlendMode: "screen" }}
      aria-hidden
    />
  );
};

export default ParticleField;
