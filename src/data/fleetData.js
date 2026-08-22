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
  // 5-SEATER VEHICLES
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
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: [
      'Comfortable 5-Seater Seating',
      'Dual Front Airbags & ABS Safety',
      'Rear AC Vents & High Fuel Economy',
      'Spacious Boot for 3 Large Suitcases',
      'Bottled Mineral Water & Music System'
    ]
  },
  {
    id: 'creta-5seater',
    name: 'Hyundai Creta / Kia Seltos (5 Seater)',
    category: '5-Seater',
    type: 'Premium Compact SUV',
    passengers: 5,
    luggage: '4 Large Bags',
    ratePerKm: 16,
    driverAllowance: '₹450 / day',
    fuel: 'Diesel / Petrol',
    transmission: 'Automatic / Manual',
    rating: 4.92,
    reviews: 310,
    badge: 'Premium 5-Seater SUV',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    features: [
      'Spacious 5-Seater Luxury Cabin',
      'High Ground Clearance for Indian Roads',
      'Panoramic Sunroof & Bose Audio System',
      'Wireless Phone Charger & Dual Zone AC',
      'Rear Sunshades & Extra Legroom'
    ]
  },

  // 7-SEATER VEHICLES
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
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: [
      'Plush 7-Seater Cabin with Captain Seats',
      'Triple-Zone Automatic Climate Control',
      'Ultra-Quiet Cushion Highway Cruise Ride',
      'Ambient Cabin Lighting & Premium Interiors',
      'Verified Highway Master Chauffeur'
    ]
  },
  {
    id: 'scorpio-7seater',
    name: 'Mahindra Scorpio-N (7 Seater 4x4)',
    category: '7-Seater',
    type: 'Tough Mountain SUV',
    passengers: 7,
    luggage: '5 Bags',
    ratePerKm: 23,
    driverAllowance: '₹500 / day',
    fuel: 'mHawk Diesel',
    transmission: 'Automatic 4WD',
    rating: 4.93,
    reviews: 295,
    badge: 'Rugged 7-Seater All-Terrain King',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    features: [
      '7-Seater Rugged All-Terrain SUV',
      '4x4 Terrain Modes for Hills & Ghats',
      'High Command Seating & ADAS Safety',
      'Sony 3D Surround Sound System',
      'Roof Carrier Available upon Request'
    ]
  },

  // LUXURY CATEGORY
  {
    id: 'fortuner-luxury',
    name: 'Toyota Fortuner 4x4 (7 Seater VIP)',
    category: 'Luxury',
    type: 'VIP Executive SUV',
    passengers: 7,
    luggage: '6 Large Suitcases',
    ratePerKm: 38,
    driverAllowance: '₹700 / day',
    fuel: 'Heavy Duty Diesel',
    transmission: 'Automatic 4x4',
    rating: 5.0,
    reviews: 165,
    badge: 'VIP & Celebrity Executive 7-Seater',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    features: [
      'VIP Uniformed Senior Chauffeur',
      'Perforated Leather Reclining Seats',
      'Unmatched Road Presence & VIP Security',
      'High-Speed In-Car Wi-Fi & Cold Beverages',
      '24/7 Priority VIP Concierge Hotline'
    ]
  }
];
