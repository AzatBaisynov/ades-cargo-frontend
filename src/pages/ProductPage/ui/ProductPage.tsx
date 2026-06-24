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

  return (
    <div className="p-6 font-[var(--font-main)]">
     <h1 className="mb-6 text-center text-[2rem] font-[var(--font-weight-bold)] tracking-wide text-[var(--text-dark)]">
  Приём товаров на склад
</h1>

      <div className="mx-auto mb-6 flex max-w-4xl flex-wrap justify-center gap-3">
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
          className="rounded-lg border border-[var(--text-light)] px-4 py-2 text-[var(--fs-base)] outline-none focus:border-[var(--bg-dark)]"
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
          className="rounded-lg border border-[var(--text-light)] px-4 py-2 text-[var(--fs-base)] outline-none focus:border-[var(--bg-dark)]"
        />

        <input
          ref={weightRef}
          type="number"
          placeholder="Вес, кг"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addRow();
            }
          }}
          className="rounded-lg border border-[var(--text-light)] px-4 py-2 text-[var(--fs-base)] outline-none focus:border-[var(--bg-dark)]"
        />

        <button
          onClick={addRow}
          className="rounded-lg bg-[var(--bg-dark)] px-5 py-2 text-white transition-opacity hover:opacity-90"
        >
          Добавить
        </button>
      </div>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-[var(--text-light)]">
  <table className="w-full border-collapse text-center">
   <thead className="bg-[var(--bg-light)]">
  <tr>
    <th className="border border-[var(--text-light)] p-3 text-center">
      №
    </th>
    <th className="border border-[var(--text-light)] p-3 text-center">
      Код клиента
    </th>
    <th className="border border-[var(--text-light)] p-3 text-center">
      Код товара
    </th>
    <th className="border border-[var(--text-light)] p-3 text-center">
      Вес, кг
    </th>
  </tr>
</thead>

  <tbody>
  {rows.map((row, index) => (
    <tr key={index}>
      <td className="border border-[var(--text-light)] p-3 text-center">
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
    </div>
  );
};

export default ProductsPage;