import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate as useRouterNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Cursor from '@/components/Cursor';
import Loader from '@/components/Loader';
import AmbientOrbs from '@/components/AmbientOrbs';

import FarmImg from '@/assets/Solar/Farm.png';
import ApartmentsImg from '@/assets/Solar/Apartments.png';
import VillaImg from '@/assets/Solar/Villa.png';
import CommunityImg from '@/assets/Solar/Community.png';

const IMAGES = [
  { 
    src: FarmImg, 
    bg: '#050506', // premium dark
    panel: '#c8a44a', // gold
    label: 'Farm Land'
  },
  { 
    src: ApartmentsImg, 
    bg: '#0a0a0f', // dark variant
    panel: '#e8cc78', // bright gold
    label: 'Apartment'
  },
  { 
    src: VillaImg, 
    bg: '#020203', // deep dark
    panel: '#c8a44a', // gold
    label: 'Villa'
  },
  { 
    src: CommunityImg, 
    bg: '#0a0a0c', // dark elevated
    panel: '#7a5f1c', // deep gold
    label: 'Community'
  },
];

export default function SolarFencing() {
  const routerNavigate = useRouterNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    IMAGES.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 650);

    setActiveIndex((prev) => {
      if (direction === 'next') return (prev + 1) % 4;
      return (prev + 3) % 4;
    });
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      navigate('next');
    }, 4000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    routerNavigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getRoleStyle = (index: number) => {
    const diff = (index - activeIndex + 4) % 4;
    const isCenter = diff === 0;
    const isRight = diff === 1;
    const isBack = diff === 2;
    const isLeft = diff === 3;

    const baseTransition = 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), top 650ms cubic-bezier(0.4,0,0.2,1)';

    const centerWidth = isMobile ? '85vw' : '50vw';
    const centerHeight = isMobile ? '42vh' : '70vh';

    if (isCenter) return {
      left: '50%',
      top: isMobile ? '42%' : '50%',
      transform: 'translate(-50%, -50%) scale(1)',
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 10,
      width: centerWidth,
      height: centerHeight,
      transition: baseTransition
    };

    if (isRight) return {
      left: isMobile ? '85%' : '80%',
      top: isMobile ? '42%' : '50%',
      transform: 'translate(-50%, -50%) scale(0.75)',
      opacity: 0.6,
      filter: 'blur(8px)',
      zIndex: 5,
      width: centerWidth,
      height: centerHeight,
      transition: baseTransition
    };

    if (isLeft) return {
      left: isMobile ? '15%' : '20%',
      top: isMobile ? '42%' : '50%',
      transform: 'translate(-50%, -50%) scale(0.75)',
      opacity: 0.6,
      filter: 'blur(8px)',
      zIndex: 5,
      width: centerWidth,
      height: centerHeight,
      transition: baseTransition
    };

    // isBack
    return {
      left: '50%',
      top: isMobile ? '35%' : '40%',
      transform: 'translate(-50%, -50%) scale(0.5)',
      opacity: 0.2,
      filter: 'blur(16px)',
      zIndex: 1,
      width: centerWidth,
      height: centerHeight,
      transition: baseTransition
    };
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden flex flex-col font-['Inter']"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <Loader />
      <Cursor />
      <AmbientOrbs className="absolute inset-0 z-0 opacity-60 mix-blend-screen" />
      {/* 1. Grain Overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. Giant Ghost Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden"
      >
        <h1 
          className="text-[#c8a44a] font-['Anton'] tracking-tighter uppercase whitespace-nowrap opacity-5"
          style={{
            fontSize: 'clamp(90px, 28vw, 380px)',
            lineHeight: 0.8,
            letterSpacing: '-0.02em',
            textShadow: '0 20px 60px rgba(0,0,0,0.05)'
          }}
        >
          SOLAR SECURITY
        </h1>
      </div>

      {/* 3. Top-left Back to Home Button */}
      <button 
        onClick={() => routerNavigate('/')}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-3 text-[#c8a44a]/80 hover:text-[#c8a44a] transition-colors group pointer-events-auto"
      >
        <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-[#c8a44a]/30 flex items-center justify-center group-hover:bg-[#c8a44a]/10 transition-all duration-300">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="font-['Inter'] font-semibold tracking-[0.2em] uppercase text-xs hidden md:block">
          Solwas
        </span>
      </button>

      {/* Elegant Top-right Section Indicator */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 text-right">
        <h3 className="font-['Anton'] text-lg md:text-2xl text-white/30 uppercase tracking-widest">
          03 // Solar Fencing
        </h3>
        <p className="font-['Inter'] text-[10px] md:text-xs text-[#c8a44a] tracking-[0.3em] uppercase mt-1 md:mt-2">
          Premium Boundary Protection
        </p>
      </div>

      {/* 4. Carousel */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="absolute flex items-start justify-center pt-2 md:pt-20"
            style={getRoleStyle(idx)}
          >
            <img
              src={img.src}
              alt={img.label}
              className="absolute inset-0 w-full h-full pointer-events-auto"
              style={{
                objectFit: 'contain',
                objectPosition: 'bottom center',
              }}
            />
            <div className="relative z-20 pointer-events-auto transition-all duration-300">
              <span 
                className="font-['Anton'] uppercase text-3xl md:text-5xl tracking-wide whitespace-nowrap text-[#e8cc78]"
                style={{
                  textShadow: '0 4px 0px #7a5f1c, 0 10px 20px rgba(0,0,0,0.8)'
                }}
              >
                {img.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Bottom-left Content + Navigation */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-20 flex flex-col gap-6 md:gap-8 pointer-events-auto max-w-[450px]">
        <div className="flex flex-col gap-3">
          <h2 className="font-['Anton'] text-3xl md:text-5xl uppercase tracking-wide text-[#e8cc78] leading-[1.1]">
            SMART SOLAR FENCING
          </h2>
          {!isMobile && (
            <p className="font-['Inter'] text-sm md:text-base text-white/60 leading-relaxed font-medium">
              Protect what matters with intelligent solar-powered fencing. <br/>
              Engineered for farms, apartments, and villas — delivering <br/>
              24/7 security, energy efficiency, and low maintenance.
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('prev')}
            className="w-12 h-12 rounded-full border border-[#c8a44a]/30 flex items-center justify-center text-[#c8a44a] bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#c8a44a]/10 hover:shadow-[0_0_20px_rgba(200,164,74,0.3)]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('next')}
            className="w-12 h-12 rounded-full border border-[#c8a44a]/30 flex items-center justify-center text-[#c8a44a] bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#c8a44a]/10 hover:shadow-[0_0_20px_rgba(200,164,74,0.3)]"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20 pointer-events-auto">
        <a 
          href="/#contact"
          onClick={handleContactClick}
          className="group flex items-center gap-3 md:gap-4 font-['Anton'] text-2xl md:text-4xl text-[#c8a44a] uppercase tracking-wider hover:opacity-80 transition-opacity duration-300"
        >
          <span className="relative">
            CONTACT
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#c8a44a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
          </span>
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#c8a44a] text-black flex items-center justify-center transform group-hover:translate-x-2 transition-transform duration-300">
            <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7" />
          </div>
        </a>
      </div>
    </div>
  );
}
