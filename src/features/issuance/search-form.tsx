import React, { useState } from "react"

interface SearchFormProps {
 onSearch:(customer_code:string)=> void
loading:boolean
}

export const SearchForm: React.FC<SearchFormProps> = ({onSearch,loading}) => {
    const [code,setCode] = useState('')

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(code.trim()){
    onSearch(code.trim().toUpperCase());
    }
}
return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6 w-full max-w-xl">
        <div className="relative flex-1">
            <input 
            type="text"
            placeholder="Введите код клиента"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2.5 text-(--text-light) placeholder-gray-400 bg-(--bg-dark) border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        />
        </div>
        <button
        type="submit"
        disabled={loading|| !code.trim()}
        className="px-6 py-2.5 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-sm">
           {loading? "Поиск...": "Найти"}
            </button>

    </form>
)
}
