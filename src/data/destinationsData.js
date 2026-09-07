// Popular destinations Jit Tours and Travels covers from Prayagraj, across UP & MP.
// "featured" destinations get a full visual card; the rest show in the
// "Explore All Destinations" list. No stock photos are used here on purpose —
// swap in real photos later (public/images/destinations/<id>.jpg) the same
// way the fleet photos were wired in.

export const FEATURED_DESTINATIONS = [
  {
    id: 'varanasi',
    name: 'Varanasi',
    subtitle: 'Kashi / Banaras',
    state: 'Uttar Pradesh',
    icon: 'Flame',
    tagline: 'Ghats, Ganga Aarti & Kashi Vishwanath',
    description: 'The spiritual capital of India. Witness the iconic Ganga Aarti at Dashashwamedh Ghat and seek blessings at the Kashi Vishwanath Temple.',
    tags: ['Ganga Aarti', 'Kashi Vishwanath', 'Ghats'],
    approxDistance: '~125 km from Prayagraj',
    recommendedCar: 'Dzire / Ertiga / Innova Crysta'
  },
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    subtitle: 'Ram Janmabhoomi',
    state: 'Uttar Pradesh',
    icon: 'Landmark',
    tagline: 'Shri Ram Janmabhoomi Mandir',
    description: 'The birthplace of Lord Ram. Visit the grand Ram Mandir, Hanuman Garhi, and the sacred Sarayu river ghats.',
    tags: ['Ram Mandir', 'Hanuman Garhi', 'Sarayu Ghat'],
    approxDistance: '~165 km from Prayagraj',
    recommendedCar: 'Ertiga / Innova Crysta'
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    subtitle: 'City of Nawabs',
    state: 'Uttar Pradesh',
    icon: 'Building2',
    tagline: 'Bara Imambara, Chikankari & Awadhi Cuisine',
    description: 'The elegant capital of UP, famous for Nawabi architecture, Bara Imambara, Rumi Darwaza, and legendary Awadhi food.',
    tags: ['Bara Imambara', 'Awadhi Cuisine', 'Heritage City'],
    approxDistance: '~200 km from Prayagraj',
    recommendedCar: 'Innova Crysta / Dzire'
  },
  {
    id: 'sarnath',
    name: 'Sarnath',
    subtitle: 'Buddhist Heritage Circuit',
    state: 'Uttar Pradesh',
    icon: 'CircleDot',
    tagline: 'Where Buddha Gave His First Sermon',
    description: 'A major Buddhist pilgrimage site near Varanasi, home to the Dhamekh Stupa and the Ashoka Pillar.',
    tags: ['Dhamekh Stupa', 'Buddhist Circuit', 'Ashoka Pillar'],
    approxDistance: '~135 km from Prayagraj',
    recommendedCar: 'Dzire / Ertiga'
  },
  {
    id: 'mathura-vrindavan',
    name: 'Mathura & Vrindavan',
    subtitle: 'Shri Krishna Janmabhoomi',
    state: 'Uttar Pradesh',
    icon: 'Flower2',
    tagline: 'Krishna Janmabhoomi & Banke Bihari Temple',
    description: 'The land of Lord Krishna. Visit Krishna Janmabhoomi in Mathura and the Banke Bihari & Prem Mandir in Vrindavan.',
    tags: ['Krishna Janmabhoomi', 'Banke Bihari', 'Prem Mandir'],
    approxDistance: '~445 km from Prayagraj',
    recommendedCar: 'Innova Crysta / Force Urbania'
  },
  {
    id: 'agra',
    name: 'Agra',
    subtitle: 'Taj Mahal',
    state: 'Uttar Pradesh',
    icon: 'Landmark',
    tagline: 'Taj Mahal & Agra Fort',
    description: 'Home to the Taj Mahal, one of the Seven Wonders of the World, along with the majestic Agra Fort.',
    tags: ['Taj Mahal', 'Agra Fort', 'UNESCO Site'],
    approxDistance: '~470 km from Prayagraj',
    recommendedCar: 'Innova Crysta / Force Urbania'
  },
  {
    id: 'chitrakoot',
    name: 'Chitrakoot',
    subtitle: 'Ram Ghat & Kamadgiri (UP-MP Border)',
    state: 'Uttar Pradesh & Madhya Pradesh',
    icon: 'Mountain',
    tagline: 'Where Lord Ram Spent His Exile',
    description: 'A sacred hill town straddling UP and MP. Covers Ram Ghat, Kamadgiri Parikrama, Gupt Godavari, and Sati Anusuya Ashram.',
    tags: ['Kamadgiri', 'Ram Ghat', 'Gupt Godavari'],
    approxDistance: '~130 km from Prayagraj',
    recommendedCar: 'Dzire / Ertiga'
  },
  {
    id: 'rewa-waterfalls',
    name: 'Rewa Waterfalls',
    subtitle: 'Keoti, Chachai & Bahuti',
    state: 'Madhya Pradesh',
    icon: 'Waves',
    tagline: 'Land of White Tigers & Monsoon Waterfalls',
    description: 'Home to some of India\'s tallest waterfalls — Keoti, Chachai, and Bahuti — best visited in the monsoon.',
    tags: ['Waterfalls', 'White Tigers', 'Monsoon Trip'],
    approxDistance: '~140 km from Prayagraj',
    recommendedCar: 'Innova Crysta / Force Urbania'
  },
  {
    id: 'khajuraho',
    name: 'Khajuraho',
    subtitle: 'UNESCO World Heritage Temples',
    state: 'Madhya Pradesh',
    icon: 'Landmark',
    tagline: 'Ancient Temple Architecture',
    description: 'World-famous for its intricately carved temples, recognized as a UNESCO World Heritage Site.',
    tags: ['UNESCO Site', 'Temple Architecture', 'Heritage'],
    approxDistance: '~360 km from Prayagraj',
    recommendedCar: 'Innova Crysta / Force Urbania'
  },
  {
    id: 'bandhavgarh',
    name: 'Bandhavgarh National Park',
    subtitle: 'Tiger Reserve',
    state: 'Madhya Pradesh',
    icon: 'TreePine',
    tagline: 'One of India\'s Best Tiger Reserves',
    description: 'A premier wildlife destination known for having one of the highest tiger densities in India.',
    tags: ['Tiger Safari', 'Wildlife', 'National Park'],
    approxDistance: '~340 km from Prayagraj',
    recommendedCar: 'Innova Crysta / Force Urbania'
  }
];

