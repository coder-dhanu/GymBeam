import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const Category = () => {
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">Manage Categories</h1>
        <p className="text-gray-400 text-sm">Organize your training programs and services.</p>
        <div className="w-full h-px bg-gray-200 mt-6"></div>
      </div>
      
      <div className="bg-white p-20 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="text-gray-300 mb-4">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Categories coming soon</h3>
        <p className="text-gray-400 max-w-md">Here you will be able to add, edit, and remove gym categories like HIIT, Strength, and yoga.</p>
      </div>
    </AdminLayout>
  );
};

export default Category;
