import React from 'react';
import {
  Compass,
  PlaneTakeoff,
  Train,
  Building2,
  Clock,
  CalendarDays,
  Sparkles,
  Users,
  UsersRound,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { getServiceWhatsAppLink } from '../data/fleetData';

export default function ServicesSection({ onOpenBooking }) {
  const SERVICES = [
    { id: 'custom-tour-packages', icon: Compass, title: 'Customized Tours', cars: 'Dzire / Innova Crysta / Force Urbania' },
    { id: 'airport-transfers', icon: PlaneTakeoff, title: 'Airport Transfers', cars: 'Dzire / Ertiga / Innova' },
    { id: 'railway-transfers', icon: Train, title: 'Railway Pickup & Drop', cars: 'Dzire / Ertiga' },
    { id: 'corporate-rental', icon: Building2, title: 'Corporate Rental', cars: 'Innova Crysta / Dzire' },
    { id: 'full-day-rental', icon: Clock, title: 'Full-Day Rental', cars: 'Dzire / Ertiga' },
    { id: 'multi-day-rental', icon: CalendarDays, title: 'Multi-Day Outstation', cars: 'Innova Crysta / Ertiga / Force Urbania' },
    { id: 'wedding-transportation', icon: Sparkles, title: 'Wedding & Events', cars: 'Force Urbania / Innova Crysta / Dzire' },
    { id: 'family-tour-transportation', icon: Users, title: 'Family Tours', cars: 'Ertiga / Innova Crysta' },
    { id: 'group-tour-transportation', icon: UsersRound, title: 'Group Tours', cars: 'Force Urbania / Innova Crysta / Ertiga' }
  ];

  return (
    <section id="services" className="py-20 bg-slate-950 relative border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OUR SERVICES</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tour & Transportation <span className="text-amber-500">Solutions</span>
          </h2>
        </div>

        {/* Services Row — horizontally scrollable */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            const whatsappUrl = getServiceWhatsAppLink(srv.title);

            return (
              <div
                key={srv.id}
                className="flex-shrink-0 w-[220px] snap-start glass-card rounded-2xl p-5 flex flex-col justify-between border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group shadow-xl"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition duration-300 shadow-md">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition leading-tight">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{srv.cars}</p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition flex items-center justify-center cursor-pointer"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  </a>

                  <button
                    onClick={() => onOpenBooking(srv.cars.split('/')[0].trim())}
                    className="py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 transition text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
