import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const API_URL = "http://localhost:3000";

export interface Employee {
  user_id: string;
  fullname: string;
  user_name: string;
  user_email: string;
  role: string;
}

interface EmployeesState {
  list: Employee[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EmployeesState = {
  list: [],
  status: "idle",
  error: null,
};

interface CreateEmployeePayload {
  fullname: string;
  user_name: string;
  user_password: string;
  user_email: string;
}

interface UpdateEmployeePayload {
  id: string;
  fullname?: string;
  user_name?: string;
  user_email?: string;
}

const extractErrorMessage = async (res: Response, fallback: string) => {
  if (res.status === 403) {
    return "Доступ запрещён. Это действие может выполнять только администратор.";
  }

  try {
    const data = await res.json();
    return data?.message ?? fallback;
  } catch {
    return fallback;
  }
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_: void, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).auth.token;

    const res = await fetch(`${API_URL}/user/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const message = await extractErrorMessage(
        res,
        "Не удалось загрузить список сотрудников"
      );
      return rejectWithValue(message);
    }

    return (await res.json()) as Employee[];
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (payload: CreateEmployeePayload, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).auth.token;

    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const message = await extractErrorMessage(
        res,
        "Не удалось создать сотрудника"
      );
      return rejectWithValue(message);
    }

    return (await res.json()) as Employee;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (payload: UpdateEmployeePayload, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).auth.token;
    const { id, ...body } = payload;

    const res = await fetch(`${API_URL}/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const message = await extractErrorMessage(
        res,
        "Не удалось обновить данные сотрудника"
      );
      return rejectWithValue(message);
    }

    return (await res.json()) as Employee;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: string, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).auth.token;

    const res = await fetch(`${API_URL}/user/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const message = await extractErrorMessage(
        res,
        "Не удалось удалить сотрудника"
      );
      return rejectWithValue(message);
    }

    return id;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearEmployeesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Ошибка загрузки";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Ошибка создания";
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const idx = state.list.findIndex(
          (e) => e.user_id === action.payload.user_id
        );
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Ошибка обновления";
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((e) => e.user_id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Ошибка удаления";
      });
  },
});

export const { clearEmployeesError } = employeesSlice.actions;
export default employeesSlice.reducer;