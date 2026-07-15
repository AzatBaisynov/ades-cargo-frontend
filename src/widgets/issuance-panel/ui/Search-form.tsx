import { Search } from "lucide-react";

interface SearchFormProps {
  code: string;
  setCode: (value: string) => void;
  onSearch: (customer_code: string) => void;
  loading: boolean;
}

export const SearchForm = ({
  onSearch,
  loading,
  code,
  setCode,
}: SearchFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSearch(code.trim().toUpperCase());
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6 w-full max-w-xl">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-300" />
        <input
          type="search"
          placeholder="Введите код клиента"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={loading}
          className="w-full pl-12 pr-4 py-3 bg-(--bg-dark) border border-green-600 rounded-xl text-white placeholder:text-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !code.trim()}
        className="px-6 py-3 bg-(--bg-dark) from-green-500 to-emerald-500 text-white font-(--font-weight-regular) rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-500/25"
      >
        Найти
      </button>
    </form>
  );
};
