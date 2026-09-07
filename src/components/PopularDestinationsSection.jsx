import React, { useState } from 'react';
import { FEATURED_DESTINATIONS, MORE_DESTINATIONS } from '../data/destinationsData';
import { Compass, ArrowRight, ChevronDown } from 'lucide-react';

export default function PopularDestinationsSection({ onOpenBooking }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="popular-destinations" className="py-20 bg-slate-900/60 relative border-t border-slate-800">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>OUTSTATION CIRCUITS</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Popular Places <span className="text-amber-500">from Prayagraj</span>
          </h2>
        </div>

        {/* Featured Destination Cards — horizontally scrollable */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {FEATURED_DESTINATIONS.map((dest) => {
            return (
              <div
                key={dest.id}
                className="flex-shrink-0 w-[240px] snap-start glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col shadow-xl"
              >
                <div className="relative h-32 bg-slate-900 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 space-y-2 flex-grow">
                  <h3 className="text-base font-bold text-white leading-tight">{dest.name}</h3>
                  <span className="text-[11px] text-amber-400/90 font-medium block">{dest.subtitle}</span>
                  <span className="text-[11px] text-slate-400 block">{dest.state}</span>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => onOpenBooking(null, dest.name)}
                    className="w-full py-2.5 bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold rounded-xl border border-amber-500/30 transition duration-200 flex items-center justify-center space-x-1.5 text-xs cursor-pointer"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All Destinations */}
        <div className="mt-8 bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-900/40 transition"
          >
            <span className="text-sm font-bold text-white">Explore All Destinations</span>
            <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>

          {showAll && (
            <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-slate-800 pt-5">
              {MORE_DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => onOpenBooking(null, dest.name)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition text-left cursor-pointer"
                >
                  <span className="text-sm font-semibold text-slate-200">{dest.name}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
