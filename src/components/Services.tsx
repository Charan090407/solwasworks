import { motion } from "framer-motion";
import { ArrowUpRight, Diamond, Cpu, Sun } from "lucide-react";

const services = [
  {
    icon: Diamond,
    title: "Interiors",
    desc: "Comprehensive turnkey interior services with single-point accountability from concept to completion. We align design coordination, procurement, execution, quality control and safety compliance — interiors built to perform.",
    chips: ["Residential", "Commercial", "Turnkey", "Design-Build"],
  },
  {
    icon: Cpu,
    title: "Home Automation",
    desc: "Intelligent automation that integrates lighting, climate, security and smart devices into a unified platform — built for reliability, energy efficiency and a truly connected living experience.",
    chips: ["Smart Lighting", "Climate Control", "Security", "Voice Control"],
  },
  {
    icon: Sun,
    title: "Solar Fencing",
    desc: "Solar-powered perimeter security combining durable fencing infrastructure with sustainable energy. Ideal for industrial, commercial, agricultural and institutional sites — zero grid dependence.",
    chips: ["Industrial", "Agricultural", "Zero Grid", "Low Maintenance"],
  },
];

const Services = () => (
  <section id="services" className="relative py-32 noise overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.8 }} className="max-w-2xl mb-20"
      >
        <p className="font-italic text-gold tracking-[0.3em] text-xs uppercase mb-4">— Three Pillars</p>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Crafted across <span className="italic gold-text">three</span> disciplines.
        </h2>
      </motion.div>

      <div className="space-y-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            data-cursor="explore"
            className="group relative grid md:grid-cols-12 gap-6 md:gap-12 items-start p-8 md:p-12 rounded-2xl bg-surface/60 border border-border hover:border-gold/40 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-radial-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="md:col-span-1 relative">
              <div className="w-14 h-14 rounded-xl border border-gold/40 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                <s.icon className="w-6 h-6 text-gold" />
              </div>
              <span className="absolute -top-2 -left-2 font-serif text-xs text-muted-foreground">0{i + 1}</span>
            </div>
            <div className="md:col-span-7 relative">
              <h3 className="font-serif text-3xl md:text-5xl mb-4 group-hover:translate-x-1 transition-transform duration-500">
                {s.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{s.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <span key={c} className="px-3 py-1 text-xs rounded-full border border-border bg-background/50 text-foreground/80">{c}</span>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 flex md:justify-end relative">
              <a href="#contact" className="inline-flex items-center gap-2 text-sm text-gold group-hover:gap-4 transition-all">
                Explore {s.title} <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default Services;
