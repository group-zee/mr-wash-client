import { Shop } from '../components/ShopCard';

export const MOCK_SHOPS: Shop[] = [
  {
    id: 1,
    name: "Crystal Clean Hub",
    location: "MG Road, Central Metro",
    rating: 4.8,
    reviews: 428,
    openTime: "08:00 AM",
    closeTime: "09:00 PM",
    image: "/laundry-1.png",
    specialty: "Express 2h Delivery",
    priceRange: "₹₹",
    status: "Open",
    services: [
      { id: '1-1', name: 'Wash & Fold', price: 49, unit: 'kg', description: 'Standard machine wash with premium detergent.' },
      { id: '1-2', name: 'Wash & Iron', price: 69, unit: 'kg', description: 'Washed, dried and perfectly steam ironed.' },
      { id: '1-3', name: 'Premium Dry Clean', price: 149, unit: 'piece', description: 'Careful dry cleaning for delicate garments.' },
    ]
  },
  {
    id: 2,
    name: "Royal Wash & Dry",
    location: "Whitefield, Tech Corridor",
    rating: 4.9,
    reviews: 892,
    openTime: "07:00 AM",
    closeTime: "10:00 PM",
    image: "/laundry-2.png",
    specialty: "Eco-Friendly Wash",
    priceRange: "₹₹₹",
    status: "Open",
    services: [
      { id: '2-1', name: 'Eco Wash', price: 59, unit: 'kg', description: 'Using 100% biodegradable detergents.' },
      { id: '2-2', name: 'Deep Clean', price: 89, unit: 'kg', description: 'Intensive cleaning for tough stains.' },
      { id: '2-3', name: 'Saree Polishing', price: 199, unit: 'piece', description: 'Specialized care for silk and designer sarees.' },
    ]
  },
  {
    id: 3,
    name: "The Laundry Room",
    location: "Indiranagar, 12th Main",
    rating: 4.5,
    reviews: 1210,
    openTime: "09:00 AM",
    closeTime: "08:00 PM",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eeba01?q=80&w=1000&auto=format&fit=crop",
    specialty: "Deep Steam Cleaning",
    priceRange: "₹",
    status: "Closing Soon",
    services: [
      { id: '3-1', name: 'Basic Wash', price: 39, unit: 'kg', description: 'Standard wash for everyday clothes.' },
      { id: '3-2', name: 'Curtain Cleaning', price: 120, unit: 'pair', description: 'Professional steam cleaning for home curtains.' },
    ]
  }
];
