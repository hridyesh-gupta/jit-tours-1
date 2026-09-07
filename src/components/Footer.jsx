import React from 'react';
import { Compass, PhoneCall, Mail, MapPin, ShieldCheck, MessageCircle } from 'lucide-react';
import { OWNER_PHONE, OWNER_PHONE_DISPLAY, OWNER_EMAIL, OWNER_WHATSAPP_NUMBER } from '../data/fleetData';

export default function Footer({ onOpenBooking }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Compass className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-outfit">
                JIT<span className="text-amber-500"> TOURS & TRAVELS</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Prayagraj & Uttar Pradesh's premier car rental and tour service. Specializing in verified 5-seater sedans (Dzire) and 7-seater MPVs (Ertiga & Innova Crysta) for Prayagraj Local Sightseeing, Varanasi, Ayodhya, Chitrakoot, and Madhya Pradesh circuits.
            </p>

            <div className="flex items-center space-x-3 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Trusted Local & Outstation Taxi Service</span>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={`tel:${OWNER_PHONE}`}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 font-bold flex items-center space-x-1.5 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Owner</span>
              </a>

              <a
                href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Jit Tours and Travels, I would like to inquire about car bookings.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center space-x-1.5 transition shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Owner</span>
              </a>
            </div>
          </div>

          {/* Quick Vehicle Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-outfit">Our Fleet</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onOpenBooking('Maruti Suzuki Dzire (5 Seater)')} className="hover:text-amber-400 transition cursor-pointer text-left">Dzire 5-Seater Sedan</button></li>
              <li><button onClick={() => onOpenBooking('Maruti Suzuki Ertiga (7 Seater)')} className="hover:text-amber-400 transition cursor-pointer text-left">Ertiga 7-Seater MPV</button></li>
              <li><button onClick={() => onOpenBooking('Toyota Innova Crysta (7 Seater)')} className="hover:text-amber-400 transition cursor-pointer text-left">Innova Crysta 7-Seater Luxury</button></li>
              <li><button onClick={() => onOpenBooking('Force Urbania (17 Seater)')} className="hover:text-amber-400 transition cursor-pointer text-left">Force Urbania 17-Seater</button></li>
            </ul>
          </div>

          {/* Local Attractions */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-outfit">Local Sightseeing</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => scrollTo('local-attractions')} className="hover:text-amber-400 transition cursor-pointer text-left">Triveni Sangam & Fort</button></li>
              <li><button onClick={() => scrollTo('local-attractions')} className="hover:text-amber-400 transition cursor-pointer text-left">Bade Hanuman Mandir</button></li>
              <li><button onClick={() => scrollTo('local-attractions')} className="hover:text-amber-400 transition cursor-pointer text-left">Anand & Swaraj Bhavan</button></li>
              <li><button onClick={() => scrollTo('local-attractions')} className="hover:text-amber-400 transition cursor-pointer text-left">Khusro Bagh & Patthar Girja</button></li>
              <li><button onClick={() => scrollTo('local-attractions')} className="hover:text-amber-400 transition cursor-pointer text-left">Mankameshwar Temple</button></li>
            </ul>
          </div>

          {/* Contact & Dispatch */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-outfit">Helpline & Office</h4>
            <div className="space-y-2.5 text-slate-300">
              <a href={`tel:${OWNER_PHONE}`} className="flex items-center space-x-2 hover:text-amber-400 transition">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span className="font-bold">{OWNER_PHONE_DISPLAY}</span>
              </a>
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{OWNER_EMAIL}</span>
              </div>
              <div className="flex items-start space-x-2 text-slate-400 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Civil Lines / Sangam Area, Prayagraj, Uttar Pradesh</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-[11px] space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Jit Tours and Travels. All rights reserved. Servicing Prayagraj, UP & MP Tour Circuits.
          </div>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 cursor-pointer">UP & MP Route Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
