import { useEffect, useRef, useState } from "react";
import { Sofa, Bed, Utensils, Bath, Plus, ChevronUp, ChevronDown, SkipBack, Pause, Play, SkipForward, Wind, Phone, Shuffle, Repeat, Music, Sun, Snowflake, Flame, Battery, Volume2, Eye, EyeOff, PartyPopper, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import { emitRipple } from "@/components/WaterDropletEffect";
import bedroom from "@/assets/room-bedroom.jpg";
import dining from "@/assets/room-dining.jpg";
import bathroom from "@/assets/room-bathroom.jpg";
import living from "@/assets/room-living.jpg";
import party from "@/assets/room-party.jpg";

const rooms = [
  { id: "living", label: "Living room", icon: Sofa, img: living },
  { id: "bedroom", label: "Bedroom", icon: Bed, img: bedroom },
  { id: "dining", label: "Dining room", icon: Utensils, img: dining },
  { id: "bathroom", label: "Bathroom", icon: Bath, img: bathroom },
  { id: "party", label: "Party hall", icon: PartyPopper, img: party },
];

const Toggle = ({ on, onChange, accent = "gold" }: { on: boolean; onChange: (v: boolean) => void; accent?: string }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onChange(!on); }}
    data-cursor="link"
    className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${on ? (accent === "red" ? "bg-destructive" : "bg-gold") : "bg-foreground/15"}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${on ? "translate-x-5" : ""}`} />
  </button>
);

const Card = ({ children, className = "", on = true }: { children: React.ReactNode; className?: string; on?: boolean }) => (
  <div className={`glass rounded-2xl p-4 shadow-glass relative ${on ? "" : "opacity-50"} ${className}`}
    style={on ? { boxShadow: "0 0 20px hsl(43 52% 54% / 0.08), 0 8px 32px -4px hsl(0 0% 0% / 0.5)" } : {}}>
    {!on && <div className="absolute top-0 left-4 right-4 h-px bg-destructive" />}
    {children}
  </div>
);

const Slider = ({ value, onChange, accent = "gold" }: { value: number; onChange: (v: number) => void; accent?: string }) => (
  <div className="relative h-1.5 bg-foreground/10 rounded-full mt-2 group cursor-pointer"
    onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onChange(Math.round(((e.clientX - rect.left) / rect.width) * 100));
    }}>
    <div className={`absolute inset-y-0 left-0 rounded-full ${accent === "red" ? "bg-destructive" : accent === "blue" ? "bg-blue-400" : "bg-gradient-gold"}`} style={{ width: `${value}%` }} />
    <div className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md transition-transform group-hover:scale-125`} style={{ left: `calc(${value}% - 7px)` }} />
  </div>
);

const CurtainsOverlay = ({ pct }: { pct: number }) => {
  const curtainStyle = {
    backgroundColor: '#d6c8b3', // warm beige luxury fabric color
    backgroundImage: `
      linear-gradient(
        90deg,
        rgba(0,0,0,0.5) 0%,
        rgba(255,255,255,0.1) 10%,
        rgba(0,0,0,0.4) 25%,
        rgba(255,255,255,0.2) 40%,
        rgba(0,0,0,0.45) 55%,
        rgba(255,255,255,0.15) 70%,
        rgba(0,0,0,0.5) 85%,
        rgba(255,255,255,0.05) 95%,
        rgba(0,0,0,0.6) 100%
      )
    `,
    backgroundSize: '150px 100%',
    boxShadow: '0 0 30px rgba(0,0,0,0.8)'
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex z-10 overflow-hidden">
      {/* Left Curtain */}
      <div
        className="h-full transition-all duration-700 ease-in-out border-r border-white/10"
        style={{ ...curtainStyle, width: `${(100 - pct) / 2}%` }}
      />

      {/* Window Gap */}
      <div className="h-full flex-1" />

      {/* Right Curtain */}
      <div
        className="h-full transition-all duration-700 ease-in-out border-l border-white/10"
        style={{ ...curtainStyle, width: `${(100 - pct) / 2}%` }}
      />
    </div>
  );
};

