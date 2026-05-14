import { useState, useRef, useCallback, useEffect } from "react";
import { Diamond, Cpu, Sun, ArrowUpRight, RotateCcw } from "lucide-react";

const G = {
  gold: "#c8a44a",
  goldBright: "#e8cc78",
  goldDeep: "#7a5f1c",
  goldFaint: "rgba(200,164,74,0.10)",
  goldBorder: "rgba(200,164,74,0.22)",
  goldGlow: "rgba(200,164,74,0.18)",
  goldGlowStrong: "rgba(200,164,74,0.32)",
  bg: "#020203",
  bgBase: "#050506",
  bgElevated: "#0a0a0c",
  surface: "rgba(255,255,255,0.05)",
  foreground: "#EDEDEF",
  foregroundMuted: "#8A8F98",
  border: "rgba(255,255,255,0.08)",
  borderTop: "rgba(255,255,255,0.12)",
};

const services = [
  {
    icon: Diamond, num: "01", title: "Interiors",
    desc: "Turnkey interior services from concept to completion — design coordination, procurement, quality and safety unified under one roof.",
    chips: ["Residential", "Commercial", "Turnkey", "Design-Build"],
  },
  {
    icon: Cpu, num: "02", title: "Home Automation",
    desc: "Integrated lighting, climate, security and smart devices on a single platform built for reliability and energy efficiency.",
    chips: ["Smart Lighting", "Climate Control", "Security", "Voice Control"],
  },
  {
    icon: Sun, num: "03", title: "Solar Fencing",
    desc: "Solar-powered perimeter security for industrial and agricultural sites — durable, sustainable, zero grid dependence.",
    chips: ["Industrial", "Agricultural", "Zero Grid", "Low Maintenance"],
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Space+Mono&display=swap');

@property --ba { syntax:'<angle>'; initial-value:0deg; inherits:false; }
@keyframes spin    { to { --ba: 360deg; } }
@keyframes rise    { from { opacity:0; transform:translateY(36px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes sweep   { from { transform:translateX(-100%) skewX(-14deg); } to { transform:translateX(260%) skewX(-14deg); } }
@keyframes cin     { from { opacity:0; transform:translateX(-9px); } to { opacity:1; transform:none; } }
@keyframes blobA   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.08)} 66%{transform:translate(-30px,50px) scale(0.94)} }
@keyframes blobB   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,60px) scale(1.06)} 66%{transform:translate(40px,-30px) scale(0.96)} }
@keyframes blobC   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(35px,55px) scale(0.92)} 66%{transform:translate(-55px,-35px) scale(1.1)} }
@keyframes glowPulse { 0%,100%{opacity:0.55} 50%{opacity:0.85} }

* { box-sizing:border-box; }

.lx {
  min-height:100vh;
  background: linear-gradient(175deg, #0a0a0f 0%, #050506 45%, #020203 100%);
  padding: 64px 28px 80px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
  overflow: hidden;
}

/* ── Ambient cinematic blobs ── */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  pointer-events: none;
  will-change: transform;
}
.blob-a {
  width: 520px; height: 520px;
  top: -120px; left: -140px;
  background: radial-gradient(ellipse, rgba(94,106,210,0.11) 0%, transparent 70%);
  animation: blobA 18s cubic-bezier(0.16,1,0.3,1) infinite;
}
.blob-b {
  width: 440px; height: 440px;
  top: 40%; right: -100px;
  background: radial-gradient(ellipse, rgba(200,164,74,0.09) 0%, transparent 70%);
  animation: blobB 22s cubic-bezier(0.16,1,0.3,1) infinite;
}
.blob-c {
  width: 360px; height: 360px;
  bottom: 60px; left: 30%;
  background: radial-gradient(ellipse, rgba(94,106,210,0.07) 0%, transparent 70%);
  animation: blobC 26s cubic-bezier(0.16,1,0.3,1) infinite;
}

/* ── Cinematic film-grain overlay ── */
.lx::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.022;
  pointer-events: none;
  z-index: 0;
}

.lx-head {
  max-width: 860px;
  margin: 0 auto 52px;
  position: relative;
  z-index: 2;
}

.lx-eye {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: .48em;
  color: ${G.gold};
  opacity: .55;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.lx-eye::before {
  content: '';
  width: 26px;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${G.gold});
  display: block;
}

