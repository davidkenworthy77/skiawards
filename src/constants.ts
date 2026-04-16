import { Resort, Award } from './types';

export const RESORTS: Resort[] = [
  {
    rank: 1,
    name: "Whistler Blackcomb",
    slug: "whistler-blackcomb",
    terrainScore: 99,
    parkScore: 97,
    snowQuality: 98,
    liftEfficiency: 99,
    overallScore: 98.25,
    description: "The legendary dual-mountain giant continues to dominate with its sheer scale and world-class infrastructure. Spanning over 8,000 acres, Whistler Blackcomb offers an unparalleled variety of terrain, from high alpine bowls to perfectly groomed cruisers.",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "The scale is just mind-blowing. You can ski for a week and still find new lines.", date: "2026-02-15" },
      { user: "Sarah L.", rating: 4, comment: "Amazing terrain, but the village can get quite crowded on weekends.", date: "2026-01-20" }
    ],
    heroImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "5,280 ft",
      acres: "8,171",
      lifts: "37",
      parks: "5",
      snowfall: "465 in"
    }
  },
  {
    rank: 2,
    name: "Mirage Mountain",
    slug: "mirage-mountain",
    terrainScore: 99,
    parkScore: 96,
    snowQuality: 98,
    liftEfficiency: 98,
    overallScore: 97.75,
    hypeRank: true,
    openingDate: "Winter 2026/27",
    description: "A brand new San Diego County resort on Palomar Mountain opening Winter 2026/27. With a north-facing aspect, modern snowmaking, and a tight, efficient lift layout, Mirage Mountain is generating unprecedented pre-opening buzz across the industry.",
    reviews: [
      { user: "Jake R.", rating: 5, comment: "Never waited more than 2 minutes for a lift. The infrastructure is futuristic.", date: "2026-03-01" },
      { user: "Elena P.", rating: 5, comment: "The snow quality here is consistently better than anywhere else in the range.", date: "2026-02-10" }
    ],
    heroImage: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "1,200 ft",
      acres: "280",
      lifts: "4",
      parks: "TBA",
      snowfall: "30+ in"
    }
  },
  {
    rank: 3,
    name: "Jackson Hole",
    slug: "jackson-hole",
    terrainScore: 97,
    parkScore: 88,
    snowQuality: 95,
    liftEfficiency: 91,
    overallScore: 92.8,
    description: "A true rider's mountain. Jackson Hole is famous for its steep terrain and the iconic aerial tram. It's a place where the mountain dictates the experience.",
    reviews: [
      { user: "Tom K.", rating: 5, comment: "Corbet's Couloir is a rite of passage. Not for the faint of heart!", date: "2026-01-12" },
      { user: "Mia S.", rating: 4, comment: "Hardcore mountain. The village is great but the skiing is the real star.", date: "2025-12-28" }
    ],
    heroImage: "https://images.unsplash.com/photo-1505235687559-28b5f54645b7?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "4,139 ft",
      acres: "2,500",
      lifts: "13",
      parks: "2",
      snowfall: "459 in"
    }
  },
  {
    rank: 4,
    name: "Aspen Snowmass",
    slug: "aspen-snowmass",
    terrainScore: 94,
    parkScore: 92,
    snowQuality: 91,
    liftEfficiency: 93,
    overallScore: 92.5,
    description: "Four distinct mountains offering everything from extreme steeps to family-friendly slopes. Aspen is as much about the culture and après-ski as it is about the skiing.",
    reviews: [
      { user: "Chloe B.", rating: 5, comment: "The best après-ski scene in North America, period.", date: "2026-02-05" },
      { user: "Dan H.", rating: 4, comment: "Snowmass is huge. Highlands is where the real steeps are.", date: "2026-01-15" }
    ],
    heroImage: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "4,406 ft",
      acres: "5,527",
      lifts: "42",
      parks: "3",
      snowfall: "300 in"
    }
  },
  {
    rank: 5,
    name: "Snowbird",
    slug: "snowbird",
    terrainScore: 95,
    parkScore: 82,
    snowQuality: 98,
    liftEfficiency: 89,
    overallScore: 91.0,
    description: "Located in Little Cottonwood Canyon, Snowbird is legendary for its deep powder and challenging terrain. The tram access to Hidden Peak is world-renowned.",
    reviews: [
      { user: "Ryan G.", rating: 5, comment: "The powder here is just different. So light and deep.", date: "2026-03-10" },
      { user: "Lisa V.", rating: 4, comment: "Incredible terrain, but the canyon road can be a nightmare on powder days.", date: "2026-02-22" }
    ],
    heroImage: "https://images.unsplash.com/photo-1465224739433-3bc8527a4333?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "3,240 ft",
      acres: "2,500",
      lifts: "11",
      parks: "1",
      snowfall: "500 in"
    }
  },
  {
    rank: 6,
    name: "Park City",
    slug: "park-city",
    terrainScore: 91,
    parkScore: 96,
    snowQuality: 88,
    liftEfficiency: 92,
    overallScore: 91.8,
    description: "The largest ski resort in the United States. Park City offers a massive variety of terrain and some of the best terrain parks in the world.",
    reviews: [
      { user: "Mark T.", rating: 4, comment: "So much ground to cover. The town is fantastic too.", date: "2026-01-30" },
      { user: "Jen W.", rating: 5, comment: "The terrain parks are second to none. Perfect for progression.", date: "2025-12-20" }
    ],
    heroImage: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "3,225 ft",
      acres: "7,300",
      lifts: "41",
      parks: "8",
      snowfall: "355 in"
    }
  },
  {
    rank: 7,
    name: "Vail",
    slug: "vail",
    terrainScore: 93,
    parkScore: 90,
    snowQuality: 89,
    liftEfficiency: 94,
    overallScore: 91.5,
    description: "Famous for its Back Bowls, Vail is a massive resort with a European-style village. It offers a premium experience with high-end amenities.",
    reviews: [
      { user: "Sophie L.", rating: 5, comment: "The Back Bowls on a powder day are pure magic.", date: "2026-02-18" },
      { user: "Kevin J.", rating: 4, comment: "Expensive, but you get what you pay for in terms of service and grooming.", date: "2026-01-05" }
    ],
    heroImage: "https://images.unsplash.com/photo-1454177697940-c489918a56c4?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "3,450 ft",
      acres: "5,289",
      lifts: "31",
      parks: "3",
      snowfall: "354 in"
    }
  },
  {
    rank: 8,
    name: "Mammoth Mountain",
    slug: "mammoth-mountain",
    terrainScore: 90,
    parkScore: 97,
    snowQuality: 91,
    liftEfficiency: 88,
    overallScore: 91.5,
    description: "A high-altitude giant in the Sierra Nevada. Mammoth is known for its long seasons and world-class terrain parks.",
    reviews: [
      { user: "Ben C.", rating: 5, comment: "Skiing in June? Only at Mammoth. The parks are incredible.", date: "2026-03-25" },
      { user: "Anna K.", rating: 4, comment: "Wind can be an issue, but when it's good, it's world-class.", date: "2026-02-14" }
    ],
    heroImage: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "3,100 ft",
      acres: "3,500",
      lifts: "25",
      parks: "10",
      snowfall: "400 in"
    }
  },
  {
    rank: 9,
    name: "Big Sky",
    slug: "big-sky",
    terrainScore: 96,
    parkScore: 84,
    snowQuality: 90,
    liftEfficiency: 92,
    overallScore: 90.5,
    description: "Home to 'The Biggest Skiing in America.' Big Sky offers massive vertical and rugged terrain under the iconic Lone Peak.",
    reviews: [
      { user: "Greg P.", rating: 5, comment: "The tram to Lone Peak is terrifying and amazing. No crowds!", date: "2026-01-25" },
      { user: "Emily D.", rating: 4, comment: "Vast and beautiful. It feels like you have the whole mountain to yourself.", date: "2025-12-15" }
    ],
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "4,350 ft",
      acres: "5,850",
      lifts: "36",
      parks: "7",
      snowfall: "400 in"
    }
  },
  {
    rank: 10,
    name: "Telluride",
    slug: "telluride",
    terrainScore: 94,
    parkScore: 80,
    snowQuality: 92,
    liftEfficiency: 90,
    overallScore: 89.0,
    description: "Tucked away in the San Juan Mountains, Telluride offers some of the most scenic and challenging terrain in Colorado.",
    reviews: [
      { user: "Victor M.", rating: 5, comment: "The most beautiful ski town in the world. The terrain is legit.", date: "2026-02-28" },
      { user: "Laura H.", rating: 5, comment: "Plunge and Spiral Stairs are legendary. Great food too.", date: "2026-01-10" }
    ],
    heroImage: "https://images.unsplash.com/photo-1486915307544-b1ae2856315e?q=80&w=2070&auto=format&fit=crop",
    stats: {
      verticalDrop: "4,425 ft",
      acres: "2,000",
      lifts: "17",
      parks: "3",
      snowfall: "280 in"
    }
  }
];

