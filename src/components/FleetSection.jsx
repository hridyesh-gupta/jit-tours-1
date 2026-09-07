import React, { useState } from 'react';
import { VEHICLE_FLEET, OWNER_PHONE, OWNER_PHONE_DISPLAY, getCarWhatsAppLink } from '../data/fleetData';
import { Users, Briefcase, Fuel, Star, ArrowRight, CheckCircle2, PhoneCall, MessageCircle, Sparkles } from 'lucide-react';

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
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PREMIUM VERIFIED FLEET</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Our Vehicle Variety <span className="text-amber-500">(5, 7 & 17 Seaters)</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Choose from our fleet including <strong className="text-slate-200">Dzire (5 Seater)</strong>, <strong className="text-slate-200">Ertiga (7 Seater)</strong>, <strong className="text-slate-200">Innova Crysta (7 Seater)</strong>, and the <strong className="text-slate-200">Force Urbania (17 Seater)</strong> for large groups. Clean cars, verified chauffeurs & direct owner contact.
          </p>
        </div>

        {/* Fleet Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl inline-flex space-x-1 sm:space-x-2">
            {['All', '5-Seater', '7-Seater', 'Group Traveller'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab === 'All' ? 'All Vehicles' : tab === '5-Seater' ? '5-Seater Cars (Dzire)' : tab === '7-Seater' ? '7-Seater MPVs (Ertiga / Innova)' : 'Group Traveller (Urbania)'}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((car) => {
            const whatsappUrl = getCarWhatsAppLink(car.name, car.passengers, car.ratePerKm);

            return (
              <div
                key={car.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 border border-slate-800 hover:border-amber-500/40 shadow-xl"
              >
                <div>
                  {/* Image & Top Badges */}
                  <div className="relative h-56 bg-slate-900 overflow-hidden group">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none"></div>

                    {/* Top Left Badge */}
                    <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {car.badge}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md border border-slate-800 flex items-center space-x-1 shadow-lg">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{car.rating} ({car.reviews})</span>
                    </div>

                    {/* Capacity Badge bottom-left */}
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-lg shadow-md flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-950" />
                      <span>{car.passengers} Seater</span>
                    </div>
                  </div>

                  {/* QUICK OWNER ACTION BAR BELOW IMAGE */}
                  <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${OWNER_PHONE}`}
                      className="flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 transition text-xs font-bold cursor-pointer"
                      title="Call Owner Directly"
                    >
                      <PhoneCall className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Call Owner</span>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition text-xs cursor-pointer shadow-md shadow-emerald-600/20"
                      title="Direct WhatsApp to Owner"
                    >
                      <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 fill-current" />
                      <span>WhatsApp Owner</span>
                    </a>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 space-y-4">
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 block font-bold">
                          {car.category} &bull; {car.type}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-0.5">{car.name}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-amber-400 font-outfit">₹{car.ratePerKm}</span>
                        <span className="text-[11px] text-slate-400 block">/ km</span>
                      </div>
                    </div>

                    {/* Specs Pill Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-xs text-slate-300">
                      <div className="bg-slate-900/60 p-2 rounded-lg text-center border border-slate-800/50">
                        <Users className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <span className="block font-bold">{car.passengers} Seater</span>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-lg text-center border border-slate-800/50">
                        <Briefcase className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <span className="block font-bold truncate">{car.luggage.split(' ')[0]} Bags</span>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-lg text-center border border-slate-800/50">
                        <Fuel className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <span className="block font-bold truncate">{car.fuel.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {car.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>

                {/* Primary Booking Button */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => onOpenBookingWithCar(car.name, car.category)}
                    className="w-full py-3 bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold rounded-xl border border-amber-500/30 transition duration-200 flex items-center justify-center space-x-2 text-sm cursor-pointer shadow-lg hover:shadow-amber-500/20"
                  >
                    <span>Reserve & Calculate Fare</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Direct Contact Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Need an Instant Custom Fleet Quote?</h4>
              <p className="text-xs text-slate-400">Directly speak with the fleet owner on call or WhatsApp for Dzire, Ertiga, Innova Crysta & Urbania (17-Seater) rentals.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={`tel:${OWNER_PHONE}`}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>{OWNER_PHONE_DISPLAY}</span>
            </a>

            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent('Hello Jit Tours and Travels, I want to book a car. Please share available 5-seater and 7-seater options.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold flex items-center space-x-2 transition shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
