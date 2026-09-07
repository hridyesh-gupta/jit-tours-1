import React from 'react';
import { Users, ArrowRight, Sparkles, Landmark, Star } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  const scrollToAttractions = () => {
    const el = document.getElementById('local-attractions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFleet = () => {
    const el = document.getElementById('fleet');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      {/* Ambient background glow mesh */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>UP & MP Tour & Taxi Services</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Explore <span className="text-gradient-amber">UP & MP</span> With a Trusted Cab
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Verified cars and chauffeurs for local sightseeing and outstation trips across Uttar Pradesh and Madhya Pradesh.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-7 py-4 rounded-xl shadow-xl shadow-amber-500/20 active:scale-95 transition text-base cursor-pointer"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={scrollToAttractions}
                className="flex items-center justify-center space-x-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold px-6 py-4 rounded-xl transition text-base cursor-pointer"
              >
                <Landmark className="w-5 h-5 text-amber-400" />
                <span>Prayagraj Sightseeing</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2.5">
                <Landmark className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-xs font-bold text-white">24+ Destinations</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Users className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-xs font-bold text-white">5 to 17 Seaters</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Star className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs font-bold text-white">4.95 Rated</span>
              </div>
            </div>

          </div>

          {/* Right Visual — photo only, details live in the Fleet section below */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-amber-500/30 via-slate-800/50 to-slate-900 shadow-2xl">
              <button
                onClick={scrollToFleet}
                className="block w-full rounded-xl overflow-hidden h-72 lg:h-96 bg-white cursor-pointer group relative"
              >
                <img
                  src="/images/innova-new.png"
                  alt="Our fleet"
                  className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition duration-500"
                />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950 text-amber-400 text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-1.5">
                  <span>See Full Fleet & Prices</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
