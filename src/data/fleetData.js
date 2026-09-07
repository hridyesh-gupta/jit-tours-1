export const OWNER_PHONE = '+917081129697';
export const OWNER_PHONE_DISPLAY = '+91 70811 29697';
export const OWNER_WHATSAPP_NUMBER = '917081129697';
export const OWNER_EMAIL = 'jitsonker2004@gmail.com';

export const getCarWhatsAppLink = (carName, passengers) => {
  const text = `Hello Jit Tours and Travels, I am interested in booking *${carName}* (${passengers} Seater). Please provide availability, final quotation, and booking details.`;
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const getServiceWhatsAppLink = (serviceTitle) => {
  const text = `Hello Jit Tours and Travels, I would like to inquire about your *${serviceTitle}* service. Please share pricing and package itineraries.`;
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const getLocalAttractionWhatsAppLink = (placeName) => {
  const text = `Hello Jit Tours and Travels, I want to book a local sightseeing cab in Prayagraj / UP to visit *${placeName}*. Please share available cars (Dzire / Ertiga / Innova) and day tour charges.`;
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const VEHICLE_FLEET = [
  {
    id: 'dzire-5seater',
    name: 'Maruti Suzuki Dzire (5 Seater)',
    category: '5-Seater',
    type: 'Executive Sedan',
    passengers: 5,
    luggage: '3 Large Bags',
    ratePerKm: 13,
    driverAllowance: '₹400 / day',
    fuel: 'CNG / Petrol Hybrid',
    transmission: 'Manual / AMT',
    rating: 4.9,
    reviews: 480,
    badge: 'Best Value',
    image: '/images/dzire-new.png',
    features: [
      'AC & Airbags',
      'Great Mileage',
      '3 Bags'
    ]
  },
  {
    id: 'ertiga-7seater',
    name: 'Maruti Suzuki Ertiga (7 Seater)',
    category: '7-Seater',
    type: 'Economy MPV',
    passengers: 7,
    luggage: '4 Large Bags + Roof Carrier',
    ratePerKm: 17,
    driverAllowance: '₹450 / day',
    fuel: 'CNG / Petrol Smart Hybrid',
    transmission: 'Manual / Auto',
    rating: 4.85,
    reviews: 620,
    badge: 'Family Favourite',
    image: '/images/ertiga-new.png',
    features: [
      'Roof AC (All Rows)',
      'Reclining Seats',
      'USB Charging'
    ]
  },
  {
    id: 'innova-7seater',
    name: 'Toyota Innova Crysta (7 Seater)',
    category: '7-Seater',
    type: 'Luxury MPV',
    passengers: 7,
    luggage: '6 Large Bags + Roof Carrier',
    ratePerKm: 21,
    driverAllowance: '₹500 / day',
    fuel: 'Diesel Turbo Intercooler',
    transmission: 'Manual / Automatic',
    rating: 4.98,
    reviews: 840,
    badge: 'Most Popular',
    image: '/images/innova-new.png',
    features: [
      'Captain Seats',
      'Triple-Zone AC',
      'Smooth Highway Ride'
    ]
  },
  {
    id: 'urbania-17seater',
    name: 'Force Urbania (17 Seater)',
    category: 'Group Traveller',
    type: 'Premium Tempo Traveller',
    passengers: 17,
    luggage: '10+ Bags + Rear Cargo Deck',
    ratePerKm: 32,
    driverAllowance: '₹600 / day',
    fuel: 'BS6 Diesel',
    transmission: 'Manual',
    rating: 4.9,
    reviews: 96,
    badge: 'For Groups & Weddings',
    image: '/images/urbania-new.jpeg',
    features: [
      'Push-Back Recliners',
      'Full-Cabin AC',
      'Big Luggage Deck'
    ]
  }
];
