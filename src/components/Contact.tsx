import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const Field = ({ label, type = "text", as = "input", value, onChange }: any) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  const Comp = as;
  return (
    <div className="relative">
      <label className={`absolute left-0 pointer-events-none transition-all duration-300 ${active ? "top-0 text-[10px] tracking-[0.2em] uppercase text-gold" : "top-4 text-sm text-muted-foreground"}`}>{label}</label>
      <Comp
        type={type} value={value} onChange={(e: any) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        rows={as === "textarea" ? 3 : undefined}
        className="w-full bg-transparent border-b border-border focus:border-gold pt-5 pb-2 outline-none transition-colors text-foreground resize-none"
      />
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", type: "", msg: "" });
  const set = (k: string) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <section id="contact" className="relative py-32 noise overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-20" />
      <div className="container mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl mb-16">
          <p className="font-italic text-gold tracking-[0.3em] text-xs uppercase mb-4">— Begin</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">Let's build something <span className="italic gold-text">extraordinary</span>.</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.form
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            onSubmit={(e) => { e.preventDefault(); toast.success("Request sent. We'll be in touch shortly."); setForm({ name: "", phone: "", email: "", service: "", type: "", msg: "" }); }}
            className="lg:col-span-3 space-y-8 p-8 md:p-10 rounded-2xl bg-surface/60 border border-border"
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <Field label="Full Name" value={form.name} onChange={set("name")} />
              <Field label="Phone Number" value={form.phone} onChange={set("phone")} />
            </div>
            <Field label="Email" type="email" value={form.email} onChange={set("email")} />
            <div className="grid sm:grid-cols-2 gap-8">
              <Field label="Service Interest" value={form.service} onChange={set("service")} />
              <Field label="Project Type" value={form.type} onChange={set("type")} />
            </div>
            <Field label="Message / Brief" as="textarea" value={form.msg} onChange={set("msg")} />
            <button type="submit" data-cursor="link"
              className="px-7 py-4 rounded-full bg-gold text-primary-foreground text-sm tracking-wide font-medium hover:shadow-gold hover:scale-[1.04] transition-all duration-300">
              Request a Consultation
            </button>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { i: MapPin, t: "Studio", v: "5-22, Deepthi Srinagar, Madinaguda, Near Lakshmi Hyundai Service Centre, Hyderabad" },
              { i: Phone, t: "Call", v: "+91 — Available on request" },
              { i: Mail, t: "Email", v: "hello@solwas.com" },
              { i: Clock, t: "Hours", v: "Mon — Sat · 10:00 to 19:00" },
            ].map((c, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-surface/40 border border-border">
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center shrink-0">
                  <c.i className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.t}</div>
                  <div className="text-sm mt-1 text-foreground/90 leading-relaxed">{c.v}</div>
                </div>
              </div>
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
