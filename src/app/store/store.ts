import { configureStore } from "@reduxjs/toolkit";
import excelReducer from "@/features/import-excel/model/excelSlice";
import authReducer from "@/app/store/authSlice";

export const store = configureStore({
  reducer: {
    excel: excelReducer,
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
