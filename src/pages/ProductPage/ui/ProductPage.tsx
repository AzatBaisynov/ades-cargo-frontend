import { useRef, useState } from "react";

interface TableRow {
  customerCode: string;
  productCode: string;
  weight: string;
}

const ProductsPage = () => {
  const [customerCode, setCustomerCode] = useState("");
  const [productCode, setProductCode] = useState("");
  const [weight, setWeight] = useState("");
  const [rows, setRows] = useState<TableRow[]>([]);

  const customerRef = useRef<HTMLInputElement>(null);
  const productRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);

  const addRow = () => {
    if (!customerCode || !productCode || !weight) return;

    setRows((prev) => [
      ...prev,
      {
        customerCode,
        productCode,
        weight,
      },
    ]);

    setCustomerCode("");
    setProductCode("");
    setWeight("");

    customerRef.current?.focus();
  };

  const handleSave = () => {
    console.log(rows);
    // Здесь позже можно отправить данные на API
    alert("Данные сохранены");
  };

  return (
    <div className="p-6 font-[var(--font-main)]">
      <h1 className="mb-6 text-center text-[2rem] font-[var(--font-weight-bold)] tracking-wide text-[var(--text-dark)]">
        Приём товаров на склад
      </h1>

      <div className="mx-auto mb-6 flex max-w-4xl gap-3">
        <input
          ref={customerRef}
          type="text"
          placeholder="Код клиента"
          value={customerCode}
          onChange={(e) => setCustomerCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              productRef.current?.focus();
            }
          }}
          className="flex-1 rounded-lg border border-[var(--text-light)] px-4 py-2"
        />

        <input
          ref={productRef}
          type="text"
          placeholder="Код товара"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              weightRef.current?.focus();
            }
          }}
          className="flex-1 rounded-lg border border-[var(--text-light)] px-4 py-2"
        />

    <input
  ref={weightRef}
  type="text"
  inputMode="decimal"
  placeholder="Вес, кг"
  value={weight}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9.,]/g, "");
    setWeight(value);
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      addRow();
    }
  }}
  className="flex-1 rounded-lg border border-[var(--text-light)] px-4 py-2"
/>

        <button
          onClick={addRow}
          className="rounded-lg bg-[var(--bg-dark)] px-5 py-2 text-white"
        >
          Добавить
        </button>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-[var(--text-light)]">
          <table className="w-full border-collapse text-center">
            <thead className="bg-[var(--bg-light)]">
              <tr>
                <th className="border border-[var(--text-light)] p-3">
                  №
                </th>
                <th className="border border-[var(--text-light)] p-3">
                  Код клиента
                </th>
                <th className="border border-[var(--text-light)] p-3">
                  Код товара
                </th>
                <th className="border border-[var(--text-light)] p-3">
                  Вес, кг
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="border border-[var(--text-light)] p-3">
                    {index + 1}
                  </td>

                  <td className="border border-[var(--text-light)] p-3">
                    {row.customerCode}
                  </td>

                  <td className="border border-[var(--text-light)] p-3">
                    {row.productCode}
                  </td>

                  <td className="border border-[var(--text-light)] p-3">
                    {row.weight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!rows.length}
            className="rounded-lg bg-[var(--bg-dark)] px-5 py-2 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;