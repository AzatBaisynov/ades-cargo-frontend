import React from 'react';
import './ExcelPreviewTable.css';

const mockData = [
  { clientCode: 'CL001', productCode: 'PR001' },
  { clientCode: 'CL002', productCode: 'PR002' },
  { clientCode: 'CL003', productCode: 'PR003' },
  { clientCode: 'CL004', productCode: 'PR004' },
  { clientCode: 'CL005', productCode: 'PR005' },
  { clientCode: 'CL006', productCode: 'PR006' },
  { clientCode: 'CL003', productCode: 'PR003' },
  { clientCode: 'CL004', productCode: 'PR004' },
  { clientCode: 'CL005', productCode: 'PR005' },
  { clientCode: 'CL006', productCode: 'PR006' },
  { clientCode: 'CL003', productCode: 'PR003' },
  { clientCode: 'CL004', productCode: 'PR004' },
  { clientCode: 'CL005', productCode: 'PR005' },
  { clientCode: 'CL006', productCode: 'PR006' },
  { clientCode: 'CL003', productCode: 'PR003' },
  { clientCode: 'CL004', productCode: 'PR004' },
  { clientCode: 'CL005', productCode: 'PR005' },
  { clientCode: 'CL006', productCode: 'PR006' },

];


export const ExcelPreviewTable = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-4">
          <h2
            style={{ fontSize: "var(--fs-lg)", color: "var(--text-dark)" }}
          >
            Предпросмотр содержимого
          </h2>
        </div>
        <div className="table-card">
          <div className="table-scroll">
            <table className="table-base">
              <thead className="table-head">
                <tr>
                  <th className="table-th">Код клиента</th>
                  <th className="table-th">Код товара</th>
                </tr>
              </thead>

              <tbody>
                {mockData.map((row, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-td">{row.clientCode}</td>
                    <td className="table-td">{row.productCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>Всего строк: <b>{mockData.length}</b></span>
            
          </div>
        </div>
      </div>
    </div>
  );
};