import React from 'react';
import { Compass, PhoneCall, CalendarCheck, MapPin } from 'lucide-react';
import { OWNER_PHONE, OWNER_PHONE_DISPLAY } from '../data/fleetData';

export default function Header({ onOpenBooking }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Compass className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white font-outfit">
                JIT<span className="text-amber-500"> TOURS & TRAVELS</span>
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono block -mt-1">
              Prayagraj, UP &bull; MP Tour & Car Rentals
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-300">
          <button onClick={() => scrollTo('fleet')} className="hover:text-amber-400 transition cursor-pointer">
            Cars (Dzire/Ertiga/Innova)
          </button>
          <button onClick={() => scrollTo('local-attractions')} className="hover:text-amber-400 text-amber-400/90 transition cursor-pointer flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>Local Attractions</span>
          </button>
          <button onClick={() => scrollTo('why-choose-us')} className="hover:text-amber-400 transition cursor-pointer">
            Why Choose Us
          </button>
          <button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition cursor-pointer">
            Tour Services
          </button>
          <button onClick={() => scrollTo('faq')} className="hover:text-amber-400 transition cursor-pointer">
            Reviews & FAQ
          </button>
        </nav>

        {/* Right Action Hotline & Booking Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a 
            href={`tel:${OWNER_PHONE}`}
            className="hidden sm:flex items-center space-x-2 text-slate-300 hover:text-amber-400 text-xs font-medium transition"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Owner Hotline</span>
              <span className="font-semibold text-slate-200">{OWNER_PHONE_DISPLAY}</span>
            </div>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer text-xs sm:text-sm"
          >
            <CalendarCheck className="w-4 h-4 stroke-[2.5]" />
            <span>Book A Cab</span>
          </button>
        </div>
      </div>
    </header>
  );
}
