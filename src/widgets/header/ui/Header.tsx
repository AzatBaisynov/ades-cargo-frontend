import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Upload,
  Search,
  QrCode,
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut,
  User,
  DollarSign,
  Users,
} from "lucide-react";
import logo from "@/assets/images/ades.jpg";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { logout } from "@/app/store/authSlice";
import type { RootState } from "@/app/store/store";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const navItems = [
    {
      path: "/",
      label: "Импорт",
      icon: Upload,
    },
    {
      path: "/products",
      label: "Приёмка",
      icon: QrCode,
    },
    {
      path: "/cargo-price",
      label: "Цена",
      icon: DollarSign,
    },
    {
      path: "/issuance",
      label: "Выдача",
      icon: Search,
    },
    {
      label: "Профиль",
      path: "/profile",
      icon: User,
      
    },
    
    {path: "/employees",
      label: "Сотрудники",
      icon: Users
    },
    {
      path: "/auth",
      label: token ? "Выход" : "Вход",
      icon: token ? LogOut : LogIn,
    },

    
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen border-r border-gray-200 bg-white shadow-sm transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        }`}
    >
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">
            <img
              src={logo}
              alt="Ades Logo"
              className="h-full w-full object-contain"
            />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">Ades</h1>

              <p className="text-xs text-gray-400">Cargo Management</p>
            </div>
          )}
        </div>
      </div>

      <nav className="space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = location.pathname === item.path;
          const isAuthItem = item.path === "/auth";

          if (isAuthItem && token) {
            return (
              <button
                key={item.path}
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
              ${isActive
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 w-full border-t border-gray-100 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm">Свернуть</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Header;
