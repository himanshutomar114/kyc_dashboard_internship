import React, { useState } from 'react';
import { useKYCData } from '@/hooks/useKYCData';

import CircularChartSkeleton from './CircularChartSkeleton';

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState<'Individual' | 'Non Individual'>('Individual');
  const { data, loading, error } = useKYCData(); // get real API data

  const ProgressBarSet = ({ label, darkValue, lightValue }) => (
    <div className="mb-3">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium text-gray-400 w-8">{label}</span>
      </div>
      {/* Dark bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${darkValue}%` }}
        ></div>
      </div>
      {/* Light bar */}
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-blue-300 transition-all duration-300"
          style={{ width: `${lightValue}%` }}
        ></div>
      </div>
    </div>
  );

  if (loading) {
    return <CircularChartSkeleton />;
  }

  if (error || !data?.categories) {
    return (
      <div className="p-4 text-red-500">
        Failed to load category data.
      </div>
    );
  }

  // Get active tab data from API response
  const tabData = data.categories[activeTab] || { RI: { dark: 0, light: 0 }, NRI: { dark: 0, light: 0 } };

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100 h-fit">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Categories</h3>

        <div className="flex bg-gray-100 rounded-full p-1">
          {['Individual', 'Non Individual'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'Individual' | 'Non Individual')}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-2">
        <ProgressBarSet label="RI" darkValue={tabData.RI.dark} lightValue={tabData.RI.light} />
        <ProgressBarSet label="NRI" darkValue={tabData.NRI.dark} lightValue={tabData.NRI.light} />
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded mr-1"></div>
            <span>Dark</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-300 rounded mr-1"></div>
            <span>Light</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
