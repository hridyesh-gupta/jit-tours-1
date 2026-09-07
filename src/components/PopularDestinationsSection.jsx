import React, { useState } from 'react';
import { FEATURED_DESTINATIONS, MORE_DESTINATIONS } from '../data/destinationsData';
import {
  Flame,
  Landmark,
  Building2,
  CircleDot,
  Flower2,
  Mountain,
  Waves,
  TreePine,
  Compass,
  MapPinned,
  ArrowRight,
  ChevronDown,
  Car
} from 'lucide-react';

const ICONS = { Flame, Landmark, Building2, CircleDot, Flower2, Mountain, Waves, TreePine };

const CARD_GRADIENTS = [
  'from-amber-500/25 via-slate-900 to-slate-950',
  'from-orange-500/25 via-slate-900 to-slate-950',
  'from-rose-500/20 via-slate-900 to-slate-950',
  'from-emerald-500/20 via-slate-900 to-slate-950',
  'from-sky-500/20 via-slate-900 to-slate-950'
];

export default function PopularDestinationsSection({ onOpenBooking }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="popular-destinations" className="py-20 bg-slate-900/60 relative border-t border-slate-800">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>OUTSTATION CIRCUITS</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Popular Places to Visit <span className="text-amber-500">from Prayagraj</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From the ghats of Varanasi to the tiger reserves of Madhya Pradesh, we run chauffeur-driven trips across Uttar Pradesh and Madhya Pradesh's biggest destinations.
          </p>
        </div>

        {/* Featured Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_DESTINATIONS.map((dest, idx) => {
            const Icon = ICONS[dest.icon] || Compass;
            const gradient = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];

            return (
              <div
                key={dest.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Icon Banner (no stock photos — swap in real photos later) */}
                  <div className={`relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center border-b border-slate-800`}>
                    <Icon className="w-14 h-14 text-amber-400/90 stroke-[1.5]" />
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold text-slate-300 px-2.5 py-1 rounded-full border border-slate-800">
                      {dest.state}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                      <span className="text-xs text-amber-400/90 font-medium">{dest.subtitle}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{dest.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {dest.tags.map((tag, i) => (
                        <span key={i} className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <MapPinned className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{dest.approxDistance}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                      <Car className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span><strong className="text-slate-200">Ideal Car:</strong> {dest.recommendedCar}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenBooking(null, dest.name)}
                    className="w-full py-3 bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold rounded-xl border border-amber-500/30 transition duration-200 flex items-center justify-center space-x-2 text-sm cursor-pointer"
                  >
                    <span>Enquire About This Trip</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All Destinations */}
        <div className="mt-14 bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="w-full flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-slate-900/40 transition"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-bold text-white">Just Explore All Cities & Destinations</h3>
                <p className="text-xs text-slate-400">{MORE_DESTINATIONS.length} more places we regularly cover across UP & MP</p>
              </div>
            </div>
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
                  <div>
                    <span className="block text-sm font-semibold text-slate-200">{dest.name}</span>
                    <span className="block text-[11px] text-slate-500">{dest.state}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
                </button>
              ))}
              <div className="sm:col-span-2 lg:col-span-3 text-center text-xs text-slate-400 pt-2">
                Don't see your destination? <button onClick={() => onOpenBooking()} className="text-amber-400 font-semibold hover:underline cursor-pointer">Send us an enquiry anyway</button> — we cover custom routes across UP & MP.
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
