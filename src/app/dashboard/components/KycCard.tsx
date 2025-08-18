"use client";

import { useKYCData } from "@/hooks/useKYCData";
import CircularChartSkeleton from "./CircularChartSkeleton";

import {
  ArrowUpIcon,
  ArrowDownIcon,
  UserPlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const KYCDashboard: React.FC = () => {
  const { data, loading } = useKYCData();

  if (loading) {
    return <CircularChartSkeleton />;
  }

  if (!data) {
    return (
      <div className="p-3 text-center text-red-500 text-sm">
        Failed to load KYC data.
      </div>
    );
  }

  const { total, newKYC, modifiedKYC } = data.kycDashboard;

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="bg-gray-50 p-1">
      <div className="max-w-6xl mx-auto">
        {/* Total KYCs Header */}
        <div className="mb-1">
          <h2 className="text-sm font-medium text-gray-600">Total KYCs</h2>
          <h1 className="text-xl font-bold text-gray-900">
            {formatNumber(total)}
          </h1>
        </div>

        {/* KYC Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* New KYC Card */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-2 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserPlusIcon className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-xs font-medium text-gray-600">New KYC</h3>
              </div>

              {/* Percentage Badge - Positive */}
              <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-green-50 rounded-full">
                <ArrowUpIcon className="h-3 w-3 text-green-600" />
                <span className="text-[11px] font-medium text-green-600">
                  {newKYC.change}%
                </span>
              </div>
            </div>

            {/* Count */}
            <h2 className="text-lg font-bold text-gray-900">
              {formatNumber(newKYC.count)}
            </h2>
          </div>

          {/* Modified KYC Card */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-2 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowPathIcon className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-xs font-medium text-gray-600">
                  Modified KYC
                </h3>
              </div>

              {/* Percentage Badge - Negative */}
              <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-red-50 rounded-full">
                <ArrowDownIcon className="h-3 w-3 text-red-600" />
                <span className="text-[11px] font-medium text-red-600">
                  {Math.abs(modifiedKYC.change)}%
                </span>
              </div>
            </div>

            {/* Count */}
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {formatNumber(modifiedKYC.count)}
            </h2>

            {/* Breakdown */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900">
                  {formatNumber(modifiedKYC.breakdown.myKRA)}
                </span>
                <span className="text-gray-500">My KRA</span>
              </div>
              <div className="flex items-center space-x-1">
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
