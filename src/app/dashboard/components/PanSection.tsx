import React, { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import { useKYCData } from '@/hooks/useKYCData';
import CircularChartSkeleton from './CircularChartSkeleton';

const PANDataStatsSection = () => {
  const [activeTab, setActiveTab] = useState<'Individual' | 'Non Individual'>('Individual');
  const { data, loading } = useKYCData();

  if (loading) return <CircularChartSkeleton />;
  if (!data || !data.panDataStats) return <p>No PAN & Data Stats available.</p>;

  const currentData = data.panDataStats[activeTab];

  const StatCard = ({ icon, title, data, bgColor }) => (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {/* Icon */}
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${bgColor} flex items-center justify-center mr-3`}>
            <div className="w-4 h-4 sm:w-5 sm:h-5">
              {icon}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-2 truncate">{title}</h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="text-center">
                <div className="text-base sm:text-lg font-bold text-gray-800">{data.kfinKra}</div>
                <div className="text-xs text-gray-500">KFin KRA</div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg font-bold text-gray-800">{data.withImage}</div>
                <div className="text-xs text-gray-500">With Image</div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg font-bold text-gray-800">{data.withoutImage}</div>
                <div className="text-xs text-gray-500">Without Image</div>
              </div>
            </div>
          </div>
        </div>

        {/* Total number */}
        <div className="text-right ml-2 sm:ml-4">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800">{data.total}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-3 h-fit">
      {/* Header with Individual/Non Individual toggle */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">PAN & Data Stats</h2>

        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab('Individual')}
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'Individual'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setActiveTab('Non Individual')}
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'Non Individual'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Non Individual
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div>
        <StatCard
          icon={<FileText className="w-full h-full text-blue-600" />}
          title="No. Of PANs Solicited"
          data={currentData.pansSolicited}
          bgColor="bg-blue-50"
        />

        <StatCard
          icon={<CheckCircle className="w-full h-full text-green-600" />}
          title="Data Received"
          data={currentData.dataReceived}
          bgColor="bg-green-50"
        />
      </div>
    </div>
  );
};

export default PANDataStatsSection;
