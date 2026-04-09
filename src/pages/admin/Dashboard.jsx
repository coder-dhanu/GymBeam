import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import { Users, Layers, Package, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Visitors Count',
      count: '435',
      icon: Users,
      bgColorClass: 'bg-blue-50',
      iconColorClass: 'text-blue-500'
    },
    {
      title: 'Total Categories',
      count: '16',
      icon: Layers,
      bgColorClass: 'bg-indigo-50',
      iconColorClass: 'text-indigo-500'
    },
    {
      title: 'Total Products',
      count: '44',
      icon: Package,
      bgColorClass: 'bg-orange-50',
      iconColorClass: 'text-orange-500'
    },
    {
      title: 'Total Messages',
      count: '1',
      icon: MessageSquare,
      bgColorClass: 'bg-green-50',
      iconColorClass: 'text-green-500'
    }
  ];

  return (
    <AdminLayout>
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight mb-2">Welcome Admin...!</h1>
        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
          Monitor project performance, client engagement, and manage resources from a single control center.
        </p>
        <div className="w-full h-px bg-gray-200 mt-10"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
            bgColorClass={stat.bgColorClass}
            iconColorClass={stat.iconColorClass}
          />
        ))}
      </div>

      {/* Additional UI elements as per standard dashboards could go here, 
          but matching the reference image's focus for now. */}
    </AdminLayout>
  );
};

export default Dashboard;
