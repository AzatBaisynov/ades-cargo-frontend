import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000";

export interface User {
  id: string;
  fullname: string;
  user_name: string;
  user_email: string;
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
  user_name: string;
  user_password: string;
}

interface RegisterPayload {
  fullname: string;
  user_name: string;
  user_password: string;
  user_email: string;
}

const extractErrorMessage = async (res: Response, fallback: string) => {
  try {
    const data = await res.json();
    return data?.message ?? fallback;
  } catch {
    return fallback;
  }
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, { rejectWithValue }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const message = await extractErrorMessage(res, "Не удалось войти");

      return rejectWithValue(message);
    }

    const data = await res.json();

    return {
      user: data.user as User,
      token: data.access_token as string,
    };
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    const registerRes = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!registerRes.ok) {
      const message = await extractErrorMessage(
        registerRes,
        "Не удалось зарегистрироваться"
      );
      return rejectWithValue(message);
    }

    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: payload.user_name,
        user_password: payload.user_password,
      }),
    });

    if (!loginRes.ok) {
      const message = await extractErrorMessage(
        loginRes,
        "Регистрация прошла, но не удалось войти"
      );
      return rejectWithValue(message);
    }

    const loginData = await loginRes.json();

    const user: User = {
      id: "",
      fullname: payload.fullname,
      user_name: payload.user_name,
      user_email: payload.user_email,
    };

    return {
      user: loginData.user as User,
      token: loginData.access_token as string,
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
