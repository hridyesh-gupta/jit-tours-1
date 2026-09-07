import React, { useState } from 'react';
import { INDIAN_CITIES, calculateRoadDistance, POPULAR_ROUTES } from '../data/indianCities';
import { MapPin, Navigation, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DistanceCalculator({ onOpenBooking }) {
  const [pickupCity, setPickupCity] = useState('prayagraj');
  const [dropCity, setDropCity] = useState('varanasi');

  const result = calculateRoadDistance(pickupCity, dropCity);
  const pickupObj = INDIAN_CITIES.find(c => c.id === pickupCity);
  const dropObj = INDIAN_CITIES.find(c => c.id === dropCity);

  const percentage = Math.min(Math.round((result.distanceKm / 1500) * 100), 100);

  const handleSelectPopularRoute = (route) => {
    setPickupCity(route.from);
    setDropCity(route.to);
  };

  return (
    <section id="distance-calculator" className="py-16 relative bg-slate-950 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-amber-400 text-xs font-semibold">
            <Navigation className="w-3.5 h-3.5" />
            <span>Interactive UP & MP Route Validator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Check Your <span className="text-amber-500">Trip Distance</span>
          </h2>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs & City Pickers */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Select Your Travel Route</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Pickup City */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  1. Pickup City (Origin)
                </label>
                <select
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm font-medium"
                >
                  <optgroup label="Uttar Pradesh">
                    {INDIAN_CITIES.filter(c => c.state === 'Uttar Pradesh').map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Madhya Pradesh">
                    {INDIAN_CITIES.filter(c => c.state === 'Madhya Pradesh').map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Destination City */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  2. Destination City
                </label>
                <select
                  value={dropCity}
                  onChange={(e) => setDropCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm font-medium"
                >
                  <optgroup label="Uttar Pradesh">
                    {INDIAN_CITIES.filter(c => c.state === 'Uttar Pradesh').map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Madhya Pradesh">
                    {INDIAN_CITIES.filter(c => c.state === 'Madhya Pradesh').map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

            </div>

            {/* Popular Shortcut Pills */}
            <div>
              <span className="block text-xs font-semibold text-slate-400 mb-2.5">
                Popular Routes
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROUTES.map((route, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPopularRoute(route)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition font-medium cursor-pointer ${
                      pickupCity === route.from && dropCity === route.to
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                    }`}
                  >
                    {route.name} (~{route.distance} km)
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Card & Range Meter */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 space-y-6 border border-slate-800">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block">Route Estimate</span>
                <h4 className="text-xl font-bold text-white">
                  {pickupObj?.name.split(',')[0]} ➔ {dropObj?.name.split(',')[0]}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-amber-400 font-outfit">
                  ~{result.distanceKm} <span className="text-sm font-normal text-slate-400">KM</span>
                </span>
              </div>
            </div>

            {/* Range Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">Calculated Distance: {result.distanceKm} km</span>
                <span className={result.isWithinLimit ? 'text-amber-400 font-bold' : 'text-rose-400 font-bold'}>
                  Max Operating Radius: 1,500 km
                </span>
              </div>

              <div className="w-full bg-slate-900 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.isWithinLimit
                      ? 'bg-gradient-to-r from-amber-500 to-emerald-400'
                      : 'bg-gradient-to-r from-amber-500 to-rose-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Validation Banner */}
            {result.isWithinLimit ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-200">
                  <strong className="block font-semibold text-emerald-300 text-sm">
                    We cover this route!
                  </strong>
                </div>
              </div>
            ) : (
              <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-4 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-rose-200">
                  <strong className="block font-semibold text-rose-300 text-sm">
                    Too far for a standard trip
                  </strong>
                  Please WhatsApp or call us to arrange this.
                </div>
              </div>
            )}

            {/* Action CTA */}
            <button
              disabled={!result.isWithinLimit}
              onClick={() => onOpenBooking(null, dropObj?.name.split(/[,(]/)[0].trim())}
              className={`w-full py-3.5 rounded-xl font-bold transition flex items-center justify-center space-x-2 text-sm cursor-pointer ${
                result.isWithinLimit
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>{result.isWithinLimit ? 'Proceed to Book This Route' : 'Select a Route Under 1500 km'}</span>
              {result.isWithinLimit && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
