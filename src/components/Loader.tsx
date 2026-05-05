import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = () => {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1800); return () => clearTimeout(t); }, []);
  const letters = "SOLWAS".split("");

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={done ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
      className="fixed inset-0 z-[10000] bg-background flex items-center justify-center pointer-events-none"
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      <div className="text-center">
        <div className="flex justify-center gap-1 md:gap-2 overflow-hidden">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl md:text-7xl text-foreground tracking-[0.15em]"
            >
              {l}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 h-px bg-gold origin-left mx-auto"
          style={{ width: "180px" }}
        />
      </div>
    </motion.div>
  );
};
export default Loader;
