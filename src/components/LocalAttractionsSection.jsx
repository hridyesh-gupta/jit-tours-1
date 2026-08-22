import React, { useState } from 'react';
import { LOCAL_ATTRACTIONS } from '../data/localAttractionsData';
import { getLocalAttractionWhatsAppLink } from '../data/fleetData';
import { 
  Landmark, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Tag, 
  Car,
  Ticket
} from 'lucide-react';

export default function LocalAttractionsSection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Sacred & Spiritual', 'Historical & Architectural', 'Heritage & Museum', 'Heritage & Park'];

  const filteredAttractions = activeCategory === 'All'
    ? LOCAL_ATTRACTIONS
    : LOCAL_ATTRACTIONS.filter(item => item.category === activeCategory);

  return (
    <section id="local-attractions" className="py-20 bg-slate-950 relative border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>PRAYAGRAJ & REGIONAL SIGHTSEEING</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Local Places & <span className="text-amber-500">Tourist Attractions</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore the sacred ghats, historic Mughal monuments, spiritual temples, and freedom heritage sites with Jit Tours and Travels' full-day and half-day sightseeing cabs.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl inline-flex space-x-1.5 sm:space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat === 'All' ? 'All Attractions (10)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.map((place) => {
            const whatsappUrl = getLocalAttractionWhatsAppLink(place.name);

            return (
              <div
                key={place.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1.5 group shadow-xl"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-56 bg-slate-900 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none"></div>

                    {/* Top Left Badge */}
                    <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {place.badge}
                    </div>

                    {/* Category bottom-left */}
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-800 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>Prayagraj, UP</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                        {place.category}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition mt-0.5">
                        {place.name}
                      </h3>
                      <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                        {place.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {place.description}
                    </p>

                    {/* Quick Visit Details Box */}
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span><strong>Timings:</strong> {place.bestTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                        <Car className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span><strong>Ideal Car:</strong> {place.recommendedCar}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {place.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onOpenBooking(place.recommendedCar.split('/')[0].trim())}
                    className="py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 transition text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Book Cab</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Prayagraj Full Day Sightseeing Package Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Complete Prayagraj Sightseeing Day Tour</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Cover All Top 10 Places in One Seamless Cab Tour</h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Visit Triveni Sangam, Allahabad Fort, Bade Hanuman Mandir, Anand Bhavan, Khusro Bagh, and more with our private AC cab (Dzire 5-Seater, Ertiga 7-Seater, or Innova Crysta). Includes doorstep pickup and flexible waiting time.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent('Hello Jit Tours and Travels, I would like to book a full-day Prayagraj local sightseeing package covering Sangam, Bade Hanuman Mandir, Anand Bhavan and all key spots.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold flex items-center space-x-2 transition shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Book Full-Day Tour on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
