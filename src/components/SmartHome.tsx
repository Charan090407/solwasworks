import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sofa, Bed, Utensils, Bath, Plus, ChevronUp, ChevronDown, SkipBack, Pause, SkipForward, Wind, Phone, Shuffle, Repeat, Music, Sun, Snowflake, Flame, Battery } from "lucide-react";
import living from "@/assets/room-living.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import dining from "@/assets/room-dining.jpg";
import bathroom from "@/assets/room-bathroom.jpg";

const rooms = [
  { id: "living", label: "Living room", icon: Sofa, img: living },
  { id: "bedroom", label: "Bedroom", icon: Bed, img: bedroom },
  { id: "dining", label: "Dining room", icon: Utensils, img: dining },
  { id: "bathroom", label: "Bathroom", icon: Bath, img: bathroom },
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

const SmartHome = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current || !trackRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      const idx = Math.min(rooms.length - 1, Math.floor(p * rooms.length * 0.999));
      setActive(idx);
      trackRef.current.style.transform = `translateX(-${p * (rooms.length - 1) * 100 / rooms.length * (rooms.length / (rooms.length - 1))}%)`;
      // simpler: translate by p * (totalWidth - viewport)
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

  // state per room
  const [ceiling, setCeiling] = useState(true);
  const [tv, setTv] = useState(true);
  const [ac, setAc] = useState(true);
  const [acTemp, setAcTemp] = useState(22);
  const [curtains, setCurtains] = useState(true);
  const [curtainPct, setCurtainPct] = useState(75);
  const [purifier, setPurifier] = useState(true);
  const [ambient, setAmbient] = useState(60);

  // Bedroom
  const [tallLamp, setTallLamp] = useState(true);
  const [lampL, setLampL] = useState(true);
  const [lampR, setLampR] = useState(true);
  const [bedAc] = useState(true);
  const [cleaner, setCleaner] = useState(false);
  const [bedCurtain, setBedCurtain] = useState(50);
  const [smartTv, setSmartTv] = useState(false);

  // Dining
  const [pendant, setPendant] = useState(true);
  const [wallLights, setWallLights] = useState(true);
  const [waterLevel, setWaterLevel] = useState(60);
  const [diningCurtain, setDiningCurtain] = useState(45);

  // Bathroom
  const [exhaust, setExhaust] = useState(true);
  const [waterTemp, setWaterTemp] = useState(60);

  const lightsOn = [ceiling, tallLamp || lampL || lampR, pendant || wallLights, true][active];

  return (
    <section id="works" ref={wrapRef} className="relative" style={{ height: "500vh" }}>
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
          <button className="w-9 h-9 flex items-center justify-center rounded-full text-foreground/60 hover:text-foreground" data-cursor="link"><Plus className="w-4 h-4" /></button>
        </div>

        {/* Section label */}
        <div className="absolute top-6 left-6 z-30">
          <p className="font-italic text-gold tracking-[0.3em] text-[10px] uppercase">— Works · Smart Home Showcase</p>
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="flex h-full transition-transform duration-300 ease-out" style={{ width: `${rooms.length * 100}%` }}>
          {/* ROOM 1 LIVING */}
          <div className="relative h-full" style={{ width: `${100 / rooms.length}%`, flexShrink: 0 }}>
            <img src={rooms[0].img} alt="Living room" className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700" style={{ filter: ceiling ? "brightness(0.85)" : "brightness(0.35)" }} />
            <div className="absolute inset-0 bg-background/30" />
            <div className="absolute inset-0 p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 md:gap-4">
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
                    <Row label="Fan speed" val="Medium" />
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
                    <span className="text-sm font-medium">{curtainPct}%</span>
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
                  <div className="font-serif text-3xl mt-2">85<span className="text-xl">%</span></div>
                </Card>
              </div>
              <div className="col-start-10 col-span-3 row-start-3 flex justify-end">
                <Card className="flex items-center gap-3 px-4 py-2.5 h-fit">
                  <span className="text-xs">TV</span>
                  <Toggle on={tv} onChange={setTv} />
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
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Ambient lighting</span>
                    <Flame className="w-3 h-3 text-gold" />
                  </div>
                  <div className="text-[11px] mt-1">Warm</div>
                  <Slider value={ambient} onChange={setAmbient} />
                </Card>
              </div>
              <div className="col-start-10 col-span-3 row-start-5">
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 float-slow" />
                    <div className="flex-1">
                      <div className="text-[10px] text-muted-foreground">Now playing</div>
                      <div className="text-xs font-medium">Blinding Lights</div>
                      <div className="text-[10px] text-muted-foreground">The Weeknd</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-foreground/80">
                    <SkipBack className="w-3.5 h-3.5" /><Pause className="w-4 h-4 text-gold" /><SkipForward className="w-3.5 h-3.5" />
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* ROOM 2 BEDROOM */}
          <div className="relative h-full" style={{ width: `${100 / rooms.length}%`, flexShrink: 0 }}>
            <img src={rooms[1].img} alt="Bedroom" className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700" style={{ filter: (tallLamp || lampL || lampR) ? "brightness(0.9)" : "brightness(0.35)" }} />
            <div className="absolute inset-0 bg-background/30" />
            <div className="absolute inset-0 p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 md:gap-4">
              <div className="col-start-1 col-span-2 row-start-2"><Card className="flex items-center gap-2 px-3 py-2"><span className="text-[11px]">Tall lamp</span><Toggle on={tallLamp} onChange={setTallLamp} accent="red" /></Card></div>
              <div className="col-start-5 col-span-2 row-start-2"><Card className="flex items-center gap-2 px-3 py-2"><span className="text-[11px]">Lamps (L)</span><Toggle on={lampL} onChange={setLampL} accent="red" /></Card></div>
              <div className="col-start-9 col-span-2 row-start-2"><Card className="flex items-center gap-2 px-3 py-2"><span className="text-[11px]">Lamps (R)</span><Toggle on={lampR} onChange={setLampR} accent="red" /></Card></div>
              <div className="col-start-1 col-span-3 row-start-3 row-span-3">
                <Card on={bedAc}>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">Air conditioner</span><Toggle on={bedAc} onChange={() => {}} accent="red" /></div>
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
              <div className="col-start-6 col-span-3 row-start-4">
                <Card on={smartTv}>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">Smart TV</span><Toggle on={smartTv} onChange={setSmartTv} /></div>
                  <div className="flex gap-1.5 mt-2">
                    {["YT", "N", "aws"].map(l => <span key={l} className="px-2 py-1 rounded bg-foreground/10 text-[10px]">{l}</span>)}
                  </div>
                </Card>
              </div>
              <div className="col-start-9 col-span-4 row-start-4">
                <Card>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center"><Phone className="w-4 h-4 text-emerald-400" /></div>
                    <div className="flex-1 text-xs">Home cleaning service</div>
                  </div>
                </Card>
              </div>
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
                  <div className="flex items-center justify-between mt-2 text-foreground/80"><Shuffle className="w-3 h-3" /><SkipBack className="w-3.5 h-3.5" /><Pause className="w-4 h-4 text-gold" /><SkipForward className="w-3.5 h-3.5" /><Repeat className="w-3 h-3" /></div>
                </Card>
              </div>
            </div>
          </div>

          {/* ROOM 3 DINING */}
          <div className="relative h-full" style={{ width: `${100 / rooms.length}%`, flexShrink: 0 }}>
            <img src={rooms[2].img} alt="Dining" className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700" style={{ filter: (pendant || wallLights) ? "brightness(0.9)" : "brightness(0.4)" }} />
            <div className="absolute inset-0 bg-background/30" />
            <div className="absolute inset-0 p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 md:gap-4">
              <div className="col-start-2 col-span-2 row-start-2"><Card className="flex items-center gap-2 px-3 py-2"><span className="text-[11px]">Pendant lights</span><Toggle on={pendant} onChange={setPendant} /></Card></div>
              <div className="col-start-9 col-span-2 row-start-2"><Card className="flex items-center gap-2 px-3 py-2"><span className="text-[11px]">Wall lights</span><Toggle on={wallLights} onChange={setWallLights} /></Card></div>
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
                  <div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">Flowers</span><span className="text-[11px]">Water level {waterLevel}%</span></div>
                  <Slider value={waterLevel} onChange={setWaterLevel} accent="blue" />
                </Card>
              </div>
              <div className="col-start-9 col-span-4 row-start-4">
                <Card>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">Security camera</span><span className="text-[10px] flex items-center gap-1 text-destructive"><span className="w-1.5 h-1.5 rounded-full bg-destructive pulse-dot" />LIVE</span></div>
                  <div className="mt-2 h-14 rounded-md bg-foreground/10" />
                </Card>
              </div>
              <div className="col-start-1 col-span-3 row-start-6">
                <Card>
                  <div className="text-[11px] text-muted-foreground">Smart speaker</div>
                  <div className="text-[11px] mt-1 italic font-italic">Playing · Dinner Jazz</div>
                  <div className="flex items-center justify-between mt-2 text-foreground/80"><SkipBack className="w-3.5 h-3.5" /><Pause className="w-4 h-4 text-gold" /><SkipForward className="w-3.5 h-3.5" /></div>
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
            <img src={rooms[3].img} alt="Bathroom" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.85)" }} />
            <div className="absolute inset-0 bg-background/30" />
            <div className="absolute inset-0 p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 md:gap-4">
              <div className="col-start-9 col-span-3 row-start-2"><Card className="flex items-center gap-2 px-3 py-2"><span className="text-[11px]">Exhaust fan</span><Toggle on={exhaust} onChange={setExhaust} /></Card></div>
              <div className="col-start-1 col-span-3 row-start-3 row-span-2">
                <Card>
                  <div className="text-[11px] text-muted-foreground">Temperature</div>
                  <div className="font-serif text-4xl mt-2">24 <span className="text-2xl">°C</span></div>
                  <div className="mt-3 space-y-2 text-[11px]">
                    <Row label="Mode" val={<span className="flex items-center gap-1">Warm <Flame className="w-3 h-3 text-gold" /></span>} />
                    <Row label="Fan" val="Medium" />
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
              <div className="col-start-7 col-span-6 row-start-6">
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-md bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center float-slow"><Music className="w-4 h-4 text-white" /></div>
                    <div className="flex-1">
                      <div className="text-[10px] text-muted-foreground">Bathroom music</div>
                      <div className="text-xs font-medium">Calm Morning</div>
                      <div className="text-[10px] text-muted-foreground">Acoustic</div>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80"><SkipBack className="w-3.5 h-3.5" /><Pause className="w-4 h-4 text-gold" /><SkipForward className="w-3.5 h-3.5" /></div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* progress */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
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
