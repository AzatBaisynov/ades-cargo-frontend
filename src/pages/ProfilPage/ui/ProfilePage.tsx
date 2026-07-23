import { User, LogOut, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { logout } from "@/app/store/authSlice";
import type { RootState } from "@/app/store/store";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, token } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Профиль</h2>

        <p className="mt-1 text-gray-500">Информация о пользователе</p>
      </div>

      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {token && user ? (
          <>
            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-green-400 to-emerald-500 shadow-md shadow-green-500/20">
                <User size={40} className="text-white" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {user.fullname || "Пользователь"}
                </h3>

                <p className="mt-1 text-gray-500">@{user.user_name}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-gray-500">Полное имя</span>

                <span className="font-medium text-gray-800">
                  {user.fullname || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-gray-500">Логин</span>

                <span className="font-medium text-gray-800">
                  {user.user_name}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-gray-500">Email</span>

                <span className="font-medium text-gray-800">
                  {user.user_email || "-"}
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-linear-to-r from-red-500 to-rose-500 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-red-600 hover:to-rose-600"
              >
                <LogOut size={16} />
                Выйти
              </button>
            </div>
          </>
        ) : (
          <div className="py-10 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
              <User size={40} className="text-gray-400" />
            </div>

            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Пользователь не авторизован
            </h3>

            <p className="mb-6 text-gray-500">
              Войдите в систему для просмотра профиля
            </p>

            <button
              onClick={handleLogin}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-500 to-emerald-500 py-3 font-medium text-white shadow-md transition-all hover:from-green-600 hover:to-emerald-600"
            >
              <LogIn size={18} />
              Войти
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
