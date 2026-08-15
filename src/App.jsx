import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DistanceCalculator from './components/DistanceCalculator';
import FleetSection from './components/FleetSection';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsFAQ from './components/TestimonialsFAQ';
import Footer from './components/Footer';
import BookingWizard from './components/BookingWizard';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialRoute, setInitialRoute] = useState(null);
  const [initialCar, setInitialCar] = useState(null);

  const handleOpenBooking = (carName = null, category = null) => {
    if (carName) {
      setInitialCar(carName);
    }
    setInitialRoute(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithRoute = (routeData) => {
    setInitialRoute(routeData);
    setIsBookingOpen(true);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('distance-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header onOpenBooking={handleOpenBooking} />
      
      <main className="flex-grow">
        <Hero 
          onOpenBooking={handleOpenBooking} 
          scrollToCalculator={handleScrollToCalculator} 
        />
        
        <DistanceCalculator 
          onOpenBookingWithRoute={handleOpenBookingWithRoute} 
        />
        
        <FleetSection 
          onOpenBookingWithCar={(carName) => handleOpenBooking(carName)} 
        />
        
        <WhyChooseUs />
        
        <TestimonialsFAQ />
      </main>

      <Footer onOpenBooking={handleOpenBooking} />

      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialRoute={initialRoute}
        initialCar={initialCar}
      />
    </div>
  );
}
