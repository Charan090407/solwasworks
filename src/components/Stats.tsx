import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const dur = 1800; const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      s = Math.round(to * (1 - Math.pow(1 - p, 3)));
      setN(s);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
};

const stats = [
  { n: 100, suffix: "+", label: "Projects Delivered" },
  { n: 50, suffix: "+", label: "Skilled Experts" },
  { n: 99, suffix: "%", label: "Client Satisfaction" },
  { n: 17, suffix: "+", label: "Specialised Services" },
];
const partners = ["Google", "Amazon Alexa", "Apple HomeKit", "Schneider", "Philips Hue", "Bosch", "Sony", "Samsung"];

const Stats = () => (
  <section id="stats" className="relative py-24 border-y border-border overflow-hidden noise">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 divide-x divide-gold/20">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="px-6 text-center first:border-l-0 md:border-l border-gold/20"
          >
            <div className="font-serif text-5xl md:text-6xl gold-text"><Counter to={s.n} suffix={s.suffix} /></div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
    <div className="mt-20 overflow-hidden">
      <div className="marquee">
        {[...partners, ...partners].map((p, i) => (
          <span key={i} className="font-serif text-2xl md:text-3xl text-muted-foreground/60 whitespace-nowrap">{p} <span className="text-gold/40 ml-16">✦</span></span>
        ))}
      </div>
    </div>
  </section>
);
export default Stats;
