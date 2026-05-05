import { motion } from "framer-motion";

const team = [
  { n: "P. Abhimanyu", r: "Designing & Execution", initials: "PA" },
  { n: "Anil Kumar", r: "Business & Operations Head", initials: "AK" },
  { n: "Gummadi Sandeep", r: "Electrical Head", initials: "GS" },
  { n: "Bella Lalitha", r: "Managing Director", initials: "BL" },
];

const Team = () => (
  <section id="about" className="relative py-32 noise">
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl mb-20">
        <p className="font-italic text-gold tracking-[0.3em] text-xs uppercase mb-4">— The People</p>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">A team that <span className="italic gold-text">delivers</span>.</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((m, i) => (
          <motion.div key={m.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
            data-cursor="link" className="group text-center hover-lift cursor-pointer">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border border-gold/30 group-hover:border-gold group-hover:shadow-gold transition-all duration-500" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-surface-elevated to-surface flex items-center justify-center">
                <span className="font-serif text-3xl gold-text">{m.initials}</span>
              </div>
            </div>
            <h3 className="font-serif text-lg">{m.n}</h3>
            <p className="font-italic italic text-gold text-sm mt-1">{m.r}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default Team;
