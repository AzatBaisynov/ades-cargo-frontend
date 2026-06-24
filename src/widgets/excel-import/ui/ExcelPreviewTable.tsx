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
            <div className="mb-4">
              <h2>Предпросмотр содержимого</h2>
            </div>

            <div className="overflow-hidden rounded-[14px] border-2 border-gray-200 bg-[var(--bg-light)] shadow-md">
  <div className="custom-scrollbar max-h-[420px] overflow-auto">
    <table className="w-full table-fixed border-separate border-spacing-0">
      <thead>
  <tr>
    {Object.keys(data[0]).map((key) => (
      <th
        key={key}
        className="sticky top-0 z-10 border-b-2 border-gray-200 bg-[var(--bg-light)] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[var(--text-dark)]"
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
          className="border-b border-gray-100 px-4 py-3 text-[var(--text-dark)]"
        >
          {String(row[key] ?? '')}
        </td>
      ))}
    </tr>
  ))}
</tbody>
    </table>
  </div>

  <div className="flex justify-between border-t-2 border-gray-200 bg-[var(--bg-light)] px-4 py-2 text-xs text-[var(--text-dark)]">
    <span>
      Всего строк: <b>{data.length}</b>
    </span>
  </div>
</div>
          </>
        )}
      </div>
    </div>
  );
};