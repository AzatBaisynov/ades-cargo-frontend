import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { loginUser, clearAuthError } from "@/app/store/authSlice";
import type { RootState } from "@/app/store/store";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state: RootState) => state.auth);

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = status === "loading";

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!userName.trim()) {
      errors.userName = "Введите имя пользователя";
    }
    if (!userPassword) {
      errors.userPassword = "Введите пароль";
    } else if (userPassword.length < 8) {
      errors.userPassword = "Минимум 8 символов";
    }

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearAuthError());
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const result = await dispatch(
      loginUser({ user_name: userName, user_password: userPassword })
    );

    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-100";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-bold text-gray-900">С возвращением</h1>
        <p className="mb-6 text-sm text-gray-500">Введите данные для входа</p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="userName"
              className="text-xs font-medium text-gray-600"
            >
              Имя пользователя
            </label>
            <input
              id="userName"
              type="text"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-100"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {fieldErrors.userName && (
              <span className="text-xs text-red-500">
                {fieldErrors.userName}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="userPassword"
              className="text-xs font-medium text-gray-600"
            >
              Пароль
            </label>
            <div className="relative">
              <input
                id="userPassword"
                type={showPassword ? "text" : "password"}
                className={inputClass}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldErrors.userPassword && (
              <span className="text-xs text-red-500">{fieldErrors.userPassword}</span>
            )}
          </div>

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
            {isLoading ? "Подождите…" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
