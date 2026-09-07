import React, { useState } from 'react';
import { Star, ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function TestimonialsFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  const REVIEWS = [
    {
      id: 1,
      name: 'Rohan & Ananya Sharma',
      location: 'Prayagraj, UP',
      route: 'Prayagraj ➔ Varanasi (Kashi Vishwanath Yatra)',
      carUsed: 'Toyota Innova Crysta (7 Seater)',
      stars: 5,
      date: 'Visited 2 weeks ago',
      comment: 'Booked an Innova Crysta 7-Seater from Jit Tours and Travels for our family Kashi Vishwanath pilgrimage. The car was spotless, driver Amit was punctual and knew all the ghat timings. Transparent pricing with zero surprise charges!',
      avatarBg: 'from-amber-500 to-amber-700',
      initials: 'RS'
    },
    {
      id: 2,
      name: 'Dr. Sameer Kulkarni',
      location: 'Lucknow, UP',
      route: 'Prayagraj Local Sightseeing (Sangam & Fort)',
      carUsed: 'Maruti Suzuki Dzire (5 Seater)',
      stars: 5,
      date: 'Visited 3 weeks ago',
      comment: 'Covered Triveni Sangam, Bade Hanuman Mandir, Anand Bhavan, and Allahabad Fort in one day. The Dzire 5-Seater had chilled AC and our chauffeur helped us with smooth boat ride booking at Sangam Ghat.',
      avatarBg: 'from-blue-600 to-indigo-700',
      initials: 'SK'
    },
    {
      id: 3,
      name: 'Priya & Rajesh Mukherjee',
      location: 'Kanpur, UP',
      route: 'Prayagraj ➔ Ayodhya Ram Mandir (Round Trip)',
      carUsed: 'Maruti Suzuki Ertiga (7 Seater)',
      stars: 5,
      date: 'Visited 1 month ago',
      comment: 'Took the Ertiga 7-Seater for our 6-person family trip to Ayodhya Ram Janmabhoomi. The roof AC and comfortable 3rd-row seats made the 4-hour highway drive very pleasant. Direct WhatsApp booking with the owner was super quick!',
      avatarBg: 'from-emerald-500 to-teal-700',
      initials: 'PM'
    },
    {
      id: 4,
      name: 'Vikramaditya Singhania',
      location: 'Rewa, MP',
      route: 'Prayagraj ➔ Rewa Waterfalls (Keoti & Bahuti)',
      carUsed: 'Innova Crysta (7 Seater)',
      stars: 5,
      date: 'Visited 2 months ago',
      comment: 'Booked an Innova Crysta for our weekend monsoon trip to Keoti and Bahuti waterfalls in Rewa. Flawless timing, a spotless vehicle, and the driver handled the ghat roads very safely.',
      avatarBg: 'from-purple-600 to-pink-700',
      initials: 'VS'
    },
    {
      id: 7,
      name: 'Kavita & Manoj Agarwal',
      location: 'Kanpur, UP',
      route: 'Wedding Guest Pickup — Kanpur to Prayagraj',
      carUsed: 'Force Urbania (17 Seater)',
      stars: 5,
      date: 'Visited 1 month ago',
      comment: 'We hired the Urbania for our daughter\'s wedding to bring 15 relatives from Kanpur to Prayagraj. Comfortable AC seating for the whole group and the driver coordinated timings perfectly with our event schedule.',
      avatarBg: 'from-amber-600 to-orange-700',
      initials: 'KA'
    },
    {
      id: 5,
      name: 'Anjali Verma (Senior Consultant)',
      location: 'Varanasi, UP',
      route: 'Varanasi ➔ Vindhyachal ➔ Mirzapur',
      carUsed: 'Maruti Suzuki Dzire (5 Seater)',
      stars: 5,
      date: 'Visited last week',
      comment: 'Visited Maa Vindhyavasini Temple and Ashtabhuja Temple. Chauffeur arrived 15 minutes in advance at Varanasi Cantt, drove safely, and returned on time. Instant email confirmation and transparent fare receipt.',
      avatarBg: 'from-rose-500 to-amber-600',
      initials: 'AV'
    },
    {
      id: 6,
      name: 'Karthik & Deepa Nambiar',
      location: 'Prayagraj, UP',
      route: 'Prayagraj ➔ Chitrakoot Dham & Maihar',
      carUsed: 'Toyota Innova Crysta (7 Seater)',
      stars: 5,
      date: 'Visited 3 weeks ago',
      comment: 'Superb 2-day pilgrimage covering Ram Ghat, Gupt Godavari, Kamadgiri in Chitrakoot, and Maa Sharda temple in Maihar. We traveled with elderly grandparents who enjoyed the ultra-cushioned ride in Innova Crysta!',
      avatarBg: 'from-cyan-600 to-blue-700',
      initials: 'KN'
    }
  ];

  const FAQS = [
    {
      q: 'Which vehicles are available at Jit Tours and Travels?',
      a: 'We provide Maruti Suzuki Dzire (5-Seater Sedan), Maruti Suzuki Ertiga (7-Seater Economy MPV), Toyota Innova Crysta (7-Seater Luxury MPV), and the Force Urbania (17-Seater) for larger groups, weddings, and family functions across UP and MP.'
    },
    {
      q: 'Do you provide full-day local sightseeing cabs in Prayagraj?',
      a: 'Yes! We offer full-day and half-day customized city tours covering Triveni Sangam, Allahabad Fort, Bade Hanuman Mandir, Khusro Bagh, Anand Bhavan, Swaraj Bhavan, All Saints Cathedral, Chandrashekhar Azad Park, and Mankameshwar Temple.'
    },
    {
      q: 'How can I connect directly with Jit Tours and Travels?',
      a: 'You can immediately click the "Call Owner" or "WhatsApp Owner" buttons present on every car card, or submit the online booking form to receive an instant automated Gmail confirmation and quotation.'
    },
    {
      q: 'Which outstation circuits do you cover in Uttar Pradesh and Madhya Pradesh?',
      a: 'We cover all major religious and tourist circuits including Varanasi (Kashi), Ayodhya (Ram Mandir), Prayagraj, Chitrakoot, Vindhyachal, Mirzapur, Mathura-Vrindavan, Agra, Rewa Waterfalls, Khajuraho, Maihar, Bandhavgarh, and Panna.'
    },
    {
      q: 'Do you provide Airport and Railway Station pickup & drop in Prayagraj?',
      a: 'Yes! We provide 24/7 terminal pickup and drops at Prayagraj Airport (IXD), Prayagraj Junction (PRYJ), Varanasi Airport (VNS), and Lucknow Airport (LKO) with real-time schedule tracking and zero surge pricing.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-950 relative border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Testimonials Section */}
        <div>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-semibold inline-flex items-center space-x-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>REVIEWS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              What Travelers <span className="text-amber-500">Say</span>
            </h2>
            <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-4 py-1.5 rounded-full text-xs text-slate-300">
              <div className="flex text-amber-400 space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.95 / 5.0</span>
            </div>
          </div>

          {/* Reviews Row — horizontally scrollable */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="flex-shrink-0 w-[280px] snap-start glass-card p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between space-y-3 shadow-xl"
              >
                <div className="space-y-2.5">
                  <div className="flex text-amber-400 space-x-1">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${rev.avatarBg} flex items-center justify-center text-white font-bold text-xs shadow-md flex-shrink-0`}>
                    {rev.initials}
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-white leading-tight">{rev.name}</strong>
                    <span className="text-[11px] text-slate-400">{rev.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto space-y-6 pt-6">
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
