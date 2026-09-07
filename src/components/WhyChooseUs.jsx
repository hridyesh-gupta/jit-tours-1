import React from 'react';
import {
  Sparkles,
  DollarSign,
  Clock,
  Headphones,
  MessageCircle,
  Car,
  HeartHandshake
} from 'lucide-react';

export default function WhyChooseUs() {
  const WHY_CHOOSE_US_POINTS = [
    {
      icon: HeartHandshake,
      title: 'Experienced Drivers',
      desc: 'Police-verified chauffeurs who know every route.'
    },
    {
      icon: Car,
      title: 'Well-Maintained Vehicles',
      desc: 'Serviced and sanitized before every trip.'
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      desc: 'Fixed rates, no hidden charges.'
    },
    {
      icon: Clock,
      title: 'On-Time Pickup',
      desc: 'Guaranteed doorstep pickup, every time.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      desc: 'A real helpline, day or night.'
    },
    {
      icon: MessageCircle,
      title: 'Quick WhatsApp Booking',
      desc: 'Get a quote and confirm in minutes.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-900/60 relative border-t border-slate-800">
      {/* Glow highlight */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>WHY CHOOSE US</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Choose <span className="text-amber-500">Jit Tours and Travels?</span>
          </h2>
        </div>

        {/* Key Points Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {WHY_CHOOSE_US_POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 space-y-2.5 group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition duration-300 shadow-md">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
