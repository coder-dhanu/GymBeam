import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const Products = () => {
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">Inventory Management</h1>
        <p className="text-gray-400 text-sm">Track your supplements, gym gear, and equipment.</p>
        <div className="w-full h-px bg-gray-200 mt-6"></div>
      </div>
      
      <div className="bg-white p-20 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="text-gray-300 mb-4">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Products coming soon</h3>
        <p className="text-gray-400 max-w-md">The equipment and supplement management system is under development.</p>
      </div>
    </AdminLayout>
  );
};

export default Products;
