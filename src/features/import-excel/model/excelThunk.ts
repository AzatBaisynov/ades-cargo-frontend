import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadExcelRequest } from "../api/uploadExcel";
import axios from "axios";

export const uploadExcel = createAsyncThunk(
  "excel/upload",
  async (file: File, thunkAPI) => {
    try {
      return await uploadExcelRequest(file);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Ошибка загрузки файла"
        );
      }

      return thunkAPI.rejectWithValue("Неизвестная ошибка");
    }
  }
);
