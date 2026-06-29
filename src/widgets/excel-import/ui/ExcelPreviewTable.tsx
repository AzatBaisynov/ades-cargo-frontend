import { useAppSelector } from '@/app/store/hooks';
import { columnLabels } from '../../../features/import-excel/model/columnLabels';

export const ExcelPreviewTable = () => {
  const data = useAppSelector((state) => state.excel.data);

  return (
    <div className="flex w-full justify-center">
      <div className="min-h-[500px] w-full max-w-[900px]">
        {!data || data.length === 0 ? (
          <div className="flex min-h-[280px] items-center justify-center rounded-xl text-lg text-[var(--text-dark)]">
            Нет данных для отображения
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
  <h3 className="text-lg font-semibold text-gray-700">
    Предпросмотр
    <span className="ml-2 text-sm font-normal text-gray-400">
      ({data.length} записей)
    </span>
  </h3>
</div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
  <div className="custom-scrollbar max-h-[420px] overflow-auto">
    <table className="w-full table-fixed border-separate border-spacing-0">
      <thead>
  <tr>
    {Object.keys(data[0]).map((key) => (
      <th
        key={key}
       className="sticky top-0 z-10 bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        {columnLabels[key] ?? key}
      </th>
    ))}
  </tr>
</thead>

<tbody>
  {data.map((row, i) => (
    <tr
      key={i}
      className="transition-colors hover:bg-gray-50"
    >
      {Object.keys(row).map((key) => (
        <td
          key={key}
          className="px-4 py-3 text-sm text-gray-600"
        >
          {String(row[key] ?? '')}
        </td>
      ))}
    </tr>
  ))}
</tbody>
    </table>
  </div>

 <div className="bg-gray-50 px-4 py-3 text-center text-sm text-gray-500">
  Всего строк: {data.length}
</div>
</div>
          </>
        )}
      </div>
    </div>
  );
};