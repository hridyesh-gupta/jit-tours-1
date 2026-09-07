import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DistanceCalculator from './components/DistanceCalculator';
import FleetSection from './components/FleetSection';
import PopularDestinationsSection from './components/PopularDestinationsSection';
import LocalAttractionsSection from './components/LocalAttractionsSection';
import WhyChooseUs from './components/WhyChooseUs';
import ServicesSection from './components/ServicesSection';
import TestimonialsFAQ from './components/TestimonialsFAQ';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import { PhoneCall, MessageCircle } from 'lucide-react';
import { OWNER_PHONE, OWNER_WHATSAPP_NUMBER } from './data/fleetData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialCar, setInitialCar] = useState(null);
  const [initialPlace, setInitialPlace] = useState(null);

  const handleOpenBooking = (carName = null, place = null) => {
    setInitialCar(carName);
    setInitialPlace(place);
    setIsBookingOpen(true);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('distance-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative">
      <Header onOpenBooking={handleOpenBooking} />

      <main className="flex-grow">
        <Hero
          onOpenBooking={handleOpenBooking}
          scrollToCalculator={handleScrollToCalculator}
        />

        <DistanceCalculator
          onOpenBooking={handleOpenBooking}
        />

        <FleetSection
          onOpenBookingWithCar={(carName) => handleOpenBooking(carName)}
        />

        <PopularDestinationsSection
          onOpenBooking={handleOpenBooking}
        />

        <LocalAttractionsSection
          onOpenBooking={handleOpenBooking}
        />

        <WhyChooseUs />

        <ServicesSection
          onOpenBooking={handleOpenBooking}
        />

        <TestimonialsFAQ />
      </main>

      <Footer onOpenBooking={handleOpenBooking} />

      <ContactForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialCar={initialCar}
        initialPlace={initialPlace}
      />

      {/* Floating Quick WhatsApp & Phone Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <a
          href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Jit Tours and Travels, I would like to inquire about booking a 5-seater or 7-seater car.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group"
          title="Direct WhatsApp with Owner"
        >
          <MessageCircle className="w-7 h-7 fill-slate-950" />
        </a>

        <a
          href={`tel:${OWNER_PHONE}`}
          className="w-13 h-13 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group"
          title="Call Owner Hotline"
        >
          <PhoneCall className="w-6 h-6 stroke-[2.5]" />
        </a>
      </div>
    </div>
  );
}
