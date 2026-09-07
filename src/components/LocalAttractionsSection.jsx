import React, { useState } from 'react';
import { LOCAL_ATTRACTIONS } from '../data/localAttractionsData';
import { getLocalAttractionWhatsAppLink } from '../data/fleetData';
import {
  Landmark,
  Clock,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export default function LocalAttractionsSection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Sacred & Spiritual', 'Historical & Architectural', 'Heritage & Museum', 'Heritage & Park'];

  const filteredAttractions = activeCategory === 'All'
    ? LOCAL_ATTRACTIONS
    : LOCAL_ATTRACTIONS.filter(item => item.category === activeCategory);

  return (
    <section id="local-attractions" className="py-20 bg-slate-950 relative border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>PRAYAGRAJ SIGHTSEEING</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Local <span className="text-amber-500">Attractions</span>
          </h2>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl inline-flex space-x-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Attractions Row — horizontally scrollable */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {filteredAttractions.map((place) => {
            const whatsappUrl = getLocalAttractionWhatsAppLink(place.name);

            return (
              <div
                key={place.id}
                className="flex-shrink-0 w-[260px] snap-start glass-card rounded-2xl overflow-hidden flex flex-col border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group shadow-xl"
              >
                <div className="relative h-36 bg-slate-900 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20 pointer-events-none"></div>
                </div>

                <div className="p-4 space-y-2 flex-grow">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition leading-tight">
                    {place.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{place.bestTime.split('(')[0].trim()}</span>
                  </p>
                </div>

                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition flex items-center justify-center cursor-pointer"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  </a>

                  <button
                    onClick={() => onOpenBooking(place.recommendedCar.split('/')[0].trim(), place.name)}
                    className="py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 transition text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
