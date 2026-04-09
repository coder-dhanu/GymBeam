import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const Messages = () => {
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">User Communications</h1>
        <p className="text-gray-400 text-sm">Review and respond to membership inquiries.</p>
        <div className="w-full h-px bg-gray-200 mt-6"></div>
      </div>
      
      <div className="bg-white p-20 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="text-gray-300 mb-4">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Messages coming soon</h3>
        <p className="text-gray-400 max-w-md">Your communication center for managing client messages is being prepared.</p>
      </div>
    </AdminLayout>
  );
};

export default Messages;
