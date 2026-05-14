import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", title: "Requirement Discovery", desc: "We deep-dive into client needs, functional requirements, budget alignment, timelines and site conditions to set clear expectations from day one." },
  { n: "02", title: "Design & Technical Alignment", desc: "Designs, drawings and technical specifications are reviewed, coordinated and finalised to ensure they're execution-ready with no on-site surprises." },
  { n: "03", title: "Planning & Procurement", desc: "Detailed schedules are prepared, materials finalised, vendors coordinated and the site readied for smooth execution." },
  { n: "04", title: "Execution & Quality Control", desc: "On-site works are carried out with strict supervision, quality checks, safety compliance and continuous progress monitoring." },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      key={step.n}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Vertical connector line on mobile */}
      {index < steps.length - 1 && (
        <div className="md:hidden absolute left-6 top-16 w-px h-full bg-gradient-to-b from-gold/30 to-transparent" />
      )}

      {/* Number circle */}
      <div className="relative w-12 h-12 rounded-full border border-gold flex items-center justify-center bg-background mb-6 group-hover:bg-gold/10 group-hover:border-gold group-hover:shadow-gold transition-all duration-500 z-10">
        <span className="font-serif text-gold text-sm">{step.n}</span>
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border border-gold/30 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
      </div>

      {/* Card content */}
      <motion.div
        className="p-6 rounded-xl bg-surface/40 border border-border group-hover:border-gold/25 transition-all duration-500 glow-on-hover"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h3 className="font-serif text-xl mb-3 group-hover:text-gold/90 transition-colors duration-300">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
      </motion.div>
    </motion.div>
  );
};

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section ref={sectionRef} id="process" className="relative py-32 noise overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, hsl(43 52% 54% / 0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }} className="max-w-2xl mb-20"
        >
          <p className="font-italic text-gold tracking-[0.3em] text-xs uppercase mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-gold/60 inline-block" />— The Journey
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            Built with <span className="italic gold-text">precision</span>, delivered without drama.
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-4 gap-10">
          {/* Animated timeline bar */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px">
            <div className="h-full w-full bg-border/50" />
            <motion.div
              className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-gold to-transparent origin-left"
              style={{ scaleX: lineScaleX }}
            />
          </div>

          {steps.map((s, i) => <StepCard key={s.n} step={s} index={i} />)}
        </div>
      </div>
    </section>
  );
};
export default Process;