import { configureStore } from '@reduxjs/toolkit';
// Import your reducers (example reducer here)
import exampleReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    auth: exampleReducer, // Add your reducers here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
