import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ScrollVelocityBannerProps {
  text: string;
  baseSpeed?: number; // px/s at rest
  className?: string;
}

const ScrollVelocityBanner = ({ text, baseSpeed = 45, className = "" }: ScrollVelocityBannerProps) => {
  const scrollVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-2000, 0, 2000], [-3.5, 1, 3.5]);

  // Duplicated text for seamless loop
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${v % 50}%`);

  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const dt = now - lastTime.current;
      const dY = window.scrollY - lastScrollY.current;
      if (dt > 0) scrollVelocity.set((dY / dt) * 1000);
      lastScrollY.current = window.scrollY;
      lastTime.current = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let prev = performance.now();
    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const dt = (now - prev) / 1000;
      prev = now;
      const speed = baseSpeed * velocityFactor.get();
      baseX.set(baseX.get() - speed * dt * 0.01);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseSpeed]);

  const repeated = Array(8).fill(text).join(" ✦ ");

  return (
    <div className={`relative overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x }} className="inline-block will-change-transform">
        <span>{repeated} ✦ {repeated}</span>
      </motion.div>
    </div>
  );
};

export default ScrollVelocityBanner;
