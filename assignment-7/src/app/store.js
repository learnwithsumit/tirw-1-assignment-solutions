import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter/filterSlice';
import transactionReducer from '../features/transaction/transactionSlice';

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    filter: filterReducer,
  },
});
