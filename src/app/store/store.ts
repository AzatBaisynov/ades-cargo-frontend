import { configureStore } from '@reduxjs/toolkit';
import excelReducer from '@/features/import-excel/model/excelSlice';
import authReducer from '@/app/store/authSlice';
import employeesReducer from './employeesSlice';

export const store = configureStore({
  reducer: {
    excel: excelReducer,
    auth: authReducer,
    employees: employeesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
