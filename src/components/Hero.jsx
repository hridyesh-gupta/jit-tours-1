import React from 'react';
import { ShieldAlert, Compass, Users, MapPin, ArrowRight, Star, Sparkles } from 'lucide-react';

export default function Hero({ onOpenBooking, scrollToCalculator }) {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      {/* Ambient background glow mesh */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>India's Premium Intra-City & Outstation Car Rentals</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Explore India with <span className="text-gradient-amber">Comfortable Outstation</span> Car Rentals
            </h1>

            {/* Subhead (Strictly under 20 words per taste design rules) */}
            <p className="text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Book verified 4-seater sedans and 7-seater MPVs across India for outstation road trips under 1,500 km.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-7 py-4 rounded-xl shadow-xl shadow-amber-500/20 active:scale-95 transition text-base cursor-pointer"
              >
                <span>Plan Booking Inquiry</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={scrollToCalculator}
                className="flex items-center justify-center space-x-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold px-6 py-4 rounded-xl transition text-base cursor-pointer"
              >
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Check 1500 km Limit</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 font-bold text-sm">
                  1500
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">KM Limit Radius</span>
                  <span className="block text-[11px] text-slate-400">Zero Driver Fatigue</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">4 & 7 Seaters</span>
                  <span className="block text-[11px] text-slate-400">Sedans, MPVs & SUVs</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  ★ 4.9
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">10,000+ Trips</span>
                  <span className="block text-[11px] text-slate-400">Instant Gmail Alerts</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Fleet Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-amber-500/30 via-slate-800/50 to-slate-900 shadow-2xl">
              <div className="bg-slate-950 rounded-xl overflow-hidden p-6 space-y-6">
                
                <div className="relative rounded-lg overflow-hidden h-56 bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
                    alt="Toyota Innova Crysta 7-Seater"
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                    👑 Premium 7-Seater Choice
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-500/90 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded">
                    Max 1,500 km Safe Route
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Toyota Innova Crysta</h3>
                    <p className="text-xs text-slate-400">7-Seater MPV &bull; Captain Seats &bull; Dual AC</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-amber-400">₹21</span>
                    <span className="text-xs text-slate-400 block">per km</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Outstation Ready</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <span>Chauffeur / Self Drive</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking('7-Seater MPV (Innova Crysta / Ertiga)')}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-lg border border-amber-500/30 transition text-sm cursor-pointer"
                >
                  Quick Reserve 7-Seater
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
