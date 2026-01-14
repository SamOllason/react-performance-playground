export interface Dog {
  id: number;
  name: string;
  breed: string;
  color: string;
  favoriteToy: string;
  favoriteFood: string;
  behaviorRating: number; // 1-5
  emoji: string;
}

const dogNames = [
  'Buddy', 'Max', 'Charlie', 'Luna', 'Bella', 'Cooper', 'Daisy', 'Rocky',
  'Sadie', 'Tucker', 'Molly', 'Bear', 'Maggie', 'Duke', 'Lucy', 'Zeus',
  'Bailey', 'Bentley', 'Stella', 'Oliver', 'Penny', 'Winston', 'Chloe', 'Milo'
];

const breeds = [
  'Golden Retriever', 'Labrador', 'German Shepherd', 'Beagle', 'Poodle',
  'Bulldog', 'Corgi', 'Husky', 'Dachshund', 'Border Collie',
  'Australian Shepherd', 'Pug', 'Shiba Inu', 'Rottweiler', 'Boxer'
];

const colors = [
  'Golden', 'Black', 'Brown', 'White', 'Spotted', 'Tan',
  'Gray', 'Cream', 'Chocolate', 'Brindle', 'Merle'
];

const toys = [
  '🎾 Tennis Ball', '🦴 Squeaky Bone', '🥏 Frisbee', '🧸 Teddy Bear',
  '🪢 Rope Toy', '⚾ Baseball', '🎈 Balloon', '🥾 Old Shoe',
  '🦆 Rubber Ducky', '🎪 Ring Toy'
];

const foods = [
  '🥩 Steak', '🍗 Chicken', '🥓 Bacon', '🧀 Cheese', '🥕 Carrots',
  '🍎 Apple Slices', '🥜 Peanut Butter', '🍕 Pizza Crusts',
  '🌭 Hot Dogs', '🍖 Lamb Chops'
];

const emojis = ['🐕', '🐶', '🦮', '🐕‍🦺', '🐩'];

let idCounter = 0;

export const generateDog = (): Dog => {
  idCounter++;
  return {
    id: idCounter,
    name: dogNames[Math.floor(Math.random() * dogNames.length)],
    breed: breeds[Math.floor(Math.random() * breeds.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    favoriteToy: toys[Math.floor(Math.random() * toys.length)],
    favoriteFood: foods[Math.floor(Math.random() * foods.length)],
    behaviorRating: Math.floor(Math.random() * 5) + 1,
    emoji: emojis[Math.floor(Math.random() * emojis.length)]
  };
};

export const generateDogs = (count: number): Dog[] => {
  return Array.from({ length: count }, () => generateDog());
};
