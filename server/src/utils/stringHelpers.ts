import { v4 as uuidv4 } from "uuid";

export const generateId = (): string => {
  return uuidv4();
};

export const anonymousAnimals = ["Alligator","Anteater","Armadillo","Auroch","Axolotl","Badger","Bat","Bear","Beaver","Buffalo","Camel","Capybara","Chameleon","Cheetah","Chinchilla","Chipmunk","Chupacabra","Cormorant","Coyote","Crow","Dingo","Dinosaur","Dog","Dolphin","Duck","Elephant","Ferret","Fox","Frog","Giraffe","Gopher","Grizzly","Hedgehog","Hippo","Hyena","Ibex","Ifrit","Iguana","Jackal","Kangaroo","Koala","Kraken","Lemur","Leopard","Liger","Lion","Llama","Loris","Manatee","Mink","Monkey","Moose","Narwhal","Nyan Cat","Orangutan","Otter","Panda","Penguin","Platypus","Pumpkin","Python","Quagga","Rabbit","Raccoon","Rhino","Sheep","Shrew","Skunk","Squirrel","Tiger","Turtle","Walrus","Wolf","Wolverine","Wombat"];

export const getRandomElement = (arr: Array<string>) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
