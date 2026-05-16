import { useEffect, useRef } from "react";
import backgroundVideo from "../assets/hero/Background-Hero.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const monitorVideo = () => {
      if (video.duration) {
        const { currentTime, duration } = video;
        
        // Fade in: first 0.5s -> opacity 0 -> 1
        if (currentTime <= 0.5) {
          video.style.opacity = (currentTime / 0.5).toString();
        } 
        // Fade out: last 0.5s -> opacity 1 -> 0
        else if (duration - currentTime <= 0.5) {
          video.style.opacity = ((duration - currentTime) / 0.5).toString();
        } 
        // Middle: opacity 1
        else {
          video.style.opacity = "1";
        }
      }
      animationFrameId = requestAnimationFrame(monitorVideo);
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(console.error);
      }, 100);
    };

    video.addEventListener("play", () => {
      animationFrameId = requestAnimationFrame(monitorVideo);
    });
    
    video.addEventListener("ended", handleEnded);

    // Initial play setup
    video.style.opacity = "0";

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={backgroundVideo}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Hero Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-40 w-full h-full min-h-screen"
        style={{ paddingTop: "calc(8rem - 75px)" }}
      >
        <h1 className="font-instrument text-5xl sm:text-7xl md:text-8xl max-w-7xl leading-[0.95] tracking-[-2.46px] text-white animate-fade-rise">
          No <span className="italic text-white/80">Drama.</span> Only <span className="italic text-white/80">Damn Good</span> Interiors.
        </h1>
        
        <p className="font-inter text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-white/80 animate-fade-rise-delay">
          Solwas Pvt Ltd — Hyderabad's premium turnkey studio for interiors, home automation and solar fencing.
        </p>
        
        <a 
          href="#services"
          className="inline-block rounded-full px-14 py-5 text-base mt-12 bg-white text-black hover:scale-[1.03] transition-transform duration-300 animate-fade-rise-delay-2 font-inter"
        >
          Explore Collection
        </a>
      </div>
    </section>
  );
}