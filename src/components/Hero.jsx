import React from 'react';
import { Compass, Users, MapPin, ArrowRight, Sparkles, PhoneCall, MessageCircle, Landmark } from 'lucide-react';
import { OWNER_PHONE, OWNER_WHATSAPP_NUMBER } from '../data/fleetData';

export default function Hero({ onOpenBooking, scrollToCalculator }) {
  const scrollToAttractions = () => {
    const el = document.getElementById('local-attractions');
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
              <span>Jit Tours and Travels &bull; UP & MP Tour & Taxi Services</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Explore <span className="text-gradient-amber">UP & MP Sacred Tours</span> & Local Sightseeing
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Book verified <strong className="text-amber-400">Dzire 5-Seater</strong>, <strong className="text-amber-400">Ertiga 7-Seater</strong>, and <strong className="text-amber-400">Innova Crysta 7-Seater</strong> for Prayagraj Local Sightseeing, Varanasi, Ayodhya, Chitrakoot, Rewa, Khajuraho & Maihar.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-7 py-4 rounded-xl shadow-xl shadow-amber-500/20 active:scale-95 transition text-base cursor-pointer"
              >
                <span>Plan Trip & Cab Inquiry</span>
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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 font-bold text-xs text-center">
                  UP/MP
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">24+ Destinations</span>
                  <span className="block text-[11px] text-slate-400">Prayagraj, Ayodhya, Kashi</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">5 & 7 Seaters</span>
                  <span className="block text-[11px] text-slate-400">Dzire, Ertiga & Innova</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  ★ 4.95
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">100% Reliable</span>
                  <span className="block text-[11px] text-slate-400">Direct Owner Contact</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Fleet Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-amber-500/30 via-slate-800/50 to-slate-900 shadow-2xl">
              <div className="bg-slate-950 rounded-xl overflow-hidden p-6 space-y-5">
                
                <div className="relative rounded-lg overflow-hidden h-56 bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
                    alt="Toyota Innova Crysta 7-Seater"
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                    👑 Premium 7-Seater MPV
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-500/90 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded">
                    UP & MP Tour Ready
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">Toyota Innova Crysta</h3>
                    <p className="text-xs text-slate-400">7-Seater Luxury MPV &bull; Captain Seats &bull; Dual AC</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-amber-400">₹21</span>
                    <span className="text-xs text-slate-400 block">per km</span>
                  </div>
                </div>

                {/* Quick Owner Call/WhatsApp Bar */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${OWNER_PHONE}`}
                    className="flex items-center justify-center space-x-1.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 text-xs font-bold transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Owner</span>
                  </a>

                  <a
                    href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Jit Tours and Travels, I want to book Toyota Innova Crysta (7 Seater) for my trip.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Owner</span>
                  </a>
                </div>

                <button
                  onClick={() => onOpenBooking('Toyota Innova Crysta (7 Seater)')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition text-sm cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Book Innova Crysta Online
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
