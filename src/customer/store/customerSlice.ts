import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shop } from '../components/ShopCard';

interface CustomerState {
  shops: Shop[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  shops: [],
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
  },
});

export const { setShops, setLoading, setError } = customerSlice.actions;
export default customerSlice.reducer;