.lx-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2.2rem, 4.6vw, 3.9rem);
  color: ${G.foreground};
  line-height: 1.08;
  letter-spacing: -.015em;
  margin: 0;
}
.lx-h2 em {
  font-style: italic;
  color: ${G.gold};
  text-shadow: 0 0 40px rgba(200,164,74,0.3);
}

.lx-stack {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 2;
}

/* ── Card scene / tilt ── */
.c-scene {
  perspective: 1400px;
  animation: rise .9s cubic-bezier(0.16,1,0.3,1) both;
}
.c-scene:nth-child(1) { animation-delay: .05s }
.c-scene:nth-child(2) { animation-delay: .18s }
.c-scene:nth-child(3) { animation-delay: .31s }

.c-tilt {
  position: relative;
  transform-style: preserve-3d;
  transition: transform .08s linear;
  will-change: transform;
}

/* ── Spinning conic ring ── */
.c-ring {
  position: absolute;
  inset: -1.5px;
  border-radius: 18px;
  z-index: -1;
  background: conic-gradient(from var(--ba), ${G.gold} 0%, ${G.goldDeep} 18%, ${G.goldBright} 36%, transparent 50%, transparent 70%, ${G.gold} 100%);
  animation: spin 4s linear infinite;
  opacity: 0;
  transition: opacity .35s cubic-bezier(0.16,1,0.3,1);
}
.c-tilt:hover .c-ring { opacity: 1; }

/* ── Flip container ── */
.c-inner {
  transform-style: preserve-3d;
  transition: transform .78s cubic-bezier(0.16,1,0.3,1);
  position: relative;
  width: 100%;
  height: 200px;
}
.c-inner.flipped { transform: rotateY(180deg); }

.c-face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  position: absolute;
  inset: 0;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
}
.c-face-back { transform: rotateY(180deg); }

/* ── Glassmorphism card surface ── */
.c-glass {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(20,19,16,0.92) 0%,
    rgba(14,13,10,0.88) 60%,
    rgba(10,10,12,0.92) 100%
  );
  border: 1px solid ${G.border};
  border-top-color: ${G.borderTop};
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.07),
    inset 0 -1px 0 rgba(0,0,0,0.4),
    0 24px 64px rgba(0,0,0,0.65),
    0 4px 16px rgba(0,0,0,0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* ── Gold top ledge light ── */
.c-ledge {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  z-index: 8;
  pointer-events: none;
  background: linear-gradient(90deg, transparent 0%, ${G.gold} 25%, ${G.goldBright} 52%, ${G.gold} 76%, transparent 100%);
  opacity: .45;
}

/* ── Hover shimmer sweep ── */
.c-shimmer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 16px;
  pointer-events: none;
  z-index: 10;
}
.c-shimmer::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 44%;
  height: 100%;
  background: linear-gradient(105deg, transparent 20%, rgba(255,245,195,0.06) 50%, transparent 80%);
  transform: translateX(-100%) skewX(-14deg);
}
.c-tilt:hover .c-shimmer::after { animation: sweep .9s cubic-bezier(0.16,1,0.3,1) forwards; }

/* ── Mouse-tracked specular ── */
.c-spec {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 12;
  opacity: 0;
  transition: opacity .12s;
}

/* ── Ambient corner glow on hover ── */
.c-glow {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  transition: opacity .4s cubic-bezier(0.16,1,0.3,1);
  background: radial-gradient(ellipse 80% 60% at 50% 110%, rgba(200,164,74,0.14) 0%, transparent 70%);
}
.c-tilt:hover .c-glow { opacity: 1; }

/* ── Flip hint label ── */
.c-hint {
  position: absolute;
  top: 11px; right: 13px;
  z-index: 14;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  letter-spacing: .1em;
  color: rgba(255,255,255,0.14);
  pointer-events: none;
  transition: color .28s cubic-bezier(0.16,1,0.3,1);
}
.c-tilt:hover .c-hint { color: rgba(200,164,74,0.5); }

/* ── FRONT face layout ── */
.f-layout {
  position: relative;
  z-index: 6;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 28px;
}

