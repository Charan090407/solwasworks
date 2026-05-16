import React, { useEffect } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Cursor from "@/components/Cursor";
import Rooms from './components/Rooms';
import Contact from './components/Contact';
import AmbientOrbs from './components/AmbientOrbs';
import backgroundVideo from './assets/hero/Interior-background.mp4';

export default function Interiors() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f0f0ee]">
      <Cursor />
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
        />
        
        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Back to Home Button */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 sm:top-10 sm:left-12 z-50 flex items-center gap-3 text-white/80 hover:text-white transition-colors group pointer-events-auto"
        >
          <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-medium hidden sm:block drop-shadow-md">
            Return Home
          </span>
        </Link>

        {/* Elegant Top-right Section Indicator */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 text-right pointer-events-none drop-shadow-md">
          <h3 className="font-['Anton'] text-lg md:text-2xl text-white/30 uppercase tracking-widest">
            01 // Interiors
          </h3>
          <p className="font-['Inter'] text-[10px] md:text-xs text-amber-300 tracking-[0.3em] uppercase mt-1 md:mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Turnkey Design Solutions
          </p>
        </div>

        {/* Foreground content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Hero content */}
          <div className="flex-1 flex items-end pb-10 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
            <div className="max-w-3xl relative z-20">
              <a 
                href="#" 
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-200 hover:text-white transition-colors mb-4 group tracking-wide uppercase drop-shadow-md"
              >
                As featured in Architectural Digest
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </a>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] font-instrument font-medium text-white tracking-tight mb-6 [text-shadow:0_4px_30px_rgba(0,0,0,0.7),0_1px_3px_rgba(0,0,0,0.8)]">
                Spaces designed to feel like you &mdash; <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 italic filter drop-shadow-[0_2px_15px_rgba(251,191,36,0.25)]">only better.</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light mb-8 max-w-lg [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
                Transform any room, effortlessly.
              </p>
              
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white border border-white/50 rounded-full px-5 py-2.5 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-200 group"
              >
                Book a free consultation
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </a>
            </div>
          </div>
          {/* Scroll Down Prompt */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
            <span className="text-[10px] sm:text-[11px] text-white/70 uppercase tracking-[0.2em] drop-shadow-md">Scroll down</span>
            <ChevronDown size={16} className="text-white/70 animate-bounce drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <Rooms />

      {/* Contact Section */}
      <div className="relative bg-black/80 backdrop-blur-sm">
        <AmbientOrbs className="absolute inset-0 z-0" />
        <Contact />
      </div>
    </div>
  );
}
