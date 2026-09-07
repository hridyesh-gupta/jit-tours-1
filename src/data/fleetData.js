export const OWNER_PHONE = '+919876543210';
export const OWNER_PHONE_DISPLAY = '+91 98765 43210';
export const OWNER_WHATSAPP_NUMBER = '919876543210';
export const OWNER_EMAIL = 'jittoursandtravels@gmail.com';

export const getCarWhatsAppLink = (carName, passengers, ratePerKm) => {
  const text = `Hello Jit Tours and Travels, I am interested in booking *${carName}* (${passengers} Seater, ₹${ratePerKm}/km). Please provide availability, final quotation, and booking details.`;
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
    badge: '★ Best Value 5-Seater',
    image: '/images/dzire-new.png',
    features: [
      'Comfortable 5-Seater Seating',
      'Dual Front Airbags & ABS Safety',
      'Rear AC Vents & High Fuel Economy',
      'Spacious Boot for 3 Large Suitcases',
      'Bottled Mineral Water & Music System'
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
    badge: '★ Best Value 7-Seater Family MPV',
    image: '/images/ertiga-new.png',
    features: [
      'Spacious 7-Seater Seating Arrangement',
      'Roof-Mounted Multi-Speed AC for all rows',
      'Reclining 2nd & 3rd Row Comfortable Seats',
      'USB Fast Charging Ports in every row',
      'Smooth Suspensions for Long Family Journeys'
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
    badge: '👑 King of Highways (7 Seater)',
    image: '/images/innova-new.png',
    features: [
      'Plush 7-Seater Cabin with Captain Seats',
      'Triple-Zone Automatic Climate Control',
      'Ultra-Quiet Cushion Highway Cruise Ride',
      'Ambient Cabin Lighting & Premium Interiors',
      'Verified Highway Master Chauffeur'
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
    badge: '🚐 Best for Groups & Weddings',
    image: '/images/urbania-new.png',
    features: [
      '17-Seater Push-Back Recliner Cabin',
      'Dedicated Roof AC for the Full Cabin',
      'Ideal for Wedding Guest & Group Pilgrim Convoys',
      'Large Luggage Deck for Multi-Day Tours',
      'Experienced Highway Chauffeur'
    ]
  }
];
