import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const loadPersistedUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: loadPersistedUser(),
  token: localStorage.getItem(TOKEN_KEY),
  status: "idle",
  error: null,
};

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (payload.password.length < 8) {
      return rejectWithValue("Неверный email или пароль");
    }

    return {
      user: {
        id: "mock-1",
        name: payload.email.split("@")[0],
        email: payload.email,
      },
      token: "mock-token-" + Date.now(),
    };
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!payload.name.trim()) {
      return rejectWithValue("Не удалось зарегистрироваться");
    }

    return {
      user: {
        id: "mock-" + Date.now(),
        name: payload.name,
        email: payload.email,
      },
      token: "mock-token-" + Date.now(),
    };
  }
);

const persistAuth = (user: User, token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearPersistedAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      clearPersistedAuth();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        persistAuth(action.payload.user, action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Ошибка входа";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        persistAuth(action.payload.user, action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Ошибка регистрации";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;