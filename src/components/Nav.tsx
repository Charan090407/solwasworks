import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
        <div className="absolute inset-0 backdrop-blur-xl bg-background/70 border-b border-border/50" />
        <nav className="relative h-full container mx-auto flex items-center justify-between px-6">
          <a href="#home" className="flex items-center gap-2 group" data-cursor="link">
            <div className="w-7 h-7 border border-gold rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-gold" />
            </div>
            <span className="font-serif text-xl gold-text tracking-wide">Solwas</span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link" data-cursor="link">{l.label}</a>
            ))}
          </div>
          <a
            href="#contact"
            data-cursor="link"
            className="hidden md:inline-flex items-center px-5 py-2.5 text-xs uppercase tracking-[0.2em] border border-gold text-gold rounded-full hover:bg-gold hover:text-primary-foreground transition-all duration-300 hover:scale-[1.04]"
          >
            Get a Quote
          </a>
          <button onClick={() => setOpen(true)} className="md:hidden text-foreground" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="w-7 h-7 text-gold" /></button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href} href={l.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="font-serif text-4xl text-foreground hover:text-gold transition-colors"
                >{l.label}</motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Nav;
