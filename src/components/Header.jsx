import React from 'react';
import { Car, PhoneCall, ShieldCheck, CalendarCheck } from 'lucide-react';

export default function Header({ onOpenBooking }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Car className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl tracking-tight text-white font-outfit">
                BHARAT<span className="text-amber-500">WHEELS</span>
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono block -mt-1">
              Outstation Car Rentals &bull; India
            </span>
          </div>
        </div>

        {/* Center Pill: 1500 km Limit Guarantee */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-4 py-1.5 rounded-full text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Intra-India Radius Limit: <strong className="text-amber-400 font-semibold">Max 1,500 km</strong></span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        {/* Right Action Hotline & Booking Button */}
        <div className="flex items-center space-x-4">
          <a 
            href="tel:+919876543210" 
            className="hidden sm:flex items-center space-x-2 text-slate-300 hover:text-amber-400 text-xs font-medium transition"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">24/7 Helpline</span>
              <span className="font-semibold text-slate-200">+91 98765 43210</span>
            </div>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer text-sm"
          >
            <CalendarCheck className="w-4 h-4 stroke-[2.5]" />
            <span>Book A Rental</span>
          </button>
        </div>
      </div>
    </header>
  );
}
