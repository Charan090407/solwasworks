import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = () => {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let minTimePassed = false;
    let isLoaded = false;
    
    // Ensure the animation plays for at least 1.8 seconds
    const minTimer = setTimeout(() => {
      minTimePassed = true;
      if (isLoaded) setDone(true);
    }, 1800);

    // Track actual resources (images and videos)
    const trackResources = () => {
      const media = Array.from(document.querySelectorAll('img, video')) as (HTMLImageElement | HTMLVideoElement)[];
      let loadedCount = 0;
      
      if (media.length === 0) {
        setProgress(100);
        isLoaded = true;
        if (minTimePassed) setDone(true);
        return;
      }

      const checkDone = () => {
        loadedCount++;
        setProgress(Math.floor((loadedCount / media.length) * 100));
        if (loadedCount >= media.length) {
          isLoaded = true;
          if (minTimePassed) setDone(true);
        }
      };

      media.forEach(m => {
        if (m instanceof HTMLImageElement) {
          if (m.complete) checkDone();
          else {
            m.addEventListener('load', checkDone, { once: true });
            m.addEventListener('error', checkDone, { once: true });
          }
        } else if (m instanceof HTMLVideoElement) {
          if (m.readyState >= 3) checkDone();
          else {
            m.addEventListener('loadeddata', checkDone, { once: true });
            m.addEventListener('error', checkDone, { once: true });
          }
        }
      });
    };

    // Wait a tick for React to render children into the DOM
    setTimeout(trackResources, 100);

    // Fallback safeguard to never hang the site forever
    const fallbackTimer = setTimeout(() => {
      if (!isLoaded) {
        setProgress(100);
        isLoaded = true;
        if (minTimePassed) setDone(true);
      }
    }, 6000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);
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
        <div className="relative mt-4 mx-auto" style={{ width: "180px" }}>
          <motion.div
            className="absolute left-0 top-0 h-px bg-foreground/20 w-full"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-0 h-px bg-gold origin-left w-full"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold font-medium"
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Loader;
