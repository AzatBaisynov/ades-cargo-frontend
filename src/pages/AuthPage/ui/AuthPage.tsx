import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { loginUser, registerUser, clearAuthError } from "@/app/store/authSlice";
import type { RootState } from "@/app/store/store";

type Mode = "login" | "register";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state: RootState) => state.auth);

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isRegister = mode === "register";
  const isLoading = status === "loading";

  const switchMode = (next: Mode) => {
    setMode(next);
    setFieldErrors({});
    dispatch(clearAuthError());
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (isRegister && !name.trim()) {
      errors.name = "Введите имя";
    }
    if (!email.trim()) {
      errors.email = "Введите email";
    } else if (!EMAIL_RE.test(email)) {
      errors.email = "Некорректный email";
    }
    if (!password) {
      errors.password = "Введите пароль";
    } else if (password.length < 8) {
      errors.password = "Минимум 8 символов";
    }
    if (isRegister && password !== confirmPassword) {
      errors.confirmPassword = "Пароли не совпадают";
    }

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const action = isRegister
      ? registerUser({ name, email, password })
      : loginUser({ email, password });

    const result = await dispatch(action);
    if (loginUser.fulfilled.match(result) || registerUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-100";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              !isRegister
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => switchMode("login")}
          >
            Вход
          </button>
          <button
            type="button"
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              isRegister
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => switchMode("register")}
          >
            Регистрация
          </button>
        </div>

        <h1 className="mb-1 text-xl font-bold text-gray-900">
          {isRegister ? "Создать аккаунт" : "С возвращением"}
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          {isRegister
            ? "Заполните поля, чтобы начать"
            : "Введите данные для входа"}
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {isRegister && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium text-gray-600">
                Имя
              </label>
              <input
                id="name"
                type="text"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {fieldErrors.name && (
                <span className="text-xs text-red-500">{fieldErrors.name}</span>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {fieldErrors.email && (
              <span className="text-xs text-red-500">{fieldErrors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-medium text-gray-600">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {fieldErrors.password && (
              <span className="text-xs text-red-500">{fieldErrors.password}</span>
            )}
          </div>

          {isRegister && (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-medium text-gray-600"
              >
                Повторите пароль
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={inputClass}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {fieldErrors.confirmPassword && (
                <span className="text-xs text-red-500">
                  {fieldErrors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 rounded-lg bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? "Подождите…"
              : isRegister
              ? "Зарегистрироваться"
              : "Войти"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
          <button
            type="button"
            className="font-medium text-green-600 hover:underline"
            onClick={() => switchMode(isRegister ? "login" : "register")}
          >
            {isRegister ? "Войти" : "Создать"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;