// Additional destinations shown in the "Explore All Destinations" list (no card/image).
export const MORE_DESTINATIONS = [
  { id: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh' },
  { id: 'vindhyachal', name: 'Vindhyachal (Maa Vindhyavasini)', state: 'Uttar Pradesh' },
  { id: 'mirzapur', name: 'Mirzapur (Vindhya Ghats & Forts)', state: 'Uttar Pradesh' },
  { id: 'fatehpur-sikri', name: 'Fatehpur Sikri (Buland Darwaza)', state: 'Uttar Pradesh' },
  { id: 'kaushambi', name: 'Kaushambi (Ancient Buddhist Ruins)', state: 'Uttar Pradesh' },
  { id: 'shringverpur', name: 'Shringverpur (Nishadraj Guha Dham)', state: 'Uttar Pradesh' },
  { id: 'rewa-city', name: 'Rewa City', state: 'Madhya Pradesh' },
  { id: 'satna', name: 'Satna (Gateway to Chitrakoot & Maihar)', state: 'Madhya Pradesh' },
  { id: 'maihar', name: 'Maihar (Maa Sharda Devi Temple)', state: 'Madhya Pradesh' },
  { id: 'panna', name: 'Panna (National Park & Diamond Mines)', state: 'Madhya Pradesh' }
];

export const ALL_DESTINATION_NAMES = [
  ...FEATURED_DESTINATIONS.map(d => d.name),
  ...MORE_DESTINATIONS.map(d => d.name)
];
