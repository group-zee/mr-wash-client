import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shop } from '../components/ShopCard';
import { MOCK_SHOPS } from '../data/mockShops';

export interface CartItem {
  shopId: number;
  serviceId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

interface CustomerState {
  shops: Shop[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  shops: MOCK_SHOPS,
  cart: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setShops: (state, action: PayloadAction<Shop[]>) => {
      state.shops = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.cart.find(item => item.serviceId === action.payload.serviceId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ serviceId: string; quantity: number }>) => {
      const item = state.cart.find(item => item.serviceId === action.payload.serviceId);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(i => i.serviceId !== action.payload.serviceId);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.serviceId !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { 
  setShops, 
  setLoading, 
  setError, 
  addToCart, 
  updateQuantity, 
  removeFromCart, 
  clearCart 
} = customerSlice.actions;
export default customerSlice.reducer;
