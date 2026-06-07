import { useState } from 'react';
import './ImportExcel.css';

export const ImportExcel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImportSuccess = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="import-container">
      <button className="import-click" onClick={handleImportSuccess}>Импортировать Excel</button>
      
      {isModalOpen && (
        <div className="import-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="import-content" onClick={(e) => e.stopPropagation()}>
            <button className="import-btn" onClick={() => setIsModalOpen(false)}> x </button>
            <p className="import-title">Товары успешно импортированы!</p>
            <p className="import-status">Статус: На складе в Китае</p>
          </div>
        </div>
      )}
    </div>
  );
};