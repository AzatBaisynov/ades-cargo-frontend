import React from 'react';
import './ExcelPreviewTable.css';
import { useAppSelector } from '@/app/store/hooks';
import { columnLabels} from '../model/columnLabels';

export const ExcelPreviewTable = () => {
  const data = useAppSelector((state) => state.excel.data);
  


  return (
    <div className="table-wrapper">
      <div className="table-container">

        {!data || data.length === 0 ? (
          <div className="empty-state">
            Нет данных для отображения
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2>Предпросмотр содержимого</h2>
            </div>

            <div className="table-card">
              <div className="table-scroll">
                <table className="table-base">
                  <thead>
  <tr>
    {Object.keys(data[0]).map((key) => (
      <th key={key} className="table-th">
        {columnLabels[key] ?? key}
      </th>
    ))}
  </tr>
</thead>

                  <tbody>
                    {data.map((row, i) => (
                      <tr key={i} className="table-row">
                        {Object.keys(row).map((key) => (
                          <td key={key} className="table-td">
                            {String(row[key] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                Всего строк: <b>{data.length}</b>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};