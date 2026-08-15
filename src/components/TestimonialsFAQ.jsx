import React, { useState } from 'react';
import { Star, ChevronDown, MessageSquare, HelpCircle } from 'lucide-react';

export default function TestimonialsFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  const REVIEWS = [
    {
      name: 'Rohan & Ananya Sharma',
      route: 'Mumbai ➔ Goa (Innova Crysta 7-Seater)',
      stars: 5,
      comment: 'Booked an Innova Crysta for our family trip to Goa (590 km). The car was spotless, driver Vikram was super polite, and we received the Gmail booking confirmation instantly!'
    },
    {
      name: 'Dr. Sameer Kulkarni',
      route: 'Bengaluru ➔ Ooty (Dzire 4-Seater)',
      stars: 5,
      comment: 'The 1,500 km limit policy gave us great peace of mind knowing the vehicle is well-maintained and the driver isn’t overworked. Smooth online booking process!'
    },
    {
      name: 'Priya Mukherjee',
      route: 'Delhi ➔ Shimla (Scorpio N 7-Seater)',
      stars: 5,
      comment: 'Traveled through mountain curves with our 6-person family. Excellent ground clearance, crystal clear communication on WhatsApp & email. Highly recommended!'
    }
  ];

  const FAQS = [
    {
      q: 'How does the Gmail App Password booking notification work?',
      a: 'When you submit the booking inquiry form on our landing page, our Node.js backend automatically compiles your trip requirements into a formatted HTML email and delivers it to our agency Gmail inbox via secure Gmail SMTP credentials. You also get an instant confirmation receipt in your own email.'
    },
    {
      q: 'Why do you enforce a 1,500 km trip distance limit?',
      a: 'Safety and vehicle reliability are our highest priorities. Outstation road trips exceeding 1,500 km carry high risk of severe driver fatigue and mechanical wear. By keeping our operating radius within 1,500 km across India, we ensure top vehicle performance and fresh drivers.'
    },
    {
      q: 'Can I choose between a 4-seater and a 7-seater vehicle?',
      a: 'Yes! In our booking inquiry form, you can select whether you need a 4-seater sedan (Swift Dzire/Etios/Creta) for small families or a 7-seater MPV/SUV (Innova Crysta/Ertiga/Scorpio) for larger groups.'
    },
    {
      q: 'Are driver night allowances and state permits included?',
      a: 'Per-km rates cover the car rental and fuel. Driver day allowance (₹400-₹500/day) and actual highway tolls/state entry permit taxes are specified transparently before trip start.'
    },
    {
      q: 'Do you offer self-drive rentals in addition to chauffeur-driven cars?',
      a: 'Yes, we offer both! During the inquiry process, you can select whether you prefer a professional uniformed driver or a self-drive rental (subject to valid Driving License & security deposit).'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Testimonials Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold">
              REAL ROAD TRIPPER REVIEWS
            </span>
            <h2 className="text-3xl font-extrabold text-white">What Our Travelers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="pt-3 border-t border-slate-800/80">
                  <strong className="block text-sm font-bold text-white">{rev.name}</strong>
                  <span className="text-[11px] text-amber-400">{rev.route}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 pt-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-xl border border-slate-800 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-5 text-left font-bold text-white flex justify-between items-center text-sm sm:text-base cursor-pointer hover:bg-slate-900/50"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-slate-800/50 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
