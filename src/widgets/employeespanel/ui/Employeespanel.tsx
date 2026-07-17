import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  clearEmployeesError,
} from "@/app/store/employeesSlice";
import type { RootState } from "@/app/store/store";
import type { Employee } from "@/app/store/employeesSlice";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmployeesPanel = () => {
  const dispatch = useAppDispatch();
  const { list: employees, status, error } = useAppSelector(
    (state: RootState) => state.employees
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fullname, setFullname] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isEditing = editingId !== null;

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const resetForm = () => {
    setFullname("");
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setFieldErrors({});
    setShowPassword(false);
    setEditingId(null);
  };

  const openCreateForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (emp: Employee) => {
    setEditingId(emp.user_id);
    setFullname(emp.fullname);
    setUserName(emp.user_name);
    setUserEmail(emp.user_email);
    setUserPassword("");
    setFieldErrors({});
    setIsFormOpen(true);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!fullname.trim()) errors.fullname = "Введите фамилию и имя";
    if (!userName.trim()) errors.userName = "Введите имя пользователя";
    if (!userEmail.trim()) {
      errors.userEmail = "Введите email";
    } else if (!EMAIL_RE.test(userEmail)) {
      errors.userEmail = "Некорректный email";
    }
    if (!isEditing) {
      if (!userPassword) {
        errors.userPassword = "Введите пароль";
      } else if (userPassword.length < 8) {
        errors.userPassword = "Минимум 8 символов";
      }
    }
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (isEditing && editingId) {
      const result = await dispatch(
        updateEmployee({
          id: editingId,
          fullname,
          user_name: userName,
          user_email: userEmail,
        })
      );
      if (updateEmployee.fulfilled.match(result)) {
        resetForm();
        setIsFormOpen(false);
      }
    } else {
      const result = await dispatch(
        createEmployee({
          fullname,
          user_name: userName,
          user_password: userPassword,
          user_email: userEmail,
        })
      );
      if (createEmployee.fulfilled.match(result)) {
        resetForm();
        setIsFormOpen(false);
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить этого сотрудника?")) {
      dispatch(deleteEmployee(id));
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-100";

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Сотрудники</h1>
          <p className="mt-1 text-sm text-gray-500">
            Управляйте учётными записями сотрудников
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
        >
          <Plus className="h-4 w-4" />
          Добавить сотрудника
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              {isEditing ? "Редактировать сотрудника" : "Новый сотрудник"}
            </h2>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setIsFormOpen(false);
              }}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullname" className="text-xs font-medium text-gray-600">
                Фамилия и имя
              </label>
              <input
                id="fullname"
                type="text"
                className={inputClass}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              {fieldErrors.fullname && (
                <span className="text-xs text-red-500">{fieldErrors.fullname}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="userName" className="text-xs font-medium text-gray-600">
                Имя пользователя
              </label>
              <input
                id="userName"
                type="text"
                className={inputClass}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {fieldErrors.userName && (
                <span className="text-xs text-red-500">{fieldErrors.userName}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="userEmail" className="text-xs font-medium text-gray-600">
                Email
              </label>
              <input
                id="userEmail"
                type="email"
                className={inputClass}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              {fieldErrors.userEmail && (
                <span className="text-xs text-red-500">{fieldErrors.userEmail}</span>
              )}
            </div>

            {!isEditing && (
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
                    className={`${inputClass} pr-10`}
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
                  <span className="text-xs text-red-500">
                    {fieldErrors.userPassword}
                  </span>
                )}
              </div>
            )}

            {error && (
              <div className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            <div className="sm:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setIsFormOpen(false);
                }}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
              >
                {isEditing ? "Сохранить" : "Создать"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Фамилия и имя</th>
              <th className="px-6 py-3 font-medium">Имя пользователя</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp) => (
              <tr key={emp.user_id} className="hover:bg-gray-50">
                <td className="px-6 py-3.5 font-medium text-gray-900">
                  {emp.fullname}
                </td>
                <td className="px-6 py-3.5 text-gray-600">{emp.user_name}</td>
                <td className="px-6 py-3.5 text-gray-600">{emp.user_email}</td>
                <td className="px-6 py-3.5">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEditForm(emp)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-green-600"
                      aria-label="Редактировать"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(emp.user_id)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                      aria-label="Удалить"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {status === "loading" && (
          <div className="p-10 text-center text-sm text-gray-400">
            Загрузка…
          </div>
        )}

        {status !== "loading" && employees.length === 0 && (
          <div className="p-10 text-center text-sm text-gray-400">
            Нет данных для отображения
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesPanel;