import { Animal } from '../../entities/animal.entity';

export const animalSeedData: Partial<Animal>[] = [
  {
    id: 1,
    name: 'Napoleon',
    species: 'Pig',
    imageUrl: 'assets/images/napoleon.png',
    thanksCount: 0,
    disgustCount: 0,
    quote: "Four legs good, two legs better!",
    favoriteFoods: ['slop', 'rotten_vegetables', 'moldy_bread']
  },
  {
    id: 2,
    name: 'Boxer',
    species: 'Horse',
    imageUrl: 'assets/images/boxer.png',
    thanksCount: 0,
    disgustCount: 0,
    quote: "I will work harder!",
    favoriteFoods: ['hay', 'premium_oats', 'sugar']
  },
  {
    id: 3,
    name: 'Snowball',
    species: 'Pig',
    imageUrl: 'assets/images/snowball.png',
    thanksCount: 0,
    disgustCount: 0,
    quote: "All animals are equal!",
    favoriteFoods: ['slop', 'rotten_vegetables', 'apples']
  },
  {
    id: 4,
    name: 'Benjamin',
    species: 'Donkey',
    imageUrl: 'assets/images/benjamin.png',
    thanksCount: 0,
    disgustCount: 0,
    quote: "Life will go on as it has always gone on",
    favoriteFoods: ['hay', 'corn', 'premium_oats']
  },
  {
    id: 5,
    name: 'Clover',
    species: 'Mare',
    imageUrl: 'assets/images/clover.png',
    thanksCount: 0,
    disgustCount: 0,
    quote: "Something is wrong on the farm",
    favoriteFoods: ['hay', 'sugar', 'premium_oats']
  },
  {
    id: 6,
    name: 'Squealer',
    species: 'Pig',
    imageUrl: 'assets/images/squealer.png',
    thanksCount: 0,
    disgustCount: 0,
    quote: "Comrades, you do not imagine, I hope, that we pigs are doing this in a spirit of selfishness?",
    favoriteFoods: ['slop', 'moldy_bread', 'rotten_vegetables']
  }
];