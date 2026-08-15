// Curated list of popular Indian pickup & destination cities for outstation car rentals
export const INDIAN_CITIES = [
  { id: 'delhi', name: 'Delhi NCR (Delhi/Gurugram/Noida)', lat: 28.6139, lng: 77.2090, region: 'North' },
  { id: 'mumbai', name: 'Mumbai, Maharashtra', lat: 19.0760, lng: 72.8777, region: 'West' },
  { id: 'bengaluru', name: 'Bengaluru, Karnataka', lat: 12.9716, lng: 77.5946, region: 'South' },
  { id: 'jaipur', name: 'Jaipur, Rajasthan', lat: 26.9124, lng: 75.7873, region: 'North' },
  { id: 'goa', name: 'Panaji / Goa (North & South)', lat: 15.2993, lng: 74.1240, region: 'West' },
  { id: 'chandigarh', name: 'Chandigarh / Mohali', lat: 30.7333, lng: 76.7794, region: 'North' },
  { id: 'shimla', name: 'Shimla, Himachal Pradesh', lat: 31.1048, lng: 77.1734, region: 'North' },
  { id: 'manali', name: 'Manali, Himachal Pradesh', lat: 32.2432, lng: 77.1892, region: 'North' },
  { id: 'agra', name: 'Agra, Uttar Pradesh', lat: 27.1767, lng: 78.0081, region: 'North' },
  { id: 'udaipur', name: 'Udaipur, Rajasthan', lat: 24.5854, lng: 73.7125, region: 'West' },
  { id: 'pune', name: 'Pune, Maharashtra', lat: 18.5204, lng: 73.8567, region: 'West' },
  { id: 'hyderabad', name: 'Hyderabad, Telangana', lat: 17.3850, lng: 78.4867, region: 'South' },
  { id: 'chennai', name: 'Chennai, Tamil Nadu', lat: 13.0827, lng: 80.2707, region: 'South' },
  { id: 'coorg', name: 'Madikeri / Coorg, Karnataka', lat: 12.4244, lng: 75.7382, region: 'South' },
  { id: 'ooty', name: 'Ooty, Tamil Nadu', lat: 11.4102, lng: 76.6950, region: 'South' },
  { id: 'kochi', name: 'Kochi, Kerala', lat: 9.9312, lng: 76.2673, region: 'South' },
  { id: 'kolkata', name: 'Kolkata, West Bengal', lat: 22.5726, lng: 88.3639, region: 'East' },
  { id: 'darjeeling', name: 'Darjeeling, West Bengal', lat: 27.0410, lng: 88.2663, region: 'East' },
  { id: 'varanasi', name: 'Varanasi, Uttar Pradesh', lat: 25.3176, lng: 82.9739, region: 'North' },
  { id: 'dehradun', name: 'Dehradun / Mussoorie, Uttarakhand', lat: 30.3165, lng: 78.0322, region: 'North' },
  { id: 'ahmedabad', name: 'Ahmedabad, Gujarat', lat: 23.0225, lng: 72.5714, region: 'West' },
  { id: 'indore', name: 'Indore, Madhya Pradesh', lat: 22.7196, lng: 75.8577, region: 'Central' },
  { id: 'lucknow', name: 'Lucknow, Uttar Pradesh', lat: 26.8467, lng: 80.9462, region: 'North' },
  { id: 'kanyakumari', name: 'Kanyakumari, Tamil Nadu', lat: 8.0883, lng: 77.5385, region: 'South' }
];

// Distance Calculation Helper (Haversine formula + 1.25 highway curvature factor)
export function calculateRoadDistance(city1Id, city2Id) {
  const c1 = INDIAN_CITIES.find(c => c.id === city1Id);
  const c2 = INDIAN_CITIES.find(c => c.id === city2Id);

  if (!c1 || !c2) return { distanceKm: 0, isWithinLimit: true, note: '' };
  if (c1.id === c2.id) return { distanceKm: 25, isWithinLimit: true, note: 'Local city rental trip' };

  const R = 6371; // Earth radius in km
  const dLat = (c2.lat - c1.lat) * (Math.PI / 180);
  const dLng = (c2.lng - c1.lng) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1.lat * (Math.PI / 180)) * Math.cos(c2.lat * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const aerialDistance = R * c;

  // Road factor multiplier (~1.25 - 1.35 depending on highway terrain)
  const isHilly = ['shimla', 'manali', 'darjeeling', 'coorg', 'ooty', 'dehradun'].includes(c2.id) || ['shimla', 'manali', 'darjeeling', 'coorg', 'ooty', 'dehradun'].includes(c1.id);
  const multiplier = isHilly ? 1.35 : 1.25;

  const roadDistanceKm = Math.round(aerialDistance * multiplier);
  const MAX_LIMIT_KM = 1500;
  const isWithinLimit = roadDistanceKm <= MAX_LIMIT_KM;

  return {
    distanceKm: roadDistanceKm,
    isWithinLimit,
    maxLimit: MAX_LIMIT_KM,
    note: isWithinLimit 
      ? `✅ Route distance (~${roadDistanceKm} km) is well within our 1,500 km operating radius!`
      : `⚠️ Route (~${roadDistanceKm} km) exceeds our 1,500 km max limit. Please split trip or select closer destination.`
  };
}

// Popular Featured Outstation Routes
export const POPULAR_ROUTES = [
  { from: 'mumbai', to: 'goa', name: 'Mumbai ➔ Goa Coastal Drive', distance: 590, tag: 'Most Popular', time: '10-11 hrs', RecommendedCar: 'Innova Crysta (7-Seater)' },
  { from: 'delhi', to: 'manali', name: 'Delhi ➔ Manali Mountain Highway', distance: 535, tag: 'Scenic Himalayas', time: '11-12 hrs', RecommendedCar: 'Scorpio N (7-Seater)' },
  { from: 'bengaluru', to: 'coorg', name: 'Bengaluru ➔ Coorg Coffee Estates', distance: 265, tag: 'Weekend Getaway', time: '5-6 hrs', RecommendedCar: 'Swift Dzire (4-Seater)' },
  { from: 'delhi', to: 'jaipur', name: 'Delhi ➔ Jaipur Royal Heritage', distance: 280, tag: 'Expressway', time: '4.5 hrs', RecommendedCar: 'Hyundai Creta (4-Seater)' },
  { from: 'chennai', to: 'ooty', name: 'Chennai ➔ Ooty Nilgiri Hills', distance: 555, tag: 'Hill Station', time: '10 hrs', RecommendedCar: 'Ertiga (7-Seater)' }
];
