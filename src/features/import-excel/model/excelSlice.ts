import { createSlice } from '@reduxjs/toolkit';
import { uploadExcel } from './excelThunk';

interface ExcelState {
  loading: boolean;
  success: boolean;
  message: string;
  data: any[];
}

const initialState: ExcelState = {
  loading: false,
  success: false,
  message: '',
   data: [],
};

const excelSlice = createSlice({
  name: 'excel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadExcel.pending, (state) => {
  state.loading = true;
  state.success = false;
  state.message = '';
})

.addCase(uploadExcel.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;

  state.message = action.payload?.message ?? '';

  state.data = action.payload?.data ?? action.payload ?? [];
})

.addCase(uploadExcel.rejected, (state) => {
  state.loading = false;
  state.success = false;
  state.data = [];
})
  },
});

export default excelSlice.reducer;