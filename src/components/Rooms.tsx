import React from 'react';
import { ChevronDown } from 'lucide-react';
import livingRoomImg from '../assets/rooms/living_room.png';
import bedroomImg from '../assets/rooms/bedroom.png';
import kitchenImg from '../assets/rooms/kitchen.png';
import studyImg from '../assets/rooms/study.png';
import AmbientOrbs from './AmbientOrbs';

const roomsData = [
  {
    id: 'living-room',
    name: 'The Living Room',
    tagline: 'Where calm meets conversation.',
    image: livingRoomImg,
    items: ['Terrazzo flooring', 'Linen sofa in warm ivory', 'Walnut side table', 'Arched floor lamp', 'Jute area rug']
  },
  {
    id: 'bedroom',
    name: 'The Bedroom',
    tagline: 'Rest, elevated.',
    image: bedroomImg,
    items: ['Bouclé headboard', 'Blackout silk drapes', 'Travertine nightstand', 'Recessed ambient lighting', 'Hand-tufted wool rug']
  },
  {
    id: 'kitchen',
    name: 'The Kitchen',
    tagline: 'Craft and function, unified.',
    image: kitchenImg,
    items: ['Calacatta marble countertop', 'Matte black fixtures', 'Open oak shelving', 'Zellige tile backsplash', 'Integrated smeg appliances']
  },
  {
    id: 'study',
    name: 'The Study',
    tagline: 'Clarity starts here.',
    image: studyImg,
    items: ['Fluted glass cabinet', 'Leather chesterfield chair', 'Smoked oak desk', 'Articulating brass lamp', 'Herringbone parquet floor']
  }
];

export default function Rooms() {
  return (
    <section id="rooms" className="relative w-full min-h-screen px-6 sm:px-12 md:px-20 lg:px-28 py-20 bg-[#0d0d0b]">
      <AmbientOrbs className="absolute inset-0 z-0" />
      
      {/* Section Header */}
      <div className="relative z-10 mb-16">
        <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-3">Our Spaces</p>
        <h2 className="text-[2.5rem] sm:text-[3.5rem] leading-[1.05] font-light text-white tracking-tight">
          Rooms, refined.
        </h2>
      </div>

      {/* Rooms List */}
      <div className="relative z-10 flex flex-col">
        {roomsData.map((room) => (
          <div key={room.id} className="relative w-full rounded-2xl overflow-hidden mb-6 cursor-pointer group h-[60vh]">
            <img 
              src={room.image} 
              alt={room.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:ring-1 group-hover:ring-white/10" />
            
            {/* Bottom-left info */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 z-10">
              <h3 className="text-[1.4rem] sm:text-[1.8rem] font-light text-white tracking-tight">{room.name}</h3>
              <p className="text-[12px] text-stone-400 mt-1">{room.tagline}</p>
            </div>

            {/* Hover Item Tags */}
            <div className="absolute top-6 right-6 flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 z-10">
              {room.items.map((item, index) => (
                <div 
                  key={index} 
                  className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 flex flex-col items-center gap-2 mt-10">
        <ChevronDown size={16} className="text-stone-500 animate-bounce" />
      </div>
    </section>
  );
}
