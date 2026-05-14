import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
  color?: string;
}

// Global emitter so other components can trigger ripples programmatically
type RippleEmitFn = (x: number, y: number, color?: string) => void;
let globalEmit: RippleEmitFn | null = null;

export const emitRipple = (x: number, y: number, color?: string) => {
  globalEmit?.(x, y, color);
};

const RippleMark = ({ ripple, onDone }: { ripple: Ripple; onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  const ring = ripple.color ?? "hsl(43 52% 54%)";

  return (
    <div className="absolute pointer-events-none" style={{ left: ripple.x, top: ripple.y }}>
      {/* Core splash */}
      <motion.div
        initial={{ scale: 0, opacity: 0.9 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ background: ring }}
        className="absolute -ml-3 -mt-3 h-6 w-6 rounded-full blur-[2px]"
      />
      {/* Inner ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0.75 }}
        animate={{ scale: 4.5, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.04 }}
        className="absolute -ml-10 -mt-10 h-20 w-20 rounded-full border-[2.5px]"
        style={{ borderColor: ring, boxShadow: `0 0 18px ${ring}66` }}
      />
      {/* Middle ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 7, opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.12 }}
        className="absolute -ml-10 -mt-10 h-20 w-20 rounded-full border-[1.5px]"
        style={{ borderColor: ring, boxShadow: `0 0 8px ${ring}44` }}
      />
      {/* Outer ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0.25 }}
        animate={{ scale: 10, opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.22 }}
        className="absolute -ml-10 -mt-10 h-20 w-20 rounded-full border-[1px]"
        style={{ borderColor: ring }}
      />
    </div>
  );
};

export const WaterDropletEffect = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = useCallback((x: number, y: number, color?: string) => {
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y, color }]);
  }, []);

  // Register global emitter
  useEffect(() => {
    globalEmit = addRipple;
    return () => { globalEmit = null; };
  }, [addRipple]);

  // Cursor click listener
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      addRipple(e.clientX, e.clientY);
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [addRipple]);

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((r) => (
          <RippleMark key={r.id} ripple={r} onDone={() => removeRipple(r.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};
