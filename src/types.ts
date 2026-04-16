export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Resort {
  rank: number;
  name: string;
  slug: string;
  terrainScore: number;
  parkScore: number;
  snowQuality: number;
  liftEfficiency: number;
  overallScore: number;
  description: string;
  reviews: Review[];
  heroImage: string;
  stats?: {
    verticalDrop: string;
    acres: string;
    lifts: string;
    parks: string;
    snowfall: string;
  };
}

export interface Award {
  category: string;
  winner: string;
  justification: string;
  icon: string;
}
