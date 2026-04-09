import React from 'react';

const StatCard = ({ title, count, icon: Icon, colorClass, bgColorClass, iconColorClass }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${bgColorClass} ${iconColorClass}`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</div>
        <div className="text-3xl font-bold text-gray-800 leading-none">{count}</div>
      </div>
    </div>
  );
};

export default StatCard;
