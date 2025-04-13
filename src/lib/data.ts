export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  featured: boolean;
  colors: string[];
  sizes?: string[]; // Optional property for products with sizes
  features: string[];
  images: string[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "The latest and greatest gadgets for your everyday needs",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Stylish apparel for every occasion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    description: "Everything you need to make your house a home",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068&auto=format&fit=crop"
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    description: "Premium beauty products for your self-care routine",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop"
  }
];

export const products: Product[] = [
  // Electronics
  {
    id: "smart-watch-pro",
    name: "SmartWatch Pro",
    category: "electronics",
    price: 299.99,
    discount: 249.99,
    description: "The ultimate smartwatch with health tracking, notifications, and a 3-day battery life.",
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "Water resistant up to 50m",
      "Customizable watch faces",
      "Compatible with iOS and Android"
    ],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop"
    ],
    colors: ["Black", "Silver", "Rose Gold"],
    rating: 4.7,
    reviews: 1245,
    stock: 89,
    featured: true,
  },
  {
    id: "wireless-earbuds",
    name: "Premium Wireless Earbuds",
    category: "electronics",
    price: 159.99,
    discount: 0, // Add discount if applicable
    description: "High-quality sound with noise cancellation and comfort that lasts all day.",
    features: [
      "Active noise cancellation",
      "8-hour battery life",
      "Wireless charging case",
      "Touch controls",
      "IPX4 water resistance"
    ],
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2033&auto=format&fit=crop"
    ],
    colors: ["White", "Black", "Blue"],
    rating: 4.5,
    reviews: 823,
    stock: 122,
    featured: true,

  },
  {
    id: "ultra-hd-monitor",
    name: "Ultra HD Curved Monitor",
    category: "electronics",
    price: 699.99,
    discount: 599.99,
    description: "Immersive viewing experience with this 32-inch curved 4K monitor. Perfect for work and gaming.",
    features: [
      "4K Ultra HD resolution",
      "32-inch curved display",
      "HDR support",
      "1ms response time",
      "Multiple connectivity options"
    ],
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2070&auto=format&fit=crop"
    ],
    colors: ["Black"],
    rating: 4.8,
    reviews: 412,
    stock: 35,
    featured: false
  },
  // Clothing
  {
    id: "premium-denim-jacket",
    name: "Premium Denim Jacket",
    category: "clothing",
    price: 89.99,
    description: "Classic denim jacket with a modern fit. Perfect for any casual outfit.",
    features: [
      "100% cotton denim",
      "Button closure",
      "Multiple pockets",
      "Machine washable",
      "Available in various sizes"
    ],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1972&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2080&auto=format&fit=crop"
    ],
    colors: ["Blue", "Black", "Light Wash"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 367,
    stock: 75,
    featured: true,
    discount: 0, // Add discount if applicable
  },
  {
    id: "casual-sneakers",
    name: "Casual Comfort Sneakers",
    category: "clothing",
    price: 79.99,
    discount: 69.99,
    description: "Lightweight and comfortable sneakers for everyday wear.",
    features: [
      "Memory foam insole",
      "Breathable mesh upper",
      "Rubber outsole for traction",
      "Lightweight design",
      "Available in multiple colors"
    ],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop"
    ],
    colors: ["White", "Black", "Grey", "Red"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.4,
    reviews: 592,
    stock: 120,
    featured: false,
  },
  // Home & Kitchen
  {
    id: "smart-blender",
    name: "Smart Blender Pro",
    category: "home",
    price: 149.99,
    description: "High-powered blender with smart programs for smoothies, soups, and more.",
    features: [
      "1200 watt motor",
      "6 pre-programmed settings",
      "Dishwasher safe components",
      "64 oz container",
      "Digital timer display"
    ],
    images: [
      "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?q=80&w=2064&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619371358021-4b8c01f7a280?q=80&w=2071&auto=format&fit=crop"
    ],
    colors: ["Silver", "Black", "Red"],
    rating: 4.7,
    reviews: 328,
    stock: 45,
    featured: true,
    discount: 0, // Add discount if applicable
  },
  {
    id: "cozy-throw-blanket",
    name: "Ultra Soft Throw Blanket",
    category: "home",
    price: 39.99,
    discount: 29.99,
    description: "Super soft and cozy throw blanket perfect for cuddling up on the couch.",
    features: [
      "Plush microfiber material",
      "50\" x 60\" size",
      "Machine washable",
      "Lightweight yet warm",
      "Available in multiple colors"
    ],
    images: [
      "https://images.unsplash.com/photo-1584346133934-052bc4e7d1df?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517789668064-acef0a3f3f46?q=80&w=2071&auto=format&fit=crop"
    ],
    colors: ["Grey", "Navy", "Beige", "Sage"],
    rating: 4.9,
    reviews: 521,
    stock: 87,
    featured: false
  },
  // Beauty
  {
    id: "luxury-skincare-set",
    name: "Luxury Skincare Set",
    category: "beauty",
    price: 129.99,
    description: "Complete skincare routine with cleanser, toner, serum, and moisturizer.",
    features: [
      "All-natural ingredients",
      "Suitable for all skin types",
      "Cruelty-free and vegan",
      "Travel-sized containers included",
      "Includes detailed usage guide"
    ],
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=2070&auto=format&fit=crop"
    ],
    colors: ["White", "Wood Grain", "Black"],
    rating: 4.8,
    reviews: 209,
    stock: 32,
    featured: true,
    discount: 0, // Add discount if applicable
  },
  {
    id: "aromatherapy-diffuser",
    name: "Essential Oil Diffuser",
    category: "beauty",
    price: 49.99,
    description: "Elegant aromatherapy diffuser with LED lighting and multiple mist settings.",
    features: [
      "300ml capacity",
      "Up to 10 hours of continuous use",
      "7 LED light options",
      "Auto shut-off safety feature",
      "Ultra-quiet operation"
    ],
    images: [
      "https://images.unsplash.com/photo-1599056407101-7c557a4a0144?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550332781-aecd27f7434f?q=80&w=2080&auto=format&fit=crop"
    ],
    colors: ["White", "Wood Grain", "Black"],
    rating: 4.6,
    reviews: 175,
    stock: 60,
    featured: false,
    discount: 0, // Add discount if applicable
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};
