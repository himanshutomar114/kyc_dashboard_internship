"use client";

import { useKYCData } from '@/hooks/useKYCData';
import CircularChartSkeleton from './CircularChartSkeleton';

import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  UserPlusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { use } from 'react';

const KYCDashboard: React.FC = () => {
const { data, loading } = useKYCData();

if (loading) {
    return <CircularChartSkeleton />;
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load KYC data.
      </div>
    );
  }

  const { total, newKYC, modifiedKYC } = data.kycDashboard;

const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Total KYCs Header */}
        <div className="mb-3">
          <h2 className="text-lg font-medium text-gray-600 mb-1">Total KYCs</h2>
          <h1 className="text-4xl font-bold text-gray-900">
            {formatNumber(total)}
          </h1>
        </div>

        {/* KYC Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* New KYC Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserPlusIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">New KYC</h3>
                </div>
              </div>
              
              {/* Percentage Badge - Positive */}
              <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 rounded-full">
                <ArrowUpIcon className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">
                  {newKYC.change}%
                </span>
              </div>
            </div>

            {/* Count */}
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-gray-900">
                {formatNumber(newKYC.count)}
              </h2>
            </div>
          </div>

          {/* Modified KYC Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowPathIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Modified KYC</h3>
                </div>
              </div>
              
              {/* Percentage Badge - Negative */}
              <div className="flex items-center space-x-1 px-2 py-1 bg-red-50 rounded-full">
                <ArrowDownIcon className="h-3 w-3 text-red-600" />
                <span className="text-xs font-medium text-red-600">
                  {Math.abs(modifiedKYC.change)}%
                </span>
              </div>
            </div>

            {/* Count */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-gray-900">
                {formatNumber(modifiedKYC.count)}
              </h2>
            </div>

            {/* Breakdown */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">
                  {formatNumber(modifiedKYC.breakdown.myKRA)}
                </span>
                <span className="text-gray-500">My KRA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">
                  {formatNumber(modifiedKYC.breakdown.interop)}
                </span>
                <span className="text-gray-500">Interop</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default KYCDashboard;