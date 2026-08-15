import React, { useState } from 'react';
import { VEHICLE_FLEET } from '../data/fleetData';
import { Users, Briefcase, Fuel, ShieldCheck, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FleetSection({ onOpenBookingWithCar }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredFleet = activeTab === 'All'
    ? VEHICLE_FLEET
    : VEHICLE_FLEET.filter(v => v.category === activeTab);

  return (
    <section id="fleet" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold">
            INSPECT OUR VEHICLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Choose Your Travel Vehicle <span className="text-amber-500">(4 & 7 Seaters)</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            All vehicles in our fleet are 100% sanitized, commercial-permitted across Indian states, and backed by experienced outstation chauffeurs.
          </p>
        </div>

        {/* Fleet Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl inline-flex space-x-1 sm:space-x-2">
            {['All', '4-Seater', '7-Seater', 'Luxury'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab === 'All' ? 'All Vehicles' : tab === '4-Seater' ? '4-Seater Cars' : tab === '7-Seater' ? '7-Seater MPVs/SUVs' : 'Luxury VIP'}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((car) => (
            <div
              key={car.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Image & Badge Header */}
                <div className="relative h-52 bg-slate-900 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                    {car.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md border border-slate-800 flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{car.rating} ({car.reviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
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
                      <span className="block font-bold">{car.passengers} Passengers</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded-lg text-center border border-slate-800/50">
                      <Briefcase className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <span className="block font-bold">{car.luggage.split(' ')[0]} Luggage</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded-lg text-center border border-slate-800/50">
                      <Fuel className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <span className="block font-bold">{car.fuel.split(' ')[0]}</span>
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

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenBookingWithCar(car.name, car.category)}
                  className="w-full py-3 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold rounded-xl border border-amber-500/30 transition duration-200 flex items-center justify-center space-x-2 text-sm cursor-pointer"
                >
                  <span>Select {car.category} Car</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
