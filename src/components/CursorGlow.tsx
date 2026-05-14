import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorGlow = () => {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 60, damping: 28 });
  const sy = useSpring(y, { stiffness: 60, damping: 28 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-[2] hidden md:block"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, hsl(43 52% 54% / 0.055) 0%, transparent 70%)",
        filter: "blur(20px)",
      }}
      aria-hidden
    />
  );
};

export default CursorGlow;
