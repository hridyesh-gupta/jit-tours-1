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
  MessageCircle,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { OWNER_PHONE, getServiceWhatsAppLink } from '../data/fleetData';

export default function ServicesSection({ onOpenBooking }) {
  const SERVICES = [
    {
      id: 'custom-tour-packages',
      icon: Compass,
      title: 'Customized Tour Packages',
      tagline: 'Personalized Itineraries & Sightseeing',
      desc: 'Bespoke holiday and weekend getaway packages across hill stations, heritage circuits, and pilgrimage destinations with flexible stops.',
      cars: 'Dzire 5-Seater / Innova Crysta 7-Seater / Force Urbania',
      features: ['Flexible Multi-City Itinerary', 'Local Route Master Chauffeur', 'Sightseeing & Temple Halt Flexibility']
    },
    {
      id: 'airport-transfers',
      icon: PlaneTakeoff,
      title: 'Airport Pickup & Drop',
      tagline: 'Guaranteed On-Time Terminal Transit',
      desc: 'Punctual airport transfers with flight tracking, automated arrival adjustments, luggage loading assistance, and zero surge pricing.',
      cars: 'Dzire (5 Pax) / Ertiga (7 Pax) / Innova',
      features: ['Real-time Flight Tracking', 'Doorstep to Terminal Gate', 'Complimentary Waiting Window']
    },
    {
      id: 'railway-transfers',
      icon: Train,
      title: 'Railway Station Pickup & Drop',
      tagline: 'Hassle-Free Station Connections',
      desc: 'Direct pickup and drop at major railway terminals. Avoid station taxi bargaining and enjoy pre-arranged clean chauffeur travel.',
      cars: 'Dzire 5-Seater / Ertiga 7-Seater',
      features: ['Designated Pickup Spot Guidance', 'Early Morning & Late Night Service', 'Luggage Space for Trunks & Bags']
    },
    {
      id: 'corporate-rental',
      icon: Building2,
      title: 'Corporate Car Rental',
      tagline: 'Executive & Business Delegate Travel',
      desc: 'Professional chauffeur-driven sedans and luxury MPVs for business executives, client meetings, corporate delegations, and VIP guests.',
      cars: 'Innova Crysta / Dzire',
      features: ['GST Invoicing & Billing', 'Uniformed Chauffeurs', 'In-Car Wi-Fi & Bottled Water']
    },
    {
      id: 'full-day-rental',
      icon: Clock,
      title: 'Full-Day Car Rental',
      tagline: '8 Hours / 80 KM or Custom Day Packages',
      desc: 'Enjoy a dedicated private car and driver at your disposal for city shopping, multiple business visits, doctor appointments, and social events.',
      cars: 'Dzire 5-Seater / Ertiga 7-Seater',
      features: ['Unlimited Intermediate Stops', 'Dedicated Chauffeur on Standby', 'Extensible Hourly Rates']
    },
    {
      id: 'multi-day-rental',
      icon: CalendarDays,
      title: 'Multi-Day Car Rental',
      tagline: 'Long-Distance & Inter-State Outstation',
      desc: 'Hire a car and chauffeur for 2 to 10+ day journeys across states (within 1,500 km safe radius). Perfect for continuous holiday tours.',
      cars: 'Innova Crysta 7-Seater / Ertiga / Force Urbania',
      features: ['Fixed Daily Allowance System', 'Inter-State Commercial Permits', 'Zero Driver Fatigue Guarantee']
    },
    {
      id: 'wedding-transportation',
      icon: Sparkles,
      title: 'Wedding & Event Transportation',
      tagline: 'Baraat, Bride & Groom, & Guest Convoys',
      desc: 'Premium fleet coordination for weddings, family functions, and grand ceremonies. Coordinated fleets of sedans and luxury 7-seaters.',
      cars: 'Force Urbania / Innova Crysta / Dzire Convoy',
      features: ['Floral Decoration Options', 'Multi-Car Convoy Coordination', 'VIP Guest Transit Management']
    },
    {
      id: 'family-tour-transportation',
      icon: Users,
      title: 'Family Tour Transportation',
      tagline: 'Safe, Comfortable Trips for Kids & Elders',
      desc: 'Specially catered rides prioritizing elderly comfort and child safety. Reclining captain seats, smooth suspension, and patient drivers.',
      cars: 'Ertiga (7 Seater) / Innova Crysta (7 Seater)',
      features: ['Child & Senior-Friendly Chauffeurs', 'Triple-Zone AC & Ample Legroom', 'Comfortable Frequent Rest Stops']
    },
    {
      id: 'group-tour-transportation',
      icon: UsersRound,
      title: 'Group Tour Transportation',
      tagline: 'Spacious Multi-Passenger Travel',
      desc: 'Travel together with friends and extended families without feeling cramped. Ample luggage room with optional rooftop luggage carriers.',
      cars: 'Force Urbania (17-Seater) / Innova Crysta / Ertiga',
      features: ['Roof-Mounted Luggage Carriers', 'High-Bass Surround Audio System', 'Group Route Planning Assistance']
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-950 relative border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OUR COMPREHENSIVE SERVICES</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tour & Transportation <span className="text-amber-500">Solutions</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From customized tour packages and airport transfers to corporate rentals and wedding convoys, Jit Tours and Travels covers all your travel needs.
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            const whatsappUrl = getServiceWhatsAppLink(srv.title);

            return (
              <div
                key={srv.id}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 group shadow-xl"
              >
                <div className="space-y-4">
                  
                  {/* Top Icon & Tagline */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition duration-300 shadow-md">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full font-bold">
                      Available 24/7
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                      {srv.title}
                    </h3>
                    <span className="text-xs text-amber-400/90 font-medium block mt-0.5">
                      {srv.tagline}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Recommended Vehicles Pill */}
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-300">
                    <strong className="text-amber-400 font-semibold">Recommended Cars:</strong> {srv.cars}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Service Action Buttons */}
                <div className="pt-6 mt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
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
                    onClick={() => onOpenBooking(srv.cars.split('/')[0].trim())}
                    className="py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 transition text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Customized Travel Package CTA Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Planning a Customized Tour or Multi-City Circuit?</h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Talk directly with our travel itinerary planners. We will design the most comfortable route with dedicated 5-seater or 7-seater cars, halts at top tourist spots, and verified chauffeur arrangements.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <a
              href={`tel:${OWNER_PHONE}`}
              className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Call Us</span>
            </a>

            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent('Hello Jit Tours and Travels, I need a Customized Tour Package for my upcoming trip. Please assist me with routes and car options.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold flex items-center space-x-2 transition shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Request Custom Package</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
