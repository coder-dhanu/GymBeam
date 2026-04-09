import React from 'react';

const StatCard = ({ title, count, icon: Icon, colorClass, bgColorClass, iconColorClass }) => {
  return (
    <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${bgColorClass} ${iconColorClass}`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{title}</div>
        <div className="text-3xl font-bold text-[#F0F0F0] leading-none">{count}</div>
      </div>
    </div>
  );
};

export default StatCard;
