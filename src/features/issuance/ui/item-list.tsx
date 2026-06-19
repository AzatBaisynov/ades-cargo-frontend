interface Product{
    id:string 
    customer_code:string 
    product_code : string 
    status : string 
    createdAt: string
}

interface ItemListProps{products:Product[]}
export const ItemList  = ({products}:ItemListProps) => {
    if (products.length === 0){
        return(
            <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 text-(--text-dark)">
                Товары не найдены. Введите код клиента для поиска.
            </div>
        )
    }
        return (
        <div className="w-full overflow-hidden bg-(--bg-dark) rounded-xl border border-gray-200 shadow-sm mb-6">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-(--text-light) uppercase tracking-wider">
                    <th className="px-6 py-4 w-16">№</th>
                    <th className="px-6 py-4">Трек-код товара</th>
                    <th className="px-6 py-4">Статус</th>
                    <th className="px-6 py-4">Вес</th>
                    <th className="px-6 py-4">Цена</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-(--text-ligth)">
                {products.map((product,index) => (
                    <tr key={product.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-6 py-4 font-medium text-(--text-ligth)">{index+1}</td>
                        <td className="px-6 py-4 font-semibold text-(--text-dark)">{product.product_code}</td>
                        <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                <span className="w-1.5 h-1.5 mr-1.5 bg-green-500 rounded-full"></span>
                                {product.status}
                            </span>
                        </td>
                        {/* TODO:
                        <td className="px-6 py-4 text-gray-500">{product.weight}</td>
                        <td className="px-6 py-4 text-gray-500">{product.price}</td> */}
                    </tr>
                ))

                }
            </tbody>
        </table>
    </div>
        )
    }