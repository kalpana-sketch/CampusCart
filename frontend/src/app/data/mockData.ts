export interface Item {
  _id?: string;
  id: string; // Keep this as primary for a moment
  title: string;
  description: string;
  price: number;
  category: string;
  condition?: string;
  sellerId?: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  seller: {
    name: string;
    year: string;
    major: string;
    avatar: string;
  }; 
  images: string[];
  createdAt: string;
  isDonation?: boolean;
}



export const categories = [
  'All',
  'Textbooks',
  'Electronics',
  'Furniture',
  'Lab Equipment',
  'Calculators',
  'Clothing',
  'Dorm Essentials',
  'Sports',
];

export const mockItems: Item[] = [
  {
    id: '1',
    title: 'Calculus Early Transcendentals (9th Edition)',
    description: 'Barely used calculus textbook. Great condition with minimal highlighting. Perfect for Math 101 and 102.',
    price: 45,
    category: 'Textbooks',
    condition: 'Like New',
    seller: {
      name: 'Sarah Chen',
      year: 'Senior',
      major: 'Mathematics',
      avatar: 'SC',
    },
    images: ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80'],
    createdAt: '2026-02-25',
    isDonation: false,
  },
  {
    id: '2',
    title: 'TI-84 Plus CE Graphing Calculator',
    description: 'Barely used graphing calculator. Comes with charging cable and protective case. Required for most STEM courses.',
    price: 75,
    category: 'Calculators',
    condition: 'Like New',
    seller: {
      name: 'Michael Rodriguez',
      year: 'Junior',
      major: 'Engineering',
      avatar: 'MR',
    },
    images: ['https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&q=80'],
    createdAt: '2026-02-26',
    isDonation: false,
  },
  {
    id: '3',
    title: 'MacBook Pro 13" (2020) - M1',
    description: '8GB RAM, 256GB SSD. Perfect for students. Battery health at 92%. Includes original charger and box.',
    price: 650,
    category: 'Electronics',
    condition: 'Good',
    seller: {
      name: 'Emily Watson',
      year: 'Senior',
      major: 'Computer Science',
      avatar: 'EW',
    },
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80'],
    createdAt: '2026-02-24',
    isDonation: false,
  },
  {
    id: '4',
    title: 'Mini Fridge - Perfect for Dorm',
    description: 'Compact refrigerator, 1.7 cubic feet. Works perfectly, just graduated and don\'t need it anymore.',
    price: 40,
    category: 'Furniture',
    condition: 'Good',
    seller: {
      name: 'James Park',
      year: 'Senior',
      major: 'Business',
      avatar: 'JP',
    },
    images: ['https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80'],
    createdAt: '2026-02-27',
    isDonation: false,
  },
  {
    id: '5',
    title: 'Chemistry Lab Goggles & Coat',
    description: 'Safety goggles and lab coat, size M. Required for Chem 101-201. Clean and sanitized.',
    price: 0,
    category: 'Lab Equipment',
    condition: 'Good',
    seller: {
      name: 'Rachel Kumar',
      year: 'Junior',
      major: 'Chemistry',
      avatar: 'RK',
    },
    images: ['https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80'],
    createdAt: '2026-02-28',
    isDonation: true,
  },
  {
    id: '6',
    title: 'Organic Chemistry As a Second Language',
    description: 'Both volumes included. These books saved my grade! Minimal wear.',
    price: 30,
    category: 'Textbooks',
    condition: 'Good',
    seller: {
      name: 'Alex Thompson',
      year: 'Senior',
      major: 'Pre-Med',
      avatar: 'AT',
    },
    images: ['https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80'],
    createdAt: '2026-02-23',
    isDonation: false,
  },
  {
    id: '7',
    title: 'Desk Lamp with USB Charging Port',
    description: 'LED desk lamp with adjustable brightness. Built-in USB port for charging devices. Great for late-night study sessions.',
    price: 15,
    category: 'Dorm Essentials',
    condition: 'Like New',
    seller: {
      name: 'Olivia Martinez',
      year: 'Sophomore',
      major: 'Architecture',
      avatar: 'OM',
    },
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
    createdAt: '2026-02-26',
    isDonation: false,
  },
  {
    id: '8',
    title: 'Yoga Mat & Blocks',
    description: 'Lightly used yoga mat (6mm thick) with two cork blocks. Perfect for campus yoga classes or dorm workouts.',
    price: 20,
    category: 'Sports',
    condition: 'Like New',
    seller: {
      name: 'Sophia Lee',
      year: 'Junior',
      major: 'Kinesiology',
      avatar: 'SL',
    },
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'],
    createdAt: '2026-02-25',
    isDonation: false,
  },
  {
    id: '9',
    title: 'iPad Air (4th Gen) with Apple Pencil',
    description: '64GB, Space Gray. Includes Apple Pencil (1st gen) and folio case. Perfect for note-taking in lectures.',
    price: 400,
    category: 'Electronics',
    condition: 'Like New',
    seller: {
      name: 'David Kim',
      year: 'Senior',
      major: 'Design',
      avatar: 'DK',
    },
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80'],
    createdAt: '2026-02-22',
    isDonation: false,
  },
  {
    id: '10',
    title: 'Futon Sofa Bed - Navy Blue',
    description: 'Comfortable futon that converts to a bed. Great condition, just moving to off-campus apartment with furniture.',
    price: 80,
    category: 'Furniture',
    condition: 'Good',
    seller: {
      name: 'Chris Anderson',
      year: 'Senior',
      major: 'English',
      avatar: 'CA',
    },
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
    createdAt: '2026-02-21',
    isDonation: false,
  },
  {
    id: '11',
    title: 'Introduction to Algorithms (CLRS)',
    description: 'The classic CS textbook. Some highlighting but all pages intact. Essential for advanced algorithms courses.',
    price: 55,
    category: 'Textbooks',
    condition: 'Good',
    seller: {
      name: 'Nina Patel',
      year: 'Senior',
      major: 'Computer Science',
      avatar: 'NP',
    },
    images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80'],
    createdAt: '2026-02-20',
    isDonation: false,
  },
  {
    id: '12',
    title: 'Campus Hoodie & T-Shirt Bundle',
    description: 'Official campus apparel, size L. Hoodie and 2 t-shirts. Free to a fellow student!',
    price: 0,
    category: 'Clothing',
    condition: 'Good',
    seller: {
      name: 'Marcus Johnson',
      year: 'Senior',
      major: 'Biology',
      avatar: 'MJ',
    },
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'],
    createdAt: '2026-02-19',
    isDonation: true,
  },
];
