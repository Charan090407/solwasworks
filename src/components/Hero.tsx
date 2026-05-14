import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

// ─── Asset imports ────────────────────────────────────────────────────────────
// Place these five images in src/assets/ before running:
import doorClosed from "@/assets/hero/door-closed.png";
import doorAjar   from "@/assets/hero/door-ajar.png";
import doorHalf   from "@/assets/hero/door-half.png";
import doorOpen   from "@/assets/hero/door-open.png";
import interior   from "@/assets/hero/interior.png";

// ─── Register GSAP plugins (safe to call multiple times) ─────────────────────
gsap.registerPlugin(ScrollTrigger);

// ─── Film-grain SVG (inline, no extra file needed) ───────────────────────────
const GRAIN_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E`;

export default function Hero() {
  // ── Refs for every animated node ──────────────────────────────────────────
  const scrollContainerRef  = useRef<HTMLDivElement>(null);
  const sceneRef            = useRef<HTMLDivElement>(null);
  const interiorRef         = useRef<HTMLImageElement>(null);
  const doorOpenRef         = useRef<HTMLImageElement>(null);
  const doorHalfRef         = useRef<HTMLImageElement>(null);
  const doorAjarRef         = useRef<HTMLImageElement>(null);
  const doorClosedRef       = useRef<HTMLImageElement>(null);
  const glowRef             = useRef<HTMLDivElement>(null);
  const flashRef            = useRef<HTMLDivElement>(null);
  const textWrapRef         = useRef<HTMLDivElement>(null);
  const headlineRef         = useRef<HTMLHeadingElement>(null);
  const sublineRef          = useRef<HTMLParagraphElement>(null);
  const ruleRef             = useRef<HTMLDivElement>(null);
  const ctaRef              = useRef<HTMLAnchorElement>(null);
  const cursorRef           = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef  = useRef<HTMLDivElement>(null);

  // ── Custom cursor ──────────────────────────────────────────────────────────
  useEffect(() => {
    const dot = cursorRef.current;
    if (!dot) return;
    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.18, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ── Master GSAP timeline ───────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial load: fade-in door-closed from black ─────────────────────
      gsap.from(doorClosedRef.current, {
        opacity: 0,
        duration: 2.2,
        ease: "power2.out",
        delay: 0.3,
      });

      // ── Scroll indicator fades out on first scroll ───────────────────────
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: "top+=80 top",
        onEnter: () =>
          gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 }),
        onLeaveBack: () =>
          gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4 }),
      });

      // ── Master scroll-scrub timeline ─────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: sceneRef.current,
          anticipatePin: 1,
        },
      });

      // ┌──────────────────────────────────────────────────────────────────┐
      // │  PHASE 1  (0 – 15%)  Door-closed + subtle push-in               │
      // └──────────────────────────────────────────────────────────────────┘
      tl.addLabel("phase1", 0);
      tl.to(
        doorClosedRef.current,
        { scale: 1.05, ease: "none" },
        "phase1"
      );

      // ┌──────────────────────────────────────────────────────────────────┐
      // │  PHASE 2  (15 – 35%)  closed → ajar + glow appears              │
      // └──────────────────────────────────────────────────────────────────┘
      tl.addLabel("phase2", 0.15);
      tl.to(doorClosedRef.current, { opacity: 0, ease: "power1.inOut" }, "phase2");
      tl.to(glowRef.current, { opacity: 0.4, ease: "power1.in" }, "phase2");

      // ┌──────────────────────────────────────────────────────────────────┐
      // │  PHASE 3  (35 – 55%)  ajar → half                               │
      // └──────────────────────────────────────────────────────────────────┘
      tl.addLabel("phase3", 0.35);
      tl.to(doorAjarRef.current, { opacity: 0, ease: "power1.inOut" }, "phase3");
      tl.to(glowRef.current, { opacity: 0.65, ease: "power1.in" }, "phase3");

      // ┌──────────────────────────────────────────────────────────────────┐
      // │  PHASE 4  (55 – 80%)  half → open, interior reverse-zoom        │
      // └──────────────────────────────────────────────────────────────────┘
      tl.addLabel("phase4", 0.55);
      tl.to(doorHalfRef.current, { opacity: 0, ease: "power1.inOut" }, "phase4");
      tl.to(glowRef.current, { opacity: 0, ease: "power2.out" }, "phase4");

      // Interior reverse-zoom starts at 70% (normalised offset = 0.70 - 0.55 = 0.15)
      tl.addLabel("interiorPull", 0.70);
      tl.to(
        interiorRef.current,
        { scale: 1.0, ease: "power2.out" },
        "interiorPull"
      );

      // Door-open fades out between 75–80%
      tl.addLabel("doorOpenOut", 0.75);
      tl.to(doorOpenRef.current, { opacity: 0, ease: "power2.in" }, "doorOpenOut");

      // Brief white flash as interior fully reveals
      tl.addLabel("flash", 0.77);
      tl.fromTo(
        flashRef.current,
        { opacity: 0 },
        { opacity: 0.12, duration: 0.015, ease: "none" },
        "flash"
      );
      tl.to(flashRef.current, { opacity: 0, duration: 0.025, ease: "none" });

      // ┌──────────────────────────────────────────────────────────────────┐
      // │  PHASE 5  (80 – 100%)  Text reveal                              │
      // └──────────────────────────────────────────────────────────────────┘
      tl.addLabel("phase5", 0.80);
      tl.to(textWrapRef.current, { opacity: 1, ease: "power1.in" }, "phase5");

      // Headline words stagger up
      const words = headlineRef.current
        ? Array.from(headlineRef.current.querySelectorAll(".word"))
        : [];
      tl.fromTo(
        words,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          stagger: 0.04,   // in scrub units → visually ≈ 120 ms per word
        },
        "phase5+=0.02"
      );

      // Sub-line
      tl.fromTo(
        sublineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.7, y: 0, ease: "power2.out" },
        "phase5+=0.10"
      );

      // Horizontal rule width expand
      tl.fromTo(
        ruleRef.current,
        { width: 0 },
        { width: 120, ease: "power2.out" },
        "phase5+=0.13"
      );

      // CTA button
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out" },
        "phase5+=0.16"
      );
    });

    return () => ctx.revert();
  }, []);

  // ── Headline split into <span class="word"> ────────────────────────────────
  const headlineTokens = [
    { text: "No",       italic: false },
    { text: "Drama.",   italic: false },
    { text: "Only",     italic: false },
    { text: "Damn",     italic: true  },
    { text: "Good",     italic: true  },
    { text: "Interiors.", italic: false },
  ];

  return (
    <>
      {/* ── Custom dot cursor ─────────────────────────────────────────── */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#fff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />

      {/* ── 600vh scroll container ────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        id="scroll-container"
        style={{ height: "600vh", background: "#0a0806" }}
      >
        {/* ── Pinned scene ──────────────────────────────────────────────── */}
        <div
          ref={sceneRef}
          id="scene"
          style={{
            position: "sticky",
            top: 0,
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            background: "#0a0806",
            cursor: "none",
          }}
        >
          {/* ── LAYER 0 – Interior (always behind, starts zoomed in) ──── */}
          <img
            ref={interiorRef}
            src={interior}
            alt="Grand interior"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",   // chandelier stays in upper third
              zIndex: 0,
              transform: "scale(1.08)",
              willChange: "opacity, transform",
            }}
          />

          {/* ── LAYER 1 – Door open ───────────────────────────────────── */}
          <img
            ref={doorOpenRef}
            src={doorOpen}
            alt=""
            aria-hidden="true"
            style={layerStyle(1)}
          />

          {/* ── LAYER 2 – Door half ───────────────────────────────────── */}
          <img
            ref={doorHalfRef}
            src={doorHalf}
            alt=""
            aria-hidden="true"
            style={layerStyle(2)}
          />

          {/* ── LAYER 3 – Door ajar ───────────────────────────────────── */}
          <img
            ref={doorAjarRef}
            src={doorAjar}
            alt=""
            aria-hidden="true"
            style={layerStyle(3)}
          />

          {/* ── LAYER 4 – Door closed (top-most door) ────────────────── */}
          <img
            ref={doorClosedRef}
            src={doorClosed}
            alt="Closed doors"
            style={layerStyle(4)}
          />

          {/* ── LAYER 5 – Warm amber glow overlay ───────────────────── */}
          <div
            ref={glowRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              opacity: 0,
              background:
                "radial-gradient(ellipse 30% 80% at 50% 50%, rgba(255,180,60,0.55) 0%, rgba(200,100,20,0.25) 45%, transparent 75%)",
              mixBlendMode: "screen",
              willChange: "opacity",
              pointerEvents: "none",
            }}
          />

          {/* ── LAYER 6 – Film grain ─────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 6,
              opacity: 0.08,
              backgroundImage: `url("${GRAIN_SVG}")`,
              backgroundRepeat: "repeat",
              backgroundSize: "300px 300px",
              pointerEvents: "none",
            }}
          />

          {/* ── White flash overlay ───────────────────────────────────── */}
          <div
            ref={flashRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 8,
              background: "#fff",
              opacity: 0,
              pointerEvents: "none",
            }}
          />

          {/* ── LAYER 7 – Text content ────────────────────────────────── */}
          <div
            ref={textWrapRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 7,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              willChange: "opacity",
              padding: "0 1.5rem",
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 35%, transparent 65%)",
            }}
          >
            {/* Headline */}
            <h1
              ref={headlineRef}
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.8rem, 6vw, 6rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 2px 40px rgba(0,0,0,0.5)",
                textAlign: "center",
                maxWidth: 900,
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0 0.28em",
              }}
            >
              {headlineTokens.map(({ text, italic }, i) => (
                <span
                  key={i}
                  className="word"
                  style={{
                    display: "inline-block",
                    fontStyle: italic ? "italic" : "normal",
                    willChange: "opacity, transform",
                  }}
                >
                  {text}
                </span>
              ))}
            </h1>

            {/* Sub-line */}
            <p
              ref={sublineRef}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "hsl(43 52% 54%)",
                marginTop: "1.4rem",
                opacity: 0,
                willChange: "opacity, transform",
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              }}
            >
              — solwas —
            </p>

            {/* Horizontal rule */}
            <div
              ref={ruleRef}
              style={{
                height: 1,
                width: 0,
                background: "rgba(255,255,255,0.2)",
                marginTop: "0.9rem",
                willChange: "width",
              }}
            />

            {/* CTA */}
            <a
              ref={ctaRef}
              href="#works"
              style={{
                marginTop: "2.5rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2.5rem",
                borderRadius: 999,
                border: "1px solid rgba(212,175,55,0.6)",
                color: "rgba(255,255,255,1)",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                textDecoration: "none",
                opacity: 0,
                willChange: "opacity, transform, background, box-shadow, transform",
                backdropFilter: "blur(10px)",
                background: "rgba(0,0,0,0.4)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(212,175,55,0.2)",
                cursor: "none",
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(212,175,55,0.15)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(212,175,55,0.9)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 20px rgba(0,0,0,0.5), 0 0 25px rgba(212,175,55,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(0,0,0,0.4)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(212,175,55,0.6)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(212,175,55,0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Explore Collection
              <ArrowRight
                size={16}
                style={{ transition: "transform 0.25s" }}
              />
            </a>
          </div>

          {/* ── Scroll indicator (fades on first scroll) ─────────────── */}
          <div
            ref={scrollIndicatorRef}
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              pointerEvents: "none",
            }}
          >
            <span style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: 10, 
              letterSpacing: "0.2em", 
              textTransform: "uppercase", 
              color: "rgba(255,205,100,0.9)",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)"
            }}>
              Scroll to explore
            </span>
            <div
              style={{
                width: 1,
                height: 48,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,205,100,0.8))",
              }}
            />
            <ChevronDown
              size={18}
              color="rgba(255,205,100,1)"
              style={{ animation: "bounce 1.4s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* ── Global overrides ─────────────────────────────────────────────── */}
      <style>{`
        html { scrollbar-width: none; }
        html::-webkit-scrollbar { display: none; }
        * { cursor: none !important; }

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Inter:wght@300;400&display=swap');

        @keyframes bounce {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(5px); }
        }
      `}</style>
    </>
  );
}

// ── Shared absolute-fill style for door image layers ─────────────────────────
function layerStyle(zIndex: number): React.CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    zIndex,
    willChange: "opacity, transform",
  };
}