import { useState } from 'react';


export const ImportExcel = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  

  return (
    <div className="p-24 flex justify-end">
      
      {isModalOpen && (
        <div className="fixsed inset-0 flex justify-center items-center z-[9999] " onClick={() => setIsModalOpen(false)}>
          <div className=" relative bg-[var(--text-light)] p-8 h-[100px] w-sm max-w-sm flex rounded-2xl text-center shadow-xl m-4 " onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-4 py-2 px-4 text-[var(--bg-dark)] text-xl cursor-pointer" onClick={() => setIsModalOpen(false)}> x </button>
            <div className="flex flex-col justify-center items-center text-center w-full mt-6 px-6">
               <p className="font-regular text-[#111827] mb-2">Товары успешно импортированы!</p>
               <p className="text-sm text-[#111827]">Статус: На складе в Китае</p>
            </div>  
          </div>
        </div>
      )}
    </div>
  );
};