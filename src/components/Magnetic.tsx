import { useRef, useState, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

const Magnetic = ({ children, strength = 0.35, className = "" }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });
  const scale = useSpring(1, { stiffness: 250, damping: 22 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onEnter = () => { setHovered(true); scale.set(1.04); };
  const onLeave = () => { setHovered(false); x.set(0); y.set(0); scale.set(1); };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, scale }}
      className={`inline-block ${className}`}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
