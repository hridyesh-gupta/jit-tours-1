// Curated list of destinations in Uttar Pradesh and Madhya Pradesh for Jit Tours and Travels
export const INDIAN_CITIES = [
  // --- UTTAR PRADESH DESTINATIONS ---
  { id: 'prayagraj', name: 'Prayagraj (Allahabad), UP', lat: 25.4358, lng: 81.8463, state: 'Uttar Pradesh', region: 'UP Central' },
  { id: 'varanasi', name: 'Varanasi (Kashi / Banaras), UP', lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh', region: 'UP East' },
  { id: 'ayodhya', name: 'Ayodhya (Ram Janmabhoomi), UP', lat: 26.7922, lng: 82.1998, state: 'Uttar Pradesh', region: 'UP Central' },
  { id: 'lucknow', name: 'Lucknow (City of Nawabs), UP', lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh', region: 'UP Central' },
  { id: 'kanpur', name: 'Kanpur, UP', lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh', region: 'UP Central' },
  { id: 'chitrakoot-up', name: 'Chitrakoot (Ram Ghat / Kamadgiri), UP', lat: 25.1764, lng: 80.8656, state: 'Uttar Pradesh', region: 'UP Bundelkhand' },
  { id: 'vindhyachal', name: 'Vindhyachal (Maa Vindhyavasini), UP', lat: 25.1633, lng: 82.5028, state: 'Uttar Pradesh', region: 'UP East' },
  { id: 'mirzapur', name: 'Mirzapur (Vindhya Ghats & Forts), UP', lat: 25.1337, lng: 82.5644, state: 'Uttar Pradesh', region: 'UP East' },
  { id: 'sarnath', name: 'Sarnath (Dhamekh Stupa / Buddhist Circuit), UP', lat: 25.3762, lng: 83.0227, state: 'Uttar Pradesh', region: 'UP East' },
  { id: 'mathura', name: 'Mathura (Shri Krishna Janmabhoomi), UP', lat: 27.4924, lng: 77.6737, state: 'Uttar Pradesh', region: 'UP West' },
  { id: 'vrindavan', name: 'Vrindavan (Prem Mandir / Banke Bihari), UP', lat: 27.5806, lng: 77.7006, state: 'Uttar Pradesh', region: 'UP West' },
  { id: 'agra', name: 'Agra (Taj Mahal / Agra Fort), UP', lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh', region: 'UP West' },
  { id: 'fatehpur-sikri', name: 'Fatehpur Sikri (Buland Darwaza), UP', lat: 27.0945, lng: 77.6679, state: 'Uttar Pradesh', region: 'UP West' },
  { id: 'kaushambi', name: 'Kaushambi (Ancient Buddhist Ruins), UP', lat: 25.5342, lng: 81.3813, state: 'Uttar Pradesh', region: 'UP Central' },
  { id: 'shringverpur', name: 'Shringverpur (Nishadraj Guha Dham), UP', lat: 25.5900, lng: 81.6500, state: 'Uttar Pradesh', region: 'UP Central' },
  { id: 'vindhya-region-up', name: 'Vindhya Region Destinations (UP)', lat: 24.8000, lng: 82.2000, state: 'Uttar Pradesh', region: 'UP East' },

  // --- MADHYA PRADESH DESTINATIONS ---
  { id: 'rewa', name: 'Rewa (Land of White Tigers), MP', lat: 24.5362, lng: 81.3037, state: 'Madhya Pradesh', region: 'MP Vindhya' },
  { id: 'rewa-waterfalls', name: 'Rewa Waterfalls (Keoti, Chachai & Bahuti), MP', lat: 24.7800, lng: 81.5200, state: 'Madhya Pradesh', region: 'MP Vindhya' },
  { id: 'khajuraho', name: 'Khajuraho (UNESCO World Heritage Temples), MP', lat: 24.8318, lng: 79.9199, state: 'Madhya Pradesh', region: 'MP Bundelkhand' },
  { id: 'satna', name: 'Satna (Gateway to Chitrakoot & Maihar), MP', lat: 24.6005, lng: 80.8322, state: 'Madhya Pradesh', region: 'MP Vindhya' },
  { id: 'maihar', name: 'Maihar (Maa Sharda Devi Temple), MP', lat: 24.2690, lng: 80.7554, state: 'Madhya Pradesh', region: 'MP Vindhya' },
  { id: 'bandhavgarh', name: 'Bandhavgarh (Tiger Reserve & National Park), MP', lat: 23.7042, lng: 81.0264, state: 'Madhya Pradesh', region: 'MP Central' },
  { id: 'panna', name: 'Panna (Panna National Park & Diamond Mines), MP', lat: 24.7200, lng: 80.1900, state: 'Madhya Pradesh', region: 'MP Bundelkhand' },
  { id: 'chitrakoot-mp', name: 'Chitrakoot Region (Gupt Godavari / Sati Anusuya), MP', lat: 25.1500, lng: 80.8500, state: 'Madhya Pradesh', region: 'MP Vindhya' }
];

// Distance Calculation Helper (Haversine formula + 1.25 highway curvature factor)
export function calculateRoadDistance(city1Id, city2Id) {
  const c1 = INDIAN_CITIES.find(c => c.id === city1Id);
  const c2 = INDIAN_CITIES.find(c => c.id === city2Id);

  if (!c1 || !c2) return { distanceKm: 0, isWithinLimit: true, note: '' };
  if (c1.id === c2.id) return { distanceKm: 35, isWithinLimit: true, note: 'Local city sightseeing rental trip in ' + c1.name.split(',')[0] };

  const R = 6371; // Earth radius in km
  const dLat = (c2.lat - c1.lat) * (Math.PI / 180);
  const dLng = (c2.lng - c1.lng) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1.lat * (Math.PI / 180)) * Math.cos(c2.lat * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const aerialDistance = R * c;

  // Road factor multiplier
  const multiplier = 1.25;
  const roadDistanceKm = Math.round(aerialDistance * multiplier);
  const MAX_LIMIT_KM = 1500;
  const isWithinLimit = roadDistanceKm <= MAX_LIMIT_KM;

  return {
    distanceKm: roadDistanceKm,
    isWithinLimit,
    maxLimit: MAX_LIMIT_KM,
    note: isWithinLimit 
      ? `✅ Route distance (~${roadDistanceKm} km) is fully serviced by Jit Tours and Travels!`
      : `⚠️ Route (~${roadDistanceKm} km) exceeds our 1,500 km operating radius. Please contact us for custom multi-day itinerary.`
  };
}

// Popular Featured Regional Routes in UP & MP
export const POPULAR_ROUTES = [
  { from: 'prayagraj', to: 'varanasi', name: 'Prayagraj ➔ Varanasi (Kashi Vishwanath)', distance: 125, tag: 'Most Popular Holy Circuit', time: '2.5 - 3 hrs', RecommendedCar: 'Innova Crysta (7-Seater)' },
  { from: 'prayagraj', to: 'ayodhya', name: 'Prayagraj ➔ Ayodhya (Ram Mandir)', distance: 165, tag: 'Sacred Ramayana Route', time: '3.5 - 4 hrs', RecommendedCar: 'Ertiga (7-Seater)' },
  { from: 'prayagraj', to: 'chitrakoot-up', name: 'Prayagraj ➔ Chitrakoot Dham', distance: 130, tag: 'Holy Hill & Ghats', time: '3 hrs', RecommendedCar: 'Dzire (5-Seater)' },
  { from: 'prayagraj', to: 'rewa-waterfalls', name: 'Prayagraj ➔ Rewa (Keoti & Bahuti Waterfalls)', distance: 140, tag: 'Scenic Waterfalls Tour', time: '3.5 hrs', RecommendedCar: 'Innova Crysta (7-Seater)' },
  { from: 'prayagraj', to: 'maihar', name: 'Prayagraj ➔ Maihar (Maa Sharda Temple)', distance: 210, tag: 'Shaktipeeth Pilgrimage', time: '4.5 hrs', RecommendedCar: 'Ertiga (7-Seater)' },
  { from: 'varanasi', to: 'vindhyachal', name: 'Varanasi ➔ Vindhyachal ➔ Mirzapur', distance: 80, tag: 'Tri-Temple Yatra', time: '2 hrs', RecommendedCar: 'Dzire (5-Seater)' },
  { from: 'lucknow', to: 'ayodhya', name: 'Lucknow ➔ Ayodhya Expressway', distance: 135, tag: 'Express Highway', time: '2.5 hrs', RecommendedCar: 'Innova Crysta (7-Seater)' },
  { from: 'khajuraho', to: 'panna', name: 'Khajuraho ➔ Panna National Park & Diamond Mines', distance: 45, tag: 'Wildlife & Heritage', time: '1 hr', RecommendedCar: 'Innova Crysta (7-Seater)' }
];
