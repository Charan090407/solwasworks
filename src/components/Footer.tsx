import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative pt-20 pb-8 bg-gradient-to-b from-background to-[hsl(0_0%_4%)] border-t border-border noise">
    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent origin-left" />
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 border border-gold rotate-45 flex items-center justify-center"><div className="w-2 h-2 bg-gold" /></div>
            <span className="font-serif text-2xl gold-text">Solwas</span>
          </div>
          <p className="mt-4 font-italic italic text-muted-foreground max-w-xs">"No Drama. Just Damn Good Interiors."</p>
        </div>
        <div className="md:text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Interiors", href: "/interiors" },
              { label: "Home Automation", href: "/smarthome" },
              { label: "Solar Fencing", href: "/solar-fencing" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" }
            ].map(l => (
              <li key={l.label}>
                {l.href.startsWith('#') ? (
                  <a href={l.href} data-cursor="link" className="text-foreground/70 hover:text-gold transition-colors">
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.href} data-cursor="link" className="text-foreground/70 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Follow</div>
          <div className="flex md:justify-end gap-4">
            {[Instagram, Linkedin, MessageCircle].map((I, i) => (
              <a key={i} href="#" data-cursor="link" className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-all hover:scale-110 hover:rotate-6">
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>© 2026 Solwas Private Limited. All rights reserved.</span>
        <span className="font-italic italic">Designed with precision in Hyderabad.</span>
      </div>
    </div>
  </footer>
);
export default Footer;
