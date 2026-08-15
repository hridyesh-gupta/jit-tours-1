import React from 'react';
import { ShieldCheck, Zap, DollarSign, HeartHandshake, Map, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const BENEFITS = [
    {
      icon: ShieldCheck,
      title: '1,500 km Safe Travel Radius',
      desc: 'By limiting single road trip distance to 1,500 km, our drivers stay alert, well-rested, and eliminate night-driving fatigue hazards.'
    },
    {
      icon: DollarSign,
      title: 'Zero Hidden Toll Surprises',
      desc: 'Transparent per-kilometer rates with clearly defined driver allowances. Tolls and state entry permits are provided upfront.'
    },
    {
      icon: HeartHandshake,
      title: 'Professional Police-Verified Drivers',
      desc: 'Courteous, local route-expert drivers trained in defensive highway driving and customer hospitality across all Indian states.'
    },
    {
      icon: Zap,
      title: 'Instant Gmail Confirmation alerts',
      desc: 'Your booking requests trigger automated HTML alerts to our central dispatcher & your email inbox within seconds.'
    }
  ];

  return (
    <section className="py-20 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold">
            OUR COMMITMENT TO QUALITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Travel With <span className="text-amber-500">BharatWheels?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We redefined intra-India outstation travel by focusing strictly on quality fleets, verified drivers, and transparent pricing.
          </p>
        </div>

        {/* 4 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-amber-500/30 transition">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Pricing Formula Breakdown Box */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 rounded-2xl border border-amber-500/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3 text-left">
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Transparent Fare Calculation</span>
            </div>
            <h3 className="text-2xl font-bold text-white">How Your Car Rental Fare Is Calculated</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Total Fare</strong> = (Distance in KM &times; Vehicle Rate/KM) + (Number of Days &times; Driver Allowance) + State Toll Permits. No surge pricing, no mandatory tip traps.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-xl border border-slate-800 text-xs space-y-3">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">4-Seater Sedan Rate:</span>
              <span className="font-bold text-amber-400">₹13 – ₹16 / km</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">7-Seater MPV (Innova/Ertiga):</span>
              <span className="font-bold text-amber-400">₹17 – ₹21 / km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Driver Allowance:</span>
              <span className="font-bold text-emerald-400">₹400 – ₹500 / day</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