.f-icon {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
}
.f-orb {
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(200,164,74,0.07);
  border: 1px solid rgba(200,164,74,0.24);
  box-shadow:
    0 0 20px rgba(200,164,74,0.15),
    0 0 0 4px rgba(200,164,74,0.04),
    inset 0 1px 0 rgba(255,255,255,0.08);
  transition: box-shadow .3s cubic-bezier(0.16,1,0.3,1), transform .3s cubic-bezier(0.16,1,0.3,1);
}
.c-tilt:hover .f-orb {
  transform: scale(1.05) translateY(-1px);
  box-shadow: 0 0 32px rgba(200,164,74,0.28), 0 0 0 6px rgba(200,164,74,0.06), inset 0 1px 0 rgba(255,255,255,0.1);
}

.f-num {
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  color: rgba(255,255,255,0.18);
  letter-spacing: .2em;
}

.f-text { flex: 1; min-width: 0; }

.f-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(1.5rem, 2.6vw, 2.1rem);
  color: rgba(255,255,255,0.9);
  margin: 0 0 6px;
  line-height: 1.08;
  letter-spacing: -.015em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.f-desc {
  font-size: 12px;
  line-height: 1.62;
  color: rgba(255,255,255,0.24);
  margin: 0 0 11px;
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.f-chips { display: flex; flex-wrap: wrap; gap: 5px; }
.f-chip {
  padding: 2px 9px;
  font-size: 9px;
  border-radius: 999px;
  font-weight: 500;
  letter-spacing: .04em;
  background: rgba(200,164,74,0.08);
  border: 1px solid rgba(200,164,74,0.22);
  color: ${G.gold};
  transition: background .2s, border-color .2s;
}
.c-tilt:hover .f-chip { background: rgba(200,164,74,0.13); border-color: rgba(200,164,74,0.35); }

.f-cta {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .04em;
  color: ${G.gold};
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(200,164,74,0.22);
  background: rgba(200,164,74,0.07);
  box-shadow: 0 0 16px rgba(200,164,74,0.1);
  transition: background .25s cubic-bezier(0.16,1,0.3,1), border-color .25s, transform .25s cubic-bezier(0.16,1,0.3,1), box-shadow .25s;
}
.f-cta:hover {
  background: rgba(200,164,74,0.16);
  border-color: rgba(200,164,74,0.5);
  transform: translateX(3px);
  box-shadow: 0 0 28px rgba(200,164,74,0.2);
}

/* ── BACK face ── */
.b-glass {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(12,11,8,0.95) 0%, rgba(8,8,10,0.95) 100%);
  border: 1px solid rgba(255,255,255,0.06);
  border-top-color: rgba(255,255,255,0.10);
  box-shadow:
    0 0 60px rgba(200,164,74,0.09),
    0 24px 64px rgba(0,0,0,0.7),
    inset 0 1px 0 rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.b-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(200,164,74,0.06);
  top: 50%; right: 0;
  transform: translateY(-50%) translateX(42%);
  pointer-events: none;
}
.b-ring.hi { border-color: rgba(200,164,74,0.14); }

.b-layout {
  position: relative;
  z-index: 6;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px 0 38px;
  overflow: hidden;
}

.b-label {
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: .48em;
  color: rgba(255,255,255,0.14);
  margin-bottom: 5px;
}

.b-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2.2rem, 5.2vw, 4.4rem);
  line-height: 1;
  letter-spacing: -.025em;
  color: ${G.goldBright};
  text-shadow: 0 0 40px rgba(200,164,74,0.35), 0 0 80px rgba(200,164,74,0.15);
}

.b-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px 28px;
  margin-top: 16px;
}

.b-item {
  display: flex;
  align-items: center;
  gap: 8px;
  animation: cin .28s cubic-bezier(0.16,1,0.3,1) both;
}

.b-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${G.gold};
  box-shadow: 0 0 8px ${G.gold}, 0 0 16px rgba(200,164,74,0.4);
  animation: glowPulse 2.4s ease-in-out infinite;
}

.b-text {
  font-size: 12px;
  color: rgba(255,255,255,0.42);
  letter-spacing: .02em;
}

.b-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  margin-left: 20px;
}

.b-icon {
  width: 46px; height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(200,164,74,0.07);
  border: 1px solid rgba(200,164,74,0.22);
  box-shadow: 0 0 20px rgba(200,164,74,0.15), inset 0 1px 0 rgba(255,255,255,0.07);
}