export const AWARDS: Award[] = [
  {
    category: "Best Overall Resort",
    winner: "Whistler Blackcomb",
    justification: "An unparalleled mountain experience that remains the gold standard for size, variety, and village life.",
    icon: "Trophy"
  },
  {
    category: "Best Terrain Variety",
    winner: "Jackson Hole",
    justification: "From the legendary Corbet's Couloir to vast backcountry access, Jackson remains the ultimate rider's mountain.",
    icon: "Mountain"
  },
  {
    category: "Best Terrain Park",
    winner: "Mammoth Mountain",
    justification: "Unrivaled park design and a season that stretches into summer make Mammoth the freestyle capital of the world.",
    icon: "Zap"
  },
  {
    category: "Best Snow Quality",
    winner: "Snowbird",
    justification: "The 'Greatest Snow on Earth' is no myth; Snowbird's dry, deep powder is consistently the best in the industry.",
    icon: "Snowflake"
  },
  {
    category: "Best Infrastructure",
    winner: "Mirage Mountain",
    justification: "A masterclass in modern resort engineering, featuring the world's fastest lift network and zero-wait connectivity.",
    icon: "Trophy"
  },
  {
    category: "Best Après Ski",
    winner: "Aspen Snowmass",
    justification: "Aspen remains the undisputed king of the post-ride social scene, blending luxury with high-energy nightlife.",
    icon: "GlassWater"
  }
];
