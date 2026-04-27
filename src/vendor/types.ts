export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
}

export interface LaundryService {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: 'piece' | 'kg';
  category: 'Wash' | 'Iron' | 'Dry Clean' | 'Wash & Iron';
  estimatedTime: string;
  addons: ServiceAddon[];
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  serviceName: string;
  status: 'Pending' | 'In Progress' | 'Ready' | 'Delivered' | 'Cancelled';
  date: string;
  totalAmount: number;
  items: number;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
  currentLiveLocation?: string;
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
  paymentMethod: 'Cash' | 'Online' | 'Wallet';
}

export interface VendorProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  businessName: string;
  openingTime: string;
  closingTime: string;
  description: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}