.b-ghost {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3.6rem, 7.8vw, 6rem);
  line-height: 1;
  color: rgba(200,164,74,0.06);
  letter-spacing: -.045em;
  user-select: none;
}

.b-hint {
  position: absolute;
  bottom: 11px; right: 14px;
  z-index: 14;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  letter-spacing: .08em;
  color: rgba(255,255,255,0.14);
  pointer-events: none;
}

/* ── Primary button glow accent ── */
.btn-glow-wrap {
  position: relative;
  flex-shrink: 0;
}
.btn-glow-wrap::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 999px;
  background: radial-gradient(ellipse, rgba(200,164,74,0.25) 0%, transparent 70%);
  filter: blur(6px);
  opacity: 0;
  transition: opacity .3s cubic-bezier(0.16,1,0.3,1);
}
.c-tilt:hover .btn-glow-wrap::before { opacity: 1; }
`;

const Card = ({ s }) => {
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef(null);
  const specRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateX(${-(ny - 0.5) * 8}deg) rotateY(${(nx - 0.5) * 8}deg)`;
    if (specRef.current) {
      specRef.current.style.background = `radial-gradient(ellipse 48% 28% at ${nx * 100}% ${ny * 100}%, rgba(255,243,180,0.09), transparent 65%)`;
      specRef.current.style.opacity = "1";
    }
  }, []);

  const onLeave = useCallback(() => {
    if (tiltRef.current) {
      tiltRef.current.style.transform = "rotateX(0) rotateY(0)";
    }
    if (specRef.current) {
      specRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <div className="c-scene">
      <div
        className="c-tilt"
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="c-ring" />
        <div className={`c-inner${flipped ? " flipped" : ""}`}>

          {/* ─── FRONT ─────────────────────────────────── */}
          <div className="c-face" onClick={() => setFlipped(true)}>
            <div className="c-glass" />
            <div className="c-glow" />
            <div className="c-ledge" />
            <div className="c-shimmer" />
            <div className="c-spec" ref={specRef} />
            <div className="c-hint"><RotateCcw size={8} /> flip</div>
            <div className="f-layout">
              <div className="f-icon">
                <div className="f-orb">
                  <s.icon size={20} style={{ color: G.gold }} />
                </div>
                <span className="f-num">{s.num}</span>
              </div>
              <div className="f-text">
                <h3 className="f-title">{s.title}</h3>
                <p className="f-desc">{s.desc}</p>
                <div className="f-chips">
                  {s.chips.map((c) => (
                    <span key={c} className="f-chip">{c}</span>
                  ))}
                </div>
              </div>
              <div className="btn-glow-wrap">
                <a
                  className="f-cta"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Explore <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* ─── BACK ──────────────────────────────────── */}
          <div className="c-face c-face-back" onClick={() => setFlipped(false)}>
            <div className="b-glass" />
            <div className="c-ledge" style={{ opacity: 0.45 }} />
            {[320, 210, 110].map((sz, ri) => (
              <div
                key={ri}
                className={`b-ring${ri === 2 ? " hi" : ""}`}
                style={{ width: sz, height: sz }}
              />
            ))}
            <div className="b-layout">
              <div>
                <p className="b-label">— Service</p>
                <h3 className="b-title">{s.title}</h3>
                <div className="b-items">
                  {s.chips.map((c, ci) => (
                    <div
                      key={c}
                      className="b-item"
                      style={{ animationDelay: flipped ? `${0.28 + ci * 0.07}s` : "0s" }}
                    >
                      <span className="b-dot" />
                      <span className="b-text">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="b-right">
                <div className="b-icon">
                  <s.icon size={18} style={{ color: G.gold }} />
                </div>
                <span className="b-ghost">{s.num}</span>
              </div>
            </div>
            <div className="b-hint"><RotateCcw size={8} /> flip back</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function Services() {
  return (
    <>
      <style>{CSS}</style>
      <section className="lx">
        {/* Cinematic ambient blobs */}
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />

        <div className="lx-head">
          <p className="lx-eye">Three Pillars</p>
          <h2 className="lx-h2">
            Crafted across <em>three</em> disciplines.
          </h2>
        </div>

        <div className="lx-stack">
          {services.map((s) => (
            <Card key={s.title} s={s} />
          ))}
        </div>
      </section>
    </>
  );
}