const SmartHome = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleReturnToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const onScroll = () => {
      if (!wrapRef.current || !trackRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      const idx = Math.min(rooms.length - 1, Math.floor(p * rooms.length * 0.999));
      setActive(idx);
      trackRef.current.style.transform = `translate3d(-${p * (100 - 100 / rooms.length)}%, 0, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (idx: number) => {
    if (!wrapRef.current) return;
    const total = wrapRef.current.offsetHeight - window.innerHeight;
    const p = idx / (rooms.length - 1);
    const top = wrapRef.current.offsetTop + p * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Living Room
  const [ceiling, setCeiling] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ac, setAc] = useState(true);
  const [acTemp, setAcTemp] = useState(22);
  const [curtains, setCurtains] = useState(true);
  const [curtainPct, setCurtainPct] = useState(100);
  const [purifier, setPurifier] = useState(true);
  const [ambient, setAmbient] = useState(60);

  // Bedroom
  const [warmWhite, setWarmWhite] = useState(true);
  const [coolBright, setCoolBright] = useState(false);
  const [bedAc, setBedAc] = useState(true);
  const [cleaner, setCleaner] = useState(false);
  const [bedCurtain, setBedCurtain] = useState(100);
  const [smartTv, setSmartTv] = useState(false);

  // Dining
  const [pendant, setPendant] = useState(true);
  const [wallLights, setWallLights] = useState(true);
  const [waterLevel, setWaterLevel] = useState(10);

  // App State
  const [previewMode, setPreviewMode] = useState(false);
  const [showLightsList, setShowLightsList] = useState(false);
  const [diningCurtain, setDiningCurtain] = useState(100);

  // Bathroom
  const [exhaust, setExhaust] = useState(true);
  const [waterTemp, setWaterTemp] = useState(60);
  const [vanityLight, setVanityLight] = useState(true);
  const [showerLight, setShowerLight] = useState(true);

  // Party Hall
  const [vibrantLight, setVibrantLight] = useState(false);
  const [partyCurtain, setPartyCurtain] = useState(100);
  const [partyAc, setPartyAc] = useState(true);

  const roomTracks = [
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  ];

  // Handle Sound Ripple Effect
  useEffect(() => {
    if (!soundOn) return;
    const interval = setInterval(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const color = "rgba(212,175,55,0.4)";
      emitRipple(80, 80, color);
      emitRipple(w - 80, 80, color);
      emitRipple(80, h - 80, color);
      emitRipple(w - 80, h - 80, color);
    }, 1200);
    return () => clearInterval(interval);
  }, [soundOn]);
  // Audio playback effect
  useEffect(() => {
    if (audioRef.current) {
      if (soundOn) {
        if (!audioRef.current.src.includes(roomTracks[active])) {
          audioRef.current.src = roomTracks[active];
        }
        audioRef.current.play().catch(() => { });
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundOn, active]);

  // Volume sync effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <section id="works" ref={wrapRef} className="relative" style={{ height: "500vh" }}>
      <Loader />
      <Cursor />
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        {/* Tabs */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 glass-pill rounded-full px-2 py-2 flex items-center gap-1 max-w-[95vw] overflow-x-auto">
          {rooms.map((r, i) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id} onClick={() => jumpTo(i)} data-cursor="link"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-all ${active === i ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"}`}
              >
                <Icon className="w-3.5 h-3.5" /> {r.label}
              </button>
            );
          })}
          <div className="w-px h-6 bg-white/20 mx-2" />
          <button onClick={() => setPreviewMode(!previewMode)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-colors ${previewMode ? 'bg-gold text-background' : 'hover:bg-white/10 text-foreground/70'}`} data-cursor="link">
            {previewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />} Preview
          </button>
        </div>

        {/* Back to Home Button & Section Label */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-50 flex items-center gap-4 pointer-events-auto">
          <a
            href="/#services"
            onClick={handleReturnToServices}
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-medium hidden sm:block drop-shadow-md">
              Return Home
            </span>
          </a>
          <div className="hidden md:block w-px h-6 bg-white/20" />
          <p className="hidden md:block font-italic text-gold tracking-[0.3em] text-[10px] uppercase drop-shadow-md">
            — Smart Home Showcase
          </p>
        </div>

        {/* Elegant Top-right Section Indicator */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-right pointer-events-none drop-shadow-md">
          <h3 className="font-['Anton'] text-lg md:text-2xl text-white/30 uppercase tracking-widest">
            02 // Home Automation
          </h3>
          <p className="font-['Inter'] text-[10px] md:text-xs text-gold tracking-[0.3em] uppercase mt-1 md:mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Intelligent Living Systems
          </p>
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="flex h-full transition-transform duration-300 ease-out" style={{ width: `${rooms.length * 100}%` }}>
          {/* ROOM 1 LIVING */}
          <div className="relative h-full" style={{ width: `${100 / rooms.length}%`, flexShrink: 0 }}>
            <img src={rooms[0].img} alt="Living room" className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700"
              style={{ filter: ceiling ? "brightness(0.9)" : "brightness(0.35)" }} />
            <div className="absolute inset-0 bg-background/20" />
            <CurtainsOverlay pct={curtains ? curtainPct : 0} />
            <div className="absolute inset-0 transition-opacity duration-700 mix-blend-overlay" style={{ backgroundColor: 'rgba(255, 180, 50, 0.2)', opacity: ambient / 100 }} />

            <div className={`absolute inset-0 p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 md:gap-4 z-20 pointer-events-none *:pointer-events-auto transition-opacity duration-500 ${previewMode ? 'opacity-0' : 'opacity-100'}`}>
              <div className="col-start-5 col-span-4 row-start-2 flex justify-center">
                <Card className="flex items-center gap-3 px-4 py-2.5">
                  <span className="text-xs text-foreground/90">Ceiling lights</span>
                  <Toggle on={ceiling} onChange={setCeiling} />
                </Card>
              </div>
              <div className="col-start-1 col-span-3 row-start-3 row-span-3">
                <Card on={ac}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Air conditioner</span>
                    <Toggle on={ac} onChange={setAc} />
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="font-serif text-4xl">{acTemp} <span className="text-2xl">°C</span></span>
                    <div className="flex flex-col">
                      <button onClick={() => setAcTemp(t => t + 1)} className="p-0.5"><ChevronUp className="w-4 h-4 text-gold" /></button>
                      <button onClick={() => setAcTemp(t => t - 1)} className="p-0.5"><ChevronDown className="w-4 h-4 text-gold" /></button>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2 text-[11px]">
                    <Row label="Mode" val={<span className="flex items-center gap-1">Cool <Snowflake className="w-3 h-3" /></span>} />
                    <Row label="Fan speed" val={ac ? "Medium" : "Off"} />
                    <Row label="Schedule" val="On" />
                  </div>
                </Card>
              </div>
              <div className="col-start-4 col-span-3 row-start-3">
                <Card on={curtains}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Curtains</span>
                    <Toggle on={curtains} onChange={setCurtains} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-foreground/80">Opened</span>
                    <span className="text-sm font-medium">{curtains ? curtainPct : 0}%</span>
                  </div>
                  <Slider value={curtainPct} onChange={setCurtainPct} />
                </Card>
              </div>
              <div className="col-start-7 col-span-3 row-start-3">
                <Card on={purifier}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Air purifier</span>
                    <Toggle on={purifier} onChange={setPurifier} />
                  </div>
                  <div className="font-serif text-3xl mt-2">{purifier ? "85" : "0"}<span className="text-xl">%</span></div>
                </Card>
              </div>
              <div className="col-start-10 col-span-3 row-start-3 flex justify-end">
                <Card className="flex items-center gap-3 px-4 py-2.5 h-fit">
                  <span className="text-xs">Sound</span>
                  <Toggle on={soundOn} onChange={setSoundOn} />
                  <Volume2 className={`w-4 h-4 ${soundOn ? 'text-gold' : 'text-muted-foreground'}`} />
                </Card>
              </div>
              <div className="col-start-4 col-span-3 row-start-5">
                <Card>
                  <div className="text-[11px] text-muted-foreground mb-2">Smart hub</div>
                  <div className="flex items-center gap-3">
                    {["G", "A", ""].map((l, i) => (
                      <div key={i} className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center text-xs hover:bg-gold/20 transition-colors">
                        {i === 2 ? <Sun className="w-4 h-4" /> : l}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="col-start-7 col-span-3 row-start-5">
                <Card>
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowLightsList(!showLightsList)}>
                    <span className="text-[11px] text-muted-foreground">Ambient lighting</span>
                    <Flame className={`w-3 h-3 ${showLightsList ? 'text-white' : 'text-gold'}`} />
                  </div>
                  {!showLightsList ? (
                    <>
                      <div className="text-[11px] mt-1">Warm</div>
                      <Slider value={ambient} onChange={setAmbient} />
                    </>
                  ) : (
                    <div className="mt-2 space-y-1 text-[9px] text-foreground/80 h-[60px] overflow-y-auto custom-scrollbar">
                      <p>Chandelier</p>
                      <p>Recessed downlights</p>
                      <p>Cove lighting</p>
                      <p>Pendant lights</p>
                      <p>Wall sconces</p>
                      <p>Arc floor lamp</p>
                      <p>Torchiere floor lamp</p>
                      <p>Table lamp</p>
                      <p>LED strip backlighting</p>
                    </div>
                  )}
                </Card>
              </div>
              <div className="col-start-10 col-span-3 row-start-5 row-span-2">
                <Card on={soundOn}>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 float-slow" />
                    <div className="flex-1">
                      <div className="text-[10px] text-muted-foreground">Now playing</div>
                      <div className="text-xs font-medium">Blinding Lights</div>
                      <div className="text-[10px] text-muted-foreground">The Weeknd</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Volume</span>
                      <span>{volume}%</span>
                    </div>
                    <Slider value={volume} onChange={setVolume} />
                  </div>
                  <div className="flex items-center justify-between mt-4 text-foreground/80">
                    <SkipBack className="w-3.5 h-3.5" />
                    <button onClick={() => setSoundOn(!soundOn)}>
                      {soundOn ? <Pause className="w-4 h-4 text-gold pulse-dot" /> : <Play className="w-4 h-4 text-gold" />}
                    </button>
                    <SkipForward className="w-3.5 h-3.5" />
                  </div>
                  <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop />
                </Card>
              </div>
            </div>
          </div>

          {/* ROOM 2 BEDROOM */}
          <div className="relative h-full" style={{ width: `${100 / rooms.length}%`, flexShrink: 0 }}>
            <img src={rooms[1].img} alt="Bedroom" className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700"
              style={{ filter: coolBright ? "brightness(0.95) contrast(1.1)" : warmWhite ? "brightness(0.8) sepia(0.3)" : "brightness(0.2)" }} />
            <div className="absolute inset-0 bg-background/20" />
            <CurtainsOverlay pct={bedCurtain} />
            <div className="absolute inset-0 transition-opacity duration-700 mix-blend-overlay pointer-events-none"
              style={{ backgroundColor: warmWhite ? 'rgba(255, 140, 0, 0.25)' : coolBright ? 'rgba(150, 200, 255, 0.2)' : 'transparent' }} />

            <div className={`absolute inset-0 p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 md:gap-4 z-20 pointer-events-none *:pointer-events-auto transition-opacity duration-500 ${previewMode ? 'opacity-0' : 'opacity-100'}`}>
              <div className="col-start-1 col-span-3 row-start-2">
                <Card className="flex items-center justify-between px-4 py-3">
                  <span className="text-[11px] font-medium">Warm White</span>
                  <Toggle on={warmWhite} onChange={(v) => { setWarmWhite(v); if (v) setCoolBright(false); }} accent="gold" />
                </Card>
              </div>
              <div className="col-start-5 col-span-3 row-start-2">
                <Card className="flex items-center justify-between px-4 py-3">
                  <span className="text-[11px] font-medium">Cool White</span>
                  <Toggle on={coolBright} onChange={(v) => { setCoolBright(v); if (v) setWarmWhite(false); }} accent="blue" />
                </Card>
              </div>

              <div className="col-start-1 col-span-3 row-start-3 row-span-3">
                <Card on={bedAc}>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">Air conditioner</span><Toggle on={bedAc} onChange={() => { }} accent="red" /></div>
                  <div className="font-serif text-4xl mt-2">22 <span className="text-2xl">°C</span></div>
                  <div className="mt-3 space-y-2 text-[11px]">
                    <Row label="Mode" val={<span className="flex items-center gap-1">Cold <Snowflake className="w-3 h-3" /></span>} />
                    <Row label="Auto turn on" val="21:00 PM" />
                    <Row label="Auto turn off" val="19:00 PM" />
                    <Row label="Wind" val={<Wind className="w-3 h-3 text-gold" />} />
                  </div>
                </Card>
              </div>
              <div className="col-start-4 col-span-2 row-start-3 row-span-2">
                <Card on={cleaner}>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">Cleaner</span><Toggle on={cleaner} onChange={setCleaner} /></div>
                  <div className="font-serif text-3xl mt-3">97%</div>
                  <Battery className="w-4 h-4 text-gold mt-1" />
                </Card>
              </div>
              {/* Removed Smart TV and Home Cleaning service */}
              <div className="col-start-4 col-span-5 row-start-5">
                <Card>
                  <div className="text-[11px] text-muted-foreground">Curtains</div>
                  <div className="flex items-center justify-between mt-1"><span className="text-[11px]">Opened</span><span className="text-sm">{bedCurtain}%</span></div>
                  <Slider value={bedCurtain} onChange={setBedCurtain} accent="red" />
                </Card>
              </div>
              <div className="col-start-9 col-span-4 row-start-5">
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-pink-500 to-purple-700 flex items-center justify-center float-slow"><Music className="w-5 h-5 text-white" /></div>
                    <div className="flex-1">
                      <div className="text-xs font-medium">Black Space</div>
                      <div className="text-[10px] text-muted-foreground">Taylor Swift</div>
                      <div className="text-[10px] text-muted-foreground mt-1">01:23 / 03:24</div>
                    </div>
                  </div>
                  <div className="h-1 bg-foreground/10 rounded-full mt-2 overflow-hidden"><div className="h-full w-2/5 bg-destructive" /></div>
                  <div className="flex items-center justify-between mt-2 text-foreground/80">
                    <Shuffle className="w-3 h-3" /><SkipBack className="w-3.5 h-3.5" />
                    <button onClick={() => setSoundOn(!soundOn)}>
                      {soundOn ? <Pause className="w-4 h-4 text-gold pulse-dot" /> : <Play className="w-4 h-4 text-gold" />}
                    </button>
                    <SkipForward className="w-3.5 h-3.5" /><Repeat className="w-3 h-3" />
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* ROOM 3 DINING */}
          <div className="relative h-full" style={{ width: `${100 / rooms.length}%`, flexShrink: 0 }}>
            <img src={rooms[2].img} alt="Dining" className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700"
              style={{ filter: (!pendant && !wallLights) ? "brightness(0.4)" : "brightness(0.95)" }} />
            <div className="absolute inset-0 bg-background/20" />

            {/* Pendants blackout overlay */}
            <div className="absolute inset-0 transition-opacity duration-700 pointer-events-none mix-blend-multiply"
              style={{ opacity: pendant ? 0 : 0.85, background: 'radial-gradient(ellipse 100% 70% at top, black 0%, transparent 60%)' }} />

            {/* Wall lights blackout overlay */}
            <div className="absolute inset-0 transition-opacity duration-700 pointer-events-none mix-blend-multiply"
              style={{ opacity: wallLights ? 0 : 0.8, background: 'linear-gradient(90deg, black 0%, transparent 25%, transparent 75%, black 100%)' }} />

            <CurtainsOverlay pct={diningCurtain} />

            <div className={`absolute inset-0 p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 md:gap-4 z-20 pointer-events-none *:pointer-events-auto transition-opacity duration-500 ${previewMode ? 'opacity-0' : 'opacity-100'}`}>
              <div className="col-start-2 col-span-3 row-start-2"><Card className="flex items-center justify-between px-4 py-3"><span className="text-[11px]">Pendant lights</span><Toggle on={pendant} onChange={setPendant} /></Card></div>
              <div className="col-start-9 col-span-3 row-start-2"><Card className="flex items-center justify-between px-4 py-3"><span className="text-[11px]">Wall lights</span><Toggle on={wallLights} onChange={setWallLights} /></Card></div>
              <div className="col-start-1 col-span-3 row-start-3 row-span-2">
                <Card>
                  <div className="text-[11px] text-muted-foreground">Temperature</div>
                  <div className="font-serif text-4xl mt-2">24 <span className="text-2xl">°C</span></div>
                  <div className="mt-3 space-y-2 text-[11px]">
                    <Row label="Mode" val={<span className="flex items-center gap-1">Cool <Snowflake className="w-3 h-3" /></span>} />
                    <Row label="Fan speed" val="Low" />
                  </div>
                </Card>
              </div>
              <div className="col-start-5 col-span-4 row-start-4">
                <Card>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Flowers</span>
                    <span className="text-[11px]">Water level {waterLevel}%</span>
                  </div>
                  {waterLevel <= 20 && (
                    <div className="flex items-center gap-1 text-[10px] text-destructive mt-1 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive pulse-dot shrink-0" /> Warning: Water level low!
                    </div>
                  )}
                  <Slider value={waterLevel} onChange={setWaterLevel} accent="blue" />
                </Card>
              </div>
              {/* Removed Security Camera */}
              <div className="col-start-1 col-span-3 row-start-6">
                <Card>
                  <div className="text-[11px] text-muted-foreground">Smart speaker</div>
                  <div className="text-[11px] mt-1 italic font-italic">Playing · Dinner Jazz</div>
                  <div className="flex items-center justify-between mt-2 text-foreground/80">
                    <SkipBack className="w-3.5 h-3.5" />
                    <button onClick={() => setSoundOn(!soundOn)}>
                      {soundOn ? <Pause className="w-4 h-4 text-gold pulse-dot" /> : <Play className="w-4 h-4 text-gold" />}
                    </button>
                    <SkipForward className="w-3.5 h-3.5" />
                  </div>
                </Card>
              </div>
              <div className="col-start-4 col-span-5 row-start-6">
                <Card>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">Curtains</span><span className="text-[11px]">Opened {diningCurtain}%</span></div>
                  <Slider value={diningCurtain} onChange={setDiningCurtain} />
                </Card>
              </div>
            </div>
          </div>

          {/* ROOM 4 BATHROOM */}
          <div className="relative h-full" style={{ width: `${100 / rooms.length}%`, flexShrink: 0 }}>
            <img src={rooms[3].img} alt="Bathroom" className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700"
              style={{ filter: `brightness(${vanityLight ? 0.9 : 0.6}) saturate(${showerLight ? 1.1 : 0.7})` }} />
            <div className="absolute inset-0 bg-background/20" />

            <div className={`absolute inset-0 p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 md:gap-4 z-20 pointer-events-none *:pointer-events-auto transition-opacity duration-500 ${previewMode ? 'opacity-0' : 'opacity-100'}`}>
              <div className="col-start-9 col-span-4 row-start-2">
                <Card className="flex flex-col px-4 py-3">
                  <div className="flex items-center justify-between"><span className="text-[11px]">Exhaust fan</span><Toggle on={exhaust} onChange={setExhaust} /></div>
                  {!exhaust && (
                    <div className="text-[9px] text-destructive flex items-center gap-1 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive pulse-dot shrink-0" /> Unhygienic foul smell detected!
                    </div>
                  )}
                </Card>
              </div>
              <div className="col-start-1 col-span-3 row-start-3 row-span-2">
                <Card>
                  <div className="text-[11px] text-muted-foreground">Temperature</div>
                  <div className="font-serif text-4xl mt-2">24 <span className="text-2xl">°C</span></div>
                  <div className="mt-3 space-y-2 text-[11px]">
                    <Row label="Mode" val={<span className="flex items-center gap-1">Warm <Flame className="w-3 h-3 text-gold" /></span>} />
                    <Row label="Fan" val={exhaust ? "Medium" : "Off"} />
                  </div>
                </Card>
              </div>
              <div className="col-start-5 col-span-4 row-start-3 row-span-2">
                <Card>
                  <div className="text-[11px] text-muted-foreground">Smart mirror</div>
                  <div className="font-serif text-4xl mt-2">09:30 <span className="text-xl">AM</span></div>
                  <div className="text-[11px] mt-1 text-muted-foreground">Monday, 6 May</div>
                  <div className="text-[11px] mt-1 flex items-center gap-1">24°C <Sun className="w-3 h-3 text-gold" /></div>
                </Card>
              </div>
              <div className="col-start-9 col-span-4 row-start-3 row-span-2">
                <Card>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">Water heater</span></div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-serif text-4xl">{waterTemp} <span className="text-2xl">°C</span></span>
                    <div className="flex flex-col">
                      <button onClick={() => setWaterTemp(t => t + 1)}><ChevronUp className="w-4 h-4 text-gold" /></button>
                      <button onClick={() => setWaterTemp(t => t - 1)}><ChevronDown className="w-4 h-4 text-gold" /></button>
                    </div>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-2">Heating · On</div>
                </Card>
              </div>
              <div className="col-start-1 col-span-4 row-start-5">
                <Card className="flex items-center justify-between px-4 py-3">
                  <span className="text-[11px]">Vanity lights</span>
                  <Toggle on={vanityLight} onChange={setVanityLight} accent="gold" />
                </Card>
              </div>
              <div className="col-start-5 col-span-4 row-start-5">
                <Card className="flex items-center justify-between px-4 py-3">
                  <span className="text-[11px]">Shower lights</span>
                  <Toggle on={showerLight} onChange={setShowerLight} accent="blue" />
                </Card>
              </div>
              <div className="col-start-7 col-span-6 row-start-6">
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-md bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center float-slow"><Music className="w-4 h-4 text-white" /></div>
                    <div className="flex-1">
                      <div className="text-[10px] text-muted-foreground">Bathroom music</div>
                      <div className="text-xs font-medium">Calm Morning</div>
                      <div className="text-[10px] text-muted-foreground">Acoustic</div>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                      <SkipBack className="w-3.5 h-3.5" />
                      <button onClick={() => setSoundOn(!soundOn)}>
                        {soundOn ? <Pause className="w-4 h-4 text-gold pulse-dot" /> : <Play className="w-4 h-4 text-gold" />}
                      </button>
                      <SkipForward className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* ROOM 5 PARTY HALL */}
          <div className="relative h-full" style={{ width: `${100 / rooms.length}%`, flexShrink: 0 }}>
            <img src={rooms[4].img} alt="Party Hall" className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700"
              style={{ filter: "brightness(0.7) contrast(1.2)" }} />
            <div className="absolute inset-0 bg-background/20" />

            {/* Vibrant lighting overlay */}
            <div className="absolute inset-0 transition-opacity duration-1000 mix-blend-color pointer-events-none"
              style={{
                opacity: vibrantLight ? 0.8 : 0,
                background: 'linear-gradient(45deg, #ff007f, #7f00ff, #00ffff)',
                animation: vibrantLight ? 'hue-spin 4s linear infinite' : 'none'
              }} />

            <CurtainsOverlay pct={partyCurtain} />

            <div className={`absolute inset-0 p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 md:gap-4 z-20 pointer-events-none *:pointer-events-auto transition-opacity duration-500 ${previewMode ? 'opacity-0' : 'opacity-100'}`}>

              <div className="col-start-1 col-span-4 row-start-2">
                <Card className="flex items-center justify-between px-4 py-3">
                  <span className="text-[11px]">Vibrant lighting</span>
                  <Toggle on={vibrantLight} onChange={setVibrantLight} accent="blue" />
                </Card>
              </div>

              <div className="col-start-9 col-span-3 row-start-2">
                <Card className="flex items-center justify-between px-4 py-3">
                  <span className="text-[11px]">AC</span>
                  <Toggle on={partyAc} onChange={setPartyAc} accent="blue" />
                </Card>
              </div>

              <div className="col-start-8 col-span-5 row-start-4">
                <Card>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">Curtains</span><span className="text-[11px]">Opened {partyCurtain}%</span></div>
                  <Slider value={partyCurtain} onChange={setPartyCurtain} />
                </Card>
              </div>

              <div className="col-start-1 col-span-6 row-start-6">
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-md bg-gradient-to-br from-fuchsia-500 to-rose-500 flex items-center justify-center float-slow"><Music className="w-4 h-4 text-white" /></div>
                    <div className="flex-1">
                      <div className="text-[10px] text-muted-foreground">DJ System</div>
                      <div className="text-xs font-medium">Electronic Dance</div>
                      <div className="text-[10px] text-muted-foreground">High Energy</div>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                      <SkipBack className="w-3.5 h-3.5" />
                      <button onClick={() => setSoundOn(!soundOn)}>
                        {soundOn ? <Pause className="w-4 h-4 text-gold pulse-dot" /> : <Play className="w-4 h-4 text-gold" />}
                      </button>
                      <SkipForward className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="col-start-8 col-span-5 row-start-6 flex justify-end items-end pb-4 pointer-events-none">
                <a
                  href="/#contact"
                  onClick={handleContactClick}
                  className="group flex items-center gap-2 md:gap-3 font-['Anton'] text-2xl md:text-4xl text-[#c8a44a] uppercase tracking-wider hover:opacity-80 transition-opacity duration-300 pointer-events-auto"
                >
                  <span className="relative drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    CONTACT
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#c8a44a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
                  </span>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c8a44a] text-black flex items-center justify-center transform group-hover:translate-x-2 transition-transform duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* progress */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          {rooms.map((_, i) => (
            <span key={i} className={`h-px transition-all duration-500 ${active === i ? "w-10 bg-gold" : "w-5 bg-foreground/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Row = ({ label, val }: { label: string; val: React.ReactNode }) => (
  <div className="flex items-center justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground/90">{val}</span>
  </div>
);

export default SmartHome;
