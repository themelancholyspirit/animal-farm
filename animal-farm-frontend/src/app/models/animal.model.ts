export interface Animal {
  id: number;
  name: string;
  species: string;
  imageUrl: string;
  thanksCount: number;
  disgustCount: number;
  soundUrl?: string;
  quote?: string;
  favoriteFoods: string[];
} 
