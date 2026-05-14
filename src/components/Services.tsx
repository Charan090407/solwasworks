import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { ArrowUpRight, Diamond, Cpu, Sun, RotateCcw } from "lucide-react";

const services = [
  {
    icon: Diamond,
    title: "Interiors",
    desc: "Comprehensive turnkey interior services with single-point accountability from concept to completion. We align design coordination, procurement, execution, quality control and safety compliance — interiors built to perform.",
    chips: ["Residential", "Commercial", "Turnkey", "Design-Build"],
    accent: "from-amber-500/10 to-yellow-600/5",
    backAccent: "from-amber-500/20 via-yellow-600/10 to-amber-900/20",
    backHighlight: "hsl(43 70% 60%)",
  },
  {
    icon: Cpu,
    title: "Home Automation",
    desc: "Intelligent automation that integrates lighting, climate, security and smart devices into a unified platform — built for reliability, energy efficiency and a truly connected living experience.",
    chips: ["Smart Lighting", "Climate Control", "Security", "Voice Control"],
    accent: "from-blue-500/10 to-cyan-600/5",
    backAccent: "from-blue-500/20 via-cyan-600/10 to-blue-900/20",
    backHighlight: "hsl(200 70% 60%)",
  },
  {
    icon: Sun,
    title: "Solar Fencing",
    desc: "Solar-powered perimeter security combining durable fencing infrastructure with sustainable energy. Ideal for industrial, commercial, agricultural and institutional sites — zero grid dependence.",
    chips: ["Industrial", "Agricultural", "Zero Grid", "Low Maintenance"],
    accent: "from-orange-500/10 to-amber-600/5",
    backAccent: "from-orange-500/20 via-amber-600/10 to-orange-900/20",
    backHighlight: "hsl(28 80% 60%)",
  },
];

// 3D tilt card — disabled when flipped
const TiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const shine = useMotionValue(0);
  const shineX = useMotionValue(0);
  const shineY = useMotionValue(0);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-ny * 7);
    rotY.set(nx * 7);
    shineX.set(((e.clientX - rect.left) / rect.width) * 100);
    shineY.set(((e.clientY - rect.top) / rect.height) * 100);
    shine.set(0.06);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
    shine.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: useTransform(
            [shineX, shineY, shine],
            ([sx, sy, s]) =>
              `radial-gradient(circle at ${sx}% ${sy}%, hsl(43 60% 80% / ${s}) 0%, transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
};

// Individual flippable card
const FlipCard = ({ s, i }: { s: (typeof services)[0]; i: number }) => {
  const [flipped, setFlipped] = useState(true);

  const toggle = () => setFlipped((f) => !f);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      // Perspective container
      style={{ perspective: "1200px" }}
    >
      <TiltCard>
        {/* ── Flip wrapper ── */}
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d", position: "relative" }}
          className="w-full"
        >
          {/* ════ FRONT FACE ════ */}
          <div
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            onClick={toggle}
            data-cursor="explore"
            className={`group relative grid md:grid-cols-12 gap-6 md:gap-12 items-start p-8 md:p-12 rounded-2xl bg-surface/60 border border-border hover:border-gold/40 transition-all duration-500 overflow-hidden cursor-pointer select-none`}
          >
            {/* Gradient bg on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
            />
            <div className="absolute inset-0 bg-gradient-radial-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Flip hint badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.12 }}
              className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] text-muted-foreground/60 border border-border/50 rounded-full px-2.5 py-1 bg-background/40 backdrop-blur-sm"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              tap to flip
            </motion.div>

            {/* Number + icon */}
            <div className="md:col-span-1 relative">
              <div
                className="w-14 h-14 rounded-xl border border-gold/40 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/60 transition-all duration-300"
                style={{ transform: "translateZ(20px)" }}
              >
                <s.icon className="w-6 h-6 text-gold" />
              </div>
              <span className="absolute -top-2 -left-2 font-serif text-xs text-muted-foreground">
                0{i + 1}
              </span>
            </div>

            {/* Title + desc */}
            <div
              className="md:col-span-7 relative"
              style={{ transform: "translateZ(10px)" }}
            >
              <h3 className="font-serif text-3xl md:text-5xl mb-4 group-hover:translate-x-1.5 transition-transform duration-500">
                {s.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{s.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <motion.span
                    key={c}
                    whileHover={{ scale: 1.05, borderColor: "hsl(43 52% 54% / 0.5)" }}
                    className="px-3 py-1 text-xs rounded-full border border-border bg-background/50 text-foreground/80 cursor-default"
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="md:col-span-4 flex md:justify-end relative"
              style={{ transform: "translateZ(15px)" }}
            >
              <motion.a
                href="#contact"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-sm text-gold group-hover:gap-4 transition-all"
                whileHover={{ x: 4 }}
              >
                Explore {s.title} <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* ════ BACK FACE ════ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              inset: 0,
            }}
            onClick={toggle}
            className={`relative flex flex-col justify-between p-8 md:p-12 rounded-2xl border border-gold/30 overflow-hidden cursor-pointer select-none`}
          >
            {/* Back ambient gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${s.backAccent}`}
            />

            {/* Decorative geometric ring */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[380px] h-[380px] rounded-full border opacity-10"
              style={{ borderColor: s.backHighlight }}
            />
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[260px] h-[260px] rounded-full border opacity-15"
              style={{ borderColor: s.backHighlight }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Index */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="font-serif text-7xl md:text-9xl font-bold leading-none opacity-10 select-none"
                  style={{ color: s.backHighlight }}
                >
                  0{i + 1}
                </span>
                <motion.div
                  animate={{ rotate: flipped ? 360 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-12 h-12 rounded-full border flex items-center justify-center"
                  style={{ borderColor: `${s.backHighlight}60` }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.backHighlight }} />
                </motion.div>
              </div>

              {/* Big title */}
              <div className="mb-8">
                <p
                  className="text-[10px] uppercase tracking-[0.4em] mb-3 font-mono"
                  style={{ color: `${s.backHighlight}99` }}
                >
                  — Service
                </p>
                <h3
                  className="font-serif leading-none"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    color: s.backHighlight,
                    textShadow: `0 0 60px ${s.backHighlight}44`,
                  }}
                >
                  {s.title}
                </h3>
              </div>

              {/* Chips as prominent headers */}
              <div className="grid grid-cols-2 gap-3">
                {s.chips.map((c, ci) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 1, x: 0 }}
                    animate={flipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: flipped ? 0 : 0, duration: 0.4 }}
                    className="flex items-center gap-2 group/chip"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: s.backHighlight }}
                    />
                    <span
                      className="text-sm md:text-base font-medium tracking-wide"
                      style={{ color: `${s.backHighlight}cc` }}
                    >
                      {c}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Flip-back hint */}
              <div className="mt-8 flex items-center gap-2 text-[10px] opacity-50" style={{ color: s.backHighlight }}>
                <RotateCcw className="w-3 h-3" />
                tap to flip back
              </div>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

const Services = () => (
  <section id="services" className="relative py-32 noise overflow-hidden">
    {/* Section ambient glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, hsl(43 52% 54% / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>

    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mb-20"
      >
        <p className="font-italic text-gold tracking-[0.3em] text-xs uppercase mb-4 flex items-center gap-3">
          <span className="w-6 h-px bg-gold/60 inline-block" />— Three Pillars
        </p>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Crafted across <span className="italic gold-text">three</span> disciplines.
        </h2>
      </motion.div>

      <div className="space-y-6">
        {services.map((s, i) => (
          <FlipCard key={s.title} s={s} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;