import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  { q: "The solar fencing system installed by Solwas has been reliable and efficient. It provided the security we needed without dependence on grid power, and the installation was handled professionally.", n: "Vivek", l: "Nampally" },
  { q: "Solwas delivered a well-coordinated solution combining automation and security systems. Their structured approach and technical clarity gave us complete confidence.", n: "Shalini", l: "Banjara Hills" },
  { q: "Working with Solwas Interiors was a smooth experience. They understood our business requirements clearly and delivered a practical, elegant commercial interior within timelines. Highly reliable team.", n: "Sai Kiran Kasula", l: "Bachupally" },
  { q: "From the first discussion to final handover, Solwas Interiors handled everything perfectly. The design, quality and finish exceeded our expectations. Our space feels elegant, functional and truly ours.", n: "Surabhi", l: "Miyapur" },
];

const Testimonials = () => {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause) return;
    const t = setInterval(() => setI(v => (v + 1) % items.length), 5500);
    return () => clearInterval(t);
  }, [pause]);

  return (
    <section className="relative py-32 overflow-hidden noise">
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-30" />
      <div className="container mx-auto px-6 relative">
        <p className="font-italic text-gold tracking-[0.3em] text-xs uppercase mb-4 text-center">— Voices</p>
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">What clients <span className="italic gold-text">say</span>.</h2>

        <div className="max-w-3xl mx-auto" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              className="text-center">
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 fill-gold text-gold" />)}
              </div>
              <div className="font-serif text-gold text-7xl leading-none mb-4">"</div>
              <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-foreground/95">{items[i].q}</p>
              <div className="mt-8">
                <div className="text-gold font-medium">{items[i].n}</div>
                <div className="text-muted-foreground text-sm">{items[i].l}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-10">
            {items.map((_, k) => (
              <button key={k} onClick={() => setI(k)} data-cursor="link" className={`h-px transition-all ${i === k ? "w-12 bg-gold" : "w-6 bg-foreground/20"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
