import { v4 as uuidv4 } from "uuid";

export const generateId = (): string => {
  return uuidv4();
};

export const anonymousAnimals = [
  "Alligator", "Anteater", "Armadillo", "Auroch", "Axolotl", "Badger", "Bat", "Bear", "Beaver",
  "Buffalo", "Camel", "Capybara", "Chameleon", "Cheetah", "Chinchilla", "Chipmunk", "Chupacabra",
  "Cormorant", "Coyote", "Crow", "Dingo", "Dinosaur", "Dog", "Dolphin", "Duck", "Elephant",
  "Ferret", "Fox", "Frog", "Giraffe", "Gopher", "Grizzly", "Hedgehog", "Hippo", "Hyena", "Ibex",
  "Iguana", "Jackal", "Kangaroo", "Koala", "Kraken", "Lemur", "Leopard", "Liger", "Lion",
  "Llama", "Loris", "Manatee", "Mink", "Monkey", "Moose", "Narwhal", "Nyan Cat", "Orangutan",
  "Otter", "Panda", "Penguin", "Platypus", "Pumpkin", "Python", "Quagga", "Rabbit", "Raccoon",
  "Rhino", "Sheep", "Shrew", "Skunk", "Squirrel", "Tiger", "Turtle", "Walrus", "Wolf", "Wolverine",
  "Wombat", "Zebra", "Alpaca", "Bison", "Caribou", "Cougar", "Crane", "Deer", "Eagle", "Falcon",
  "Flamingo", "Gazelle", "Hamster", "Heron", "Jaguar", "Lynx", "Mandrill", "Meerkat", "Ocelot",
  "Pangolin", "Peacock", "Pelican", "Quokka", "Raven", "Reindeer", "Salamander", "Seal", "Sloth",
  "Swan", "Tapir", "Uakari", "Vulture", "Warthog", "Weasel", "Yak", "Zebu"
];

export const getRandomElement = (arr: Array<string>) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
