import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  DollarSign, 
  Clock, 
  Headphones, 
  MapPin, 
  PlaneTakeoff, 
  Building2, 
  Route, 
  CalendarCheck, 
  MessageCircle, 
  Car,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { OWNER_PHONE, OWNER_PHONE_DISPLAY } from '../data/fleetData';

export default function WhyChooseUs() {
  const WHY_CHOOSE_US_POINTS = [
    {
      icon: HeartHandshake,
      title: 'Experienced Drivers',
      desc: 'Police-verified, courteous chauffeurs with deep route expertise across Uttar Pradesh (Varanasi, Ayodhya, Prayagraj, Chitrakoot) and Madhya Pradesh (Rewa, Maihar, Khajuraho).'
    },
    {
      icon: Car,
      title: 'Well-Maintained Vehicles',
      desc: 'Our complete fleet including Maruti Dzire (5 Seater), Maruti Ertiga (7 Seater), and Toyota Innova Crysta (7 Seater) undergoes regular mechanical service and deep sanitization.'
    },
    {
      icon: ShieldCheck,
      title: 'Comfortable Travel',
      desc: 'Plush cushioned seats, dual & roof AC for all rows, smooth suspensions, and ample boot space for luggage, ideal for elderly pilgrims and children.'
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      desc: 'Fixed per-kilometer rates (Dzire ₹13/km, Ertiga ₹17/km, Innova ₹21/km) with clear driver allowances. Zero hidden charges, no unannounced toll traps, and no surge multipliers.'
    },
    {
      icon: Clock,
      title: 'On-Time Pickup',
      desc: 'Punctual doorstep, hotel, airport, or railway station pickup guaranteed 15 minutes before your scheduled departure time.'
    },
    {
      icon: Headphones,
      title: '24/7 Customer Support',
      desc: 'Dedicated round-the-clock dispatch desk and direct owner helpline to assist you with route updates, emergency support, and pilgrimage schedules.'
    },
    {
      icon: MapPin,
      title: 'Local & Outstation Services',
      desc: 'Complete travel coverage ranging from Prayagraj Local Sightseeing (Sangam, Hanuman Mandir, Anand Bhavan) to multi-day outstation spiritual circuits.'
    },
    {
      icon: PlaneTakeoff,
      title: 'Airport & Railway Transfers',
      desc: 'Never miss a flight or train. Seamless terminal transit with flight status tracking at Prayagraj (IXD), Varanasi (VNS), and Lucknow (LKO) airports.'
    },
    {
      icon: Building2,
      title: 'Family & Corporate Travel',
      desc: 'Tailored travel solutions for corporate delegations, VIP guests, family holiday vacations, and wedding party convoys.'
    },
    {
      icon: Route,
      title: 'Customized Travel Plans',
      desc: 'Bespoke itineraries for Kashi-Ayodhya-Prayagraj (Holy Trinity), Rewa Waterfalls tour, Chitrakoot Dham, and Khajuraho-Panna-Bandhavgarh packages.'
    },
    {
      icon: CalendarCheck,
      title: 'Easy Booking',
      desc: 'Quick online booking inquiry wizard with instant automated Gmail confirmation receipt and route validation.'
    },
    {
      icon: MessageCircle,
      title: 'Quick WhatsApp Support',
      desc: 'Direct 1-click WhatsApp connectivity with the owner for rapid quotes, vehicle photos, and immediate cab confirmation.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-900/60 relative border-t border-slate-800">
      {/* Glow highlight */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OUR COMMITMENT TO EXCELLENCE</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Choose <span className="text-amber-500">Jit Tours and Travels?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Your most trusted local and outstation taxi service in Prayagraj, Uttar Pradesh & Madhya Pradesh. Here is why thousands of travelers and pilgrims rely on us.
          </p>
        </div>

        {/* 12 Key Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 space-y-3.5 group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition duration-300 flex-shrink-0 shadow-md">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      Feature {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Transparent Pricing & Policy Box */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 rounded-2xl border border-amber-500/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3 text-left">
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Transparent Fare Calculation Formula</span>
            </div>
            <h3 className="text-2xl font-bold text-white">How Your Trip Fare Is Calculated</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Total Fare</strong> = (Total Distance in KM &times; Vehicle Rate/KM) + (Number of Days &times; Driver Daily Allowance) + Actual State Toll / Entry Permits. No hidden surge pricing or mandatory commission traps.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dzire 5-Seater: ₹13/km</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Ertiga 7-Seater: ₹17/km</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Innova Crysta: ₹21/km</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900/95 p-5 rounded-xl border border-slate-800 text-xs space-y-3">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Maruti Dzire (5 Seater):</span>
              <span className="font-bold text-amber-400">₹13 / km</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Maruti Ertiga (7 Seater):</span>
              <span className="font-bold text-amber-400">₹17 / km</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Toyota Innova Crysta (7 Seater):</span>
              <span className="font-bold text-amber-400">₹21 / km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Driver Daily Allowance:</span>
              <span className="font-bold text-emerald-400">₹400 – ₹500 / day</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
