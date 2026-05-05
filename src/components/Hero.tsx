import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";

const Hero = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      imgRef.current.style.transform = `translate3d(${-x}px, ${-y}px, 0) scale(1.08)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden noise pt-20">
      <div className="absolute inset-0 -z-10">
        <div ref={imgRef} className="absolute inset-0 transition-transform duration-300 ease-out">
          <img src={heroImg} alt="Luxury interior design" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
          className="font-italic text-gold tracking-[0.3em] text-xs uppercase mb-6"
        >
          — Hyderabad's Premium Interior Studio
        </motion.p>

        <h1 className="font-serif text-5xl sm:text-7xl lg:text-[6.5rem] leading-[1.02] tracking-tight max-w-5xl">
          {["No Drama.", "Just Damn Good", "Interiors."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {i === 1 ? <>Just <span className="shimmer italic">Damn Good</span></> : line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 max-w-xl text-muted-foreground text-base md:text-lg leading-relaxed"
        >
          End-to-End Turnkey Interiors, Home Automation & Solar Fencing — engineered with precision, finished with soul.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#works" data-cursor="link" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-primary-foreground text-sm tracking-wide font-medium hover:shadow-gold hover:scale-[1.04] transition-all duration-300">
            Explore Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" data-cursor="link" className="inline-flex items-center px-7 py-4 rounded-full border border-gold/60 text-gold text-sm tracking-wide hover:bg-gold hover:text-primary-foreground transition-all duration-300 hover:scale-[1.04]">
            Get a Free Quote
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm"
        >
          {[["100+", "Projects"], ["50+", "Experts"], ["99%", "Satisfaction"], ["Since 2020", ""]].map(([n, l], i, a) => (
            <div key={i} className="flex items-center gap-8">
              <div>
                <span className="font-serif text-2xl text-foreground">{n}</span>
                {l && <span className="ml-2 text-muted-foreground font-italic italic">{l}</span>}
              </div>
              {i < a.length - 1 && <span className="hidden sm:block w-px h-5 bg-gold/40" />}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold" />
        <ChevronDown className="w-4 h-4 text-gold animate-bounce" />
      </motion.div>
    </section>
  );
};
export default Hero;
