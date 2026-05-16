import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", id: "home", href: "#home" },
  { label: "Services", id: "services", href: "#services" },
  { label: "Process", id: "process", href: "#process" },
  { label: "Reviews", id: "reviews", href: "#reviews" },
  { label: "About", id: "about", href: "#about" },
  { label: "Contact", id: "contact", href: "#contact" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      const sectionsToCheck = [...NAV_LINKS.map(l => l.id), "stats"];
      
      let current = "home";
      sectionsToCheck.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = id === "stats" ? "services" : id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-6 inset-x-0 mx-auto z-50 flex justify-center px-4 md:px-6 transition-all duration-500`}>
        <div className={`relative w-full max-w-7xl rounded-full border border-white/10 transition-all duration-500 overflow-hidden ${scrolled ? "backdrop-blur-xl bg-black/60 shadow-2xl" : "backdrop-blur-md bg-white/10"}`}>
          <nav className="relative flex items-center justify-between px-6 py-4 md:px-8">
            <a href="#home" className="flex items-center gap-2 group" data-cursor="link">
              <span className="font-instrument text-3xl tracking-tight text-white">Solwas</span>
            </a>
            
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((l) => {
                const isActive = activeSection === l.id;
                return (
                  <a 
                    key={l.id} 
                    href={l.href} 
                    className={`relative text-sm transition-colors duration-300 font-inter ${isActive ? "text-[#c8a44a]" : "text-white/70 hover:text-white"}`} 
                    data-cursor="link"
                  >
                    {l.label}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#c8a44a]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>
            
            <a
              href="#contact"
              data-cursor="link"
              className="hidden md:inline-flex items-center px-6 py-2.5 text-sm bg-white text-black rounded-full hover:scale-[1.03] transition-transform duration-300 font-inter"
            >
              Get a Quote
            </a>
            
            <button onClick={() => setOpen(true)} className="md:hidden text-white" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="w-7 h-7 text-white" /></button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((l, i) => {
                const isActive = activeSection === l.id;
                return (
                  <motion.a
                    key={l.id} href={l.href} onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className={`font-instrument text-4xl transition-colors ${isActive ? "text-[#c8a44a]" : "text-white/60 hover:text-white"}`}
                  >{l.label}</motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Nav;
