import React from 'react';
import { Compass, PhoneCall, CalendarCheck } from 'lucide-react';
import { OWNER_PHONE, OWNER_PHONE_DISPLAY } from '../data/fleetData';

export default function Header({ onOpenBooking }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5 cursor-pointer flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 flex-shrink-0">
            <Compass className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-white font-outfit whitespace-nowrap">
            JIT<span className="text-amber-500"> TOURS AND TRAVELS</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-5 text-xs font-semibold text-slate-300 whitespace-nowrap">
          <button onClick={() => scrollTo('fleet')} className="hover:text-amber-400 transition cursor-pointer">
            Fleet
          </button>
          <button onClick={() => scrollTo('popular-destinations')} className="hover:text-amber-400 transition cursor-pointer">
            Destinations
          </button>
          <button onClick={() => scrollTo('local-attractions')} className="hover:text-amber-400 transition cursor-pointer">
            Attractions
          </button>
          <button onClick={() => scrollTo('why-choose-us')} className="hover:text-amber-400 transition cursor-pointer">
            Why Us
          </button>
          <button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition cursor-pointer">
            Services
          </button>
          <button onClick={() => scrollTo('faq')} className="hover:text-amber-400 transition cursor-pointer">
            Reviews
          </button>
        </nav>

        {/* Right Action Hotline & Booking Button */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <a
            href={`tel:${OWNER_PHONE}`}
            className="hidden xl:flex items-center space-x-2 text-slate-300 hover:text-amber-400 text-xs font-semibold transition whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{OWNER_PHONE_DISPLAY}</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer text-xs sm:text-sm whitespace-nowrap"
          >
            <CalendarCheck className="w-4 h-4 stroke-[2.5]" />
            <span>Book A Cab</span>
          </button>
        </div>
      </div>
    </header>
  );
}
