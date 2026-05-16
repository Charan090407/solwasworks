import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

interface FieldProps {
  label: string;
  type?: string;
  as?: "input" | "textarea";
  value: string;
  onChange: (val: string) => void;
  error?: boolean;
}

const Field = ({ label, type = "text", as = "input", value, onChange, error }: FieldProps) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  const borderClass = error ? "border-destructive focus:border-destructive" : "border-border focus:border-gold";
  const labelColor = error ? "text-destructive" : active ? "text-gold" : "text-muted-foreground";
  const sharedClass = `w-full bg-transparent border-b ${borderClass} pt-5 pb-2 outline-none transition-colors text-foreground resize-none`;
  return (
    <div className="relative">
      <label className={`absolute left-0 pointer-events-none transition-all duration-300 ${active || error ? `top-0 text-[10px] tracking-[0.2em] uppercase ${labelColor}` : `top-4 text-sm ${labelColor}`}`}>
        {label} {error && <span className="ml-1 text-destructive normal-case tracking-normal">- Required</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          rows={3}
          className={sharedClass}
        />
      ) : (
        <input
          type={type} value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={sharedClass}
        />
      )}
    </div>
  );
};

// Magnetic submit button
const MagneticSubmit = ({ label }: { label: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      type="submit"
      data-cursor="link"
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      className="relative px-7 py-4 rounded-full bg-gold text-primary-foreground text-sm tracking-wide font-medium overflow-hidden group"
    >
      {/* Shimmer sweep */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      {/* Glow */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{ boxShadow: ["0 0 0px 0px hsl(43 52% 54% / 0)", "0 0 30px 8px hsl(43 52% 54% / 0.3)", "0 0 0px 0px hsl(43 52% 54% / 0)"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <span className="relative">{label}</span>
    </motion.button>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", type: "", msg: "" });
  const [errors, setErrors] = useState({ name: false, phone: false });

  const set = (k: string) => (v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (k === 'name' || k === 'phone') {
      setErrors(e => ({ ...e, [k]: false }));
    }
  };
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-reactive form glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const onFormMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 noise overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-20" />
      {/* Light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="light-streak top-1/4" />
        <div className="light-streak top-1/2" />
        <div className="light-streak top-3/4" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }} className="max-w-2xl mb-16"
        >
          <p className="font-italic text-gold tracking-[0.3em] text-xs uppercase mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-gold/60 inline-block" />— Begin
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            Let's build something <span className="italic gold-text">extraordinary</span>.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.form
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onMouseMove={onFormMove}
            onSubmit={(e) => {
              e.preventDefault();
              const newErrors = {
                name: !form.name.trim(),
                phone: !form.phone.trim(),
              };
              setErrors(newErrors);

              if (newErrors.name || newErrors.phone) {
                toast.error("Please provide your Name and Phone Number.");
                return;
              }

              const body = `Name: ${form.name}%0D%0APhone: ${form.phone}%0D%0AEmail: ${form.email}%0D%0AService: ${form.service}%0D%0AProject Type: ${form.type}%0D%0AMessage: ${form.msg}`;
              window.location.href = `mailto:mcharanyadav09358@gmail.com?subject=New Consultation Request from ${form.name}&body=${body}`;

              toast.success("Opening your mail client...");
              setForm({ name: "", phone: "", email: "", service: "", type: "", msg: "" });
            }}
            className="lg:col-span-3 space-y-8 p-8 md:p-10 rounded-2xl bg-surface/60 border border-border relative overflow-hidden cursor-glow-container"
            style={{
              background: "hsl(0 0% 9% / 0.7)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Cursor glow inside form */}
            <motion.div
              className="pointer-events-none absolute rounded-full"
              style={{
                left: mouseX,
                top: mouseY,
                translateX: "-50%",
                translateY: "-50%",
                width: 350,
                height: 350,
                background: "radial-gradient(circle, hsl(43 52% 54% / 0.05) 0%, transparent 70%)",
              }}
            />

            <div className="grid sm:grid-cols-2 gap-8 relative z-10">
              <Field label="Full Name" value={form.name} onChange={set("name")} error={errors.name} />
              <Field label="Phone Number" value={form.phone} onChange={set("phone")} error={errors.phone} />
            </div>
            <Field label="Email" type="email" value={form.email} onChange={set("email")} />
            <div className="grid sm:grid-cols-2 gap-8 relative z-10">
              <Field label="Service Interest" value={form.service} onChange={set("service")} />
              <Field label="Project Type" value={form.type} onChange={set("type")} />
            </div>
            <Field label="Message / Brief" as="textarea" value={form.msg} onChange={set("msg")} />
            <div className="relative z-10">
              <MagneticSubmit label="Request a Consultation" />
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { i: MapPin, t: "Studio", v: "5-22, Deepthi Srinagar, Madinaguda, Near Lakshmi Hyundai Service Centre, Hyderabad" },
              { i: Phone, t: "Call", v: "+91 — Available on request" },
              { i: Mail, t: "Email", v: "hello@solwas.com" },
              { i: Clock, t: "Hours", v: "Mon — Sat · 10:00 to 19:00" },
            ].map((c, i) => (
              <motion.div
                key={i}
                className="flex gap-4 p-5 rounded-xl bg-surface/40 border border-border hover:border-gold/30 transition-all duration-300 glow-on-hover"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center shrink-0 hover:border-gold hover:bg-gold/10 transition-all duration-300">
                  <c.i className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.t}</div>
                  <div className="text-sm mt-1 text-foreground/90 leading-relaxed">{c.v}</div>
                </div>
              </motion.div>
            ))}
            <div className="rounded-xl overflow-hidden border border-border h-48 bg-surface/40 relative">
              <iframe
                title="Solwas Hyderabad" src="https://www.google.com/maps?q=Madinaguda+Hyderabad&output=embed"
                className="w-full h-full grayscale opacity-80" loading="lazy"
              />
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};
export default Contact;