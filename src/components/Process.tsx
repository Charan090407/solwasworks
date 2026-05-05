import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Requirement Discovery", desc: "We deep-dive into client needs, functional requirements, budget alignment, timelines and site conditions to set clear expectations from day one." },
  { n: "02", title: "Design & Technical Alignment", desc: "Designs, drawings and technical specifications are reviewed, coordinated and finalised to ensure they're execution-ready with no on-site surprises." },
  { n: "03", title: "Planning & Procurement", desc: "Detailed schedules are prepared, materials finalised, vendors coordinated and the site readied for smooth execution." },
  { n: "04", title: "Execution & Quality Control", desc: "On-site works are carried out with strict supervision, quality checks, safety compliance and continuous progress monitoring." },
];

const Process = () => (
  <section id="process" className="relative py-32 noise overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl mb-20">
        <p className="font-italic text-gold tracking-[0.3em] text-xs uppercase mb-4">— The Journey</p>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">Built with <span className="italic gold-text">precision</span>, delivered without drama.</h2>
      </motion.div>

      <div className="relative grid md:grid-cols-4 gap-10">
        <div className="hidden md:block absolute top-12 left-0 right-0 h-px">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-r from-transparent via-gold to-transparent origin-left" />
        </div>
        {steps.map((s, i) => (
          <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}>
            <div className="relative w-12 h-12 rounded-full border border-gold flex items-center justify-center bg-background mb-6">
              <span className="font-serif text-gold">{s.n}</span>
            </div>
            <h3 className="font-serif text-xl mb-3">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default Process;
