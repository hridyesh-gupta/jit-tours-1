import React, { useState } from 'react';
import { VEHICLE_FLEET, OWNER_PHONE, OWNER_PHONE_DISPLAY, OWNER_WHATSAPP_NUMBER, getCarWhatsAppLink } from '../data/fleetData';
import { Users, Briefcase, ArrowRight, PhoneCall, MessageCircle, Sparkles } from 'lucide-react';

export default function FleetSection({ onOpenBookingWithCar }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredFleet = activeTab === 'All'
    ? VEHICLE_FLEET
    : VEHICLE_FLEET.filter(v => v.category === activeTab);

  return (
    <section id="fleet" className="py-20 bg-slate-950 relative border-t border-slate-850">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OUR FLEET</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Cars & <span className="text-amber-500">Group Traveller</span>
          </h2>
        </div>

        {/* Fleet Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl inline-flex space-x-1 sm:space-x-2 overflow-x-auto max-w-full">
            {['All', '5-Seater', '7-Seater', 'Group Traveller'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Row — horizontally scrollable */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {filteredFleet.map((car) => {
            const whatsappUrl = getCarWhatsAppLink(car.name, car.passengers);
            const shortName = car.name.split('(')[0].trim();

            return (
              <div
                key={car.id}
                className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start glass-card rounded-2xl overflow-hidden flex flex-col border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl"
              >
                {/* Photo */}
                <div className="h-36 bg-white flex items-center justify-center p-3 relative">
                  <img
                    src={car.image}
                    alt={shortName}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute top-2 left-2 bg-slate-950 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {car.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 flex-grow">
                  <h3 className="text-base font-bold text-white leading-tight">{shortName}</h3>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" /> {car.passengers} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-amber-400" /> {car.luggage.split(' ')[0]} Bags
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 space-y-2">
                  <button
                    onClick={() => onOpenBookingWithCar(shortName, car.category)}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition duration-200 flex items-center justify-center space-x-1.5 text-xs cursor-pointer"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${OWNER_PHONE}`}
                      className="flex items-center justify-center py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 transition"
                      title="Call Owner"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
                      title="WhatsApp Owner"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Direct Contact Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h4 className="text-sm font-bold text-white">Need a custom quote?</h4>

          <div className="flex items-center space-x-3">
            <a
              href={`tel:${OWNER_PHONE}`}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>{OWNER_PHONE_DISPLAY}</span>
            </a>

            <a
              href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Jit Tours and Travels, I want to book a car. Please share available options.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold flex items-center space-x-2 transition shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
