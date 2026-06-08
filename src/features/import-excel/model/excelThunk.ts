import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadExcelRequest } from '../api/uploadExcel';

export const uploadExcel = createAsyncThunk(
  'excel/upload',
  async (file: File, thunkAPI) => {
    try {
      const data = await uploadExcelRequest(file);

      console.log('BACKEND RESPONSE:', data);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);