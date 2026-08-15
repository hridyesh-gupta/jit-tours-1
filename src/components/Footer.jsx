import React from 'react';
import { Car, PhoneCall, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Car className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-outfit">
                BHARAT<span className="text-amber-500">WHEELS</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              India's premier intra-city & outstation car rental agency. Specializing in verified 4-seater sedans and 7-seater MPVs for travel up to 1,500 km.
            </p>

            <div className="flex items-center space-x-3 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Max 1,500 km Safe Driving Radius Policy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-outfit">Vehicle Fleets</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onOpenBooking(null, '4-Seater')} className="hover:text-amber-400 transition cursor-pointer">4-Seater Hatchbacks</button></li>
              <li><button onClick={() => onOpenBooking(null, '4-Seater')} className="hover:text-amber-400 transition cursor-pointer">4-Seater Executive Sedans</button></li>
              <li><button onClick={() => onOpenBooking(null, '7-Seater')} className="hover:text-amber-400 transition cursor-pointer">7-Seater Toyota Innova</button></li>
              <li><button onClick={() => onOpenBooking(null, '7-Seater')} className="hover:text-amber-400 transition cursor-pointer">7-Seater Maruti Ertiga</button></li>
              <li><button onClick={() => onOpenBooking(null, '7-Seater')} className="hover:text-amber-400 transition cursor-pointer">7-Seater Scorpio 4x4</button></li>
            </ul>
          </div>

          {/* Regions Covered */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-outfit">Popular Hubs</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Delhi NCR ➔ Shimla / Manali</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Mumbai ➔ Goa / Mahabaleshwar</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Bengaluru ➔ Coorg / Ooty</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Chennai ➔ Puducherry</span>
              </li>
            </ul>
          </div>

          {/* Contact & Dispatch */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-outfit">Helpline & Dispatch</h4>
            <div className="space-y-2 text-slate-300">
              <a href="tel:+919876543210" className="flex items-center space-x-2 hover:text-amber-400 transition">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span className="font-bold">+91 98765 43210</span>
              </a>
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>bharatwheels.rentals@gmail.com</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2">
                Gmail App Password Email Notification System Enabled
              </p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-[11px] space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} BharatWheels Car Rentals. All rights reserved. Built for Outstation Indian Travel.
          </div>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 cursor-pointer">1500 km Limit Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
