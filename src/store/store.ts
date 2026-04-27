import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../customer/store/customerSlice";

export const store = configureStore({
    reducer: {
      customer: customerReducer,
      // Add other module reducers here as the project grows
      // provider: providerReducer,
      // admin: adminReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
