export type BuildFamily = 'Albus' | 'Onyx';

export interface Build {
  slug: string;
  name: string;
  family: BuildFamily;
  price: string;
  intent: string;
  gpu: string;
  cpu: string;
  memory: string;
  storage: string;
  motherboard: string;
  psu: string;
  cooler: string;
  image: string;
  imageLarge?: string;
}

export const builds: Build[] = [
  {
    slug: 'albus-pro-v2',
    name: 'Albus Pro V2',
    family: 'Albus',
    price: '₹1,99,000',
    intent: 'Quiet, clean 1440p performance',
    gpu: 'Zotac GeForce RTX 5070 12GB',
    cpu: 'AMD Ryzen 7 9700X',
    memory: '32GB DDR5 6000MHz',
    storage: '1TB Gen4 NVMe',
    motherboard: 'Gigabyte B850M Gaming X WiFi 6E',
    psu: '750W 80+ Bronze',
    cooler: 'Deepcool AG400 ARGB',
    image: '/images/builds/albus-pro-v2-800.webp',
    imageLarge: '/images/builds/albus-pro-v2-1600.webp',
  },
  {
    slug: 'onyx-lite',
    name: 'Onyx Lite',
    family: 'Onyx',
    price: '₹93,000',
    intent: 'A focused first gaming PC',
    gpu: 'Zotac GeForce RTX 5050 8GB',
    cpu: 'AMD Ryzen 5 5600F',
    memory: '16GB DDR4 3200MHz',
    storage: '500GB Gen4 NVMe',
    motherboard: 'MSI B550M PRO-VDH WiFi',
    psu: '550W 80+ Bronze',
    cooler: 'Deepcool LE240 V2 ARGB (optional)',
    image: '/images/builds/onyx-lite-800.webp',
    imageLarge: '/images/builds/onyx-lite-1600.webp',
  },
  {
    slug: 'albus-pro',
    name: 'Albus Pro',
    family: 'Albus',
    price: '₹2,13,000',
    intent: 'Creator speed with room to grow',
    gpu: 'Galax GeForce RTX 5060 Ti 16GB',
    cpu: 'Intel Core i5-14600K',
    memory: '32GB DDR5 6000MHz RGB',
    storage: '2TB Gen4 NVMe',
    motherboard: 'MSI PRO B760M-A WiFi 6E',
    psu: '750W 80+ Bronze',
    cooler: 'Deepcool LE520 ARGB',
    image: '/images/builds/albus-pro-800.webp',
  },
  {
    slug: 'albus-supreme-rx',
    name: 'Albus Supreme RX',
    family: 'Albus',
    price: '₹2,35,000',
    intent: 'High-refresh gaming, no wasted spend',
    gpu: 'Sapphire Radeon RX 9070 XT 16GB',
    cpu: 'AMD Ryzen 7 9800X3D',
    memory: '32GB DDR5 6000MHz RGB',
    storage: '1TB Gen4 NVMe',
    motherboard: 'MSI B650M Gaming Plus WiFi',
    psu: '850W 80+ Gold',
    cooler: 'Deepcool LE360 V2 ARGB',
    image: '/images/builds/albus-supreme-rx-800.webp',
    imageLarge: '/images/builds/albus-supreme-rx-1600.webp',
  },
];

export const testimonials = [
  {
    quote:
      'This place is just awesome. I got whatever I was looking for at an affordable price. These people are highly experienced in recommending the best gaming PC.',
    name: 'Santosh Bidhar',
    context: 'Gaming PC customer',
  },
  {
    quote:
      'An excellent team with a solution-oriented approach. They listen to your problems patiently and assure a perfect tech solution. A perfect destination for new PC assembly.',
    name: 'The Fotowalla',
    context: 'Professional customer',
  },
];

export const benchNotes = [
  {
    tag: 'Buying better',
    title: 'Why a balanced PC usually beats a benchmark-chasing one',
    summary:
      'The smartest build puts money where your actual games and apps can use it—not where a spec sheet looks loudest.',
    readTime: '4 min read',
  },
  {
    tag: 'From the bench',
    title: 'What we check before a new PC leaves our workshop',
    summary:
      'Thermals, memory stability, cable strain, fan behavior and the small checks that protect the first year of ownership.',
    readTime: '5 min read',
  },
  {
    tag: 'Upgrade paths',
    title: 'Planning an AM5 build without overspending today',
    summary:
      'A practical way to choose the motherboard, power supply and memory you will not regret when it is time to upgrade.',
    readTime: '6 min read',
  },
];

export const whatsappNumber = '918093923639';

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
