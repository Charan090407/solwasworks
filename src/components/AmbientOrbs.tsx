import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface OrbProps {
  x: number; y: number; w: number; h: number;
  color: string; opacity: number;
  floatX?: number; floatY?: number; duration?: number;
  parallaxStrength?: number;
}

const Orb = ({ x, y, w, h, color, opacity, floatX = 30, floatY = 40, duration = 14, parallaxStrength = 30 }: OrbProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 12, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 12, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * parallaxStrength;
      const ny = (e.clientY / window.innerHeight - 0.5) * parallaxStrength;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [parallaxStrength]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`, top: `${y}%`,
        width: w, height: h,
        background: `radial-gradient(ellipse, ${color} 0%, transparent 68%)`,
        x: springX,
        y: springY,
      }}
      animate={{
        x: [springX.get(), springX.get() + floatX, springX.get() - floatX * 0.5, springX.get()],
        y: [springY.get(), springY.get() - floatY, springY.get() + floatY * 0.6, springY.get()],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

const AmbientOrbs = ({ className = "fixed inset-0 z-0" }: { className?: string }) => (
  <div className={`pointer-events-none ${className} overflow-hidden`} aria-hidden>
    {/* Gold — top left warm glow */}
    <Orb x={-8} y={-5} w={900} h={700} color="hsl(43 60% 54% / 0.10)" opacity={0.10} floatX={35} floatY={45} duration={16} parallaxStrength={28} />
    {/* Blue — right side cool contrast */}
    <Orb x={70} y={15} w={700} h={600} color="hsl(220 60% 65% / 0.07)" opacity={0.07} floatX={-25} floatY={35} duration={20} parallaxStrength={18} />
    {/* Purple — bottom center depth */}
    <Orb x={25} y={65} w={800} h={700} color="hsl(270 45% 55% / 0.06)" opacity={0.06} floatX={20} floatY={-30} duration={18} parallaxStrength={22} />
    {/* Warm amber — mid-right accent */}
    <Orb x={60} y={50} w={500} h={500} color="hsl(35 70% 50% / 0.08)" opacity={0.08} floatX={-40} floatY={20} duration={13} parallaxStrength={35} />
    {/* Subtle teal — bottom left */}
    <Orb x={-5} y={70} w={600} h={500} color="hsl(180 40% 50% / 0.04)" opacity={0.04} floatX={30} floatY={-20} duration={22} parallaxStrength={14} />
    {/* Gold pulse — center hero highlight */}
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: "30%", top: "10%", width: 400, height: 400, background: "radial-gradient(circle, hsl(43 52% 54% / 0.06) 0%, transparent 70%)" }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.14, 0.06] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export default AmbientOrbs;
