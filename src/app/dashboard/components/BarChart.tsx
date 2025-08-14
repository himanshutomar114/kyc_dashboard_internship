"use client";

import { useState } from "react";
import { ChartBarIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { useKYCData } from "@/hooks/useKYCData";
import CircularChartSkeleton from "./CircularChartSkeleton";

type BarChartData = {
  individual: { today: number; yesterday: number };
  nonIndividual: { today: number; yesterday: number };
};

const KYCBarChart: React.FC = () => {
  const [viewType, setViewType] = useState<"chart" | "table">("chart");
  const { data, loading } = useKYCData();

  // Format numbers safely
  const formatNumber = (num?: number) =>
    typeof num === "number" ? num.toLocaleString() : "0";

  if (loading) return <CircularChartSkeleton />;
  if (!data?.barChart) return <div>No data available</div>;

  const chartData = data.barChart;

  const maxValue = Math.max(
    chartData.individual?.today ?? 0,
    chartData.individual?.yesterday ?? 0,
    chartData.nonIndividual?.today ?? 0,
    chartData.nonIndividual?.yesterday ?? 0
  );
  const chartMax = Math.ceil(maxValue / 100) * 100 || 100;

  const yAxisLabels: number[] = [];
  for (let i = 0; i <= chartMax; i += 50) {
    yAxisLabels.push(i);
  }

  const getBarHeight = (value: number) => (value / chartMax) * 300;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            KYC Applications
          </h3>
          <p className="text-sm text-gray-500">
            Individual vs Non-Individual comparison
          </p>
        </div>
        {/* Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewType("chart")}
            className={`p-2 rounded-md transition-colors ${
              viewType === "chart"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <ChartBarIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewType("table")}
            className={`p-2 rounded-md transition-colors ${
              viewType === "table"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <ListBulletIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewType === "chart" ? (
        <div>
          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              <span className="text-sm text-gray-700 font-medium">Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-200 rounded-full" />
              <span className="text-sm text-gray-700 font-medium">Yesterday</span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
            <div className="absolute left-0 top-0 h-80 flex flex-col-reverse justify-between text-xs text-gray-500 pr-4">
              {yAxisLabels.map((label) => (
                <div key={label}>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="ml-12 relative h-80 flex items-end justify-center space-x-16">
              {/* Individual */}
              <div className="flex items-end space-x-3">
                {[chartData.individual?.today, chartData.individual?.yesterday].map(
                  (value, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-12 rounded-t transition-transform duration-300 ease-out relative group cursor-pointer hover:scale-105 ${
                          idx === 0 ? "bg-blue-600" : "bg-blue-200"
                        }`}
                        style={{ height: `${getBarHeight(value ?? 0)}px` }}
                      >
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {formatNumber(value)}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Non-Individual */}
              <div className="flex items-end space-x-3">
                {[chartData.nonIndividual?.today, chartData.nonIndividual?.yesterday].map(
                  (value, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-12 rounded-t transition-transform duration-300 ease-out relative group cursor-pointer hover:scale-105 ${
                          idx === 0 ? "bg-blue-600" : "bg-blue-200"
                        }`}
                        style={{ height: `${getBarHeight(value ?? 0)}px` }}
                      >
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {formatNumber(value)}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* X-axis */}
            <div className="flex items-center justify-center space-x-16 mt-4 text-sm text-gray-600 font-medium">
              <span>Individual</span>
              <span>Non Individual</span>
            </div>
          </div>
        </div>
      ) : (
        /* Table View */
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-right py-3 px-4">Today</th>
                <th className="text-right py-3 px-4">Yesterday</th>
                <th className="text-right py-3 px-4">Change</th>
              </tr>
            </thead>
            <tbody>
              {(["individual", "nonIndividual"] as const).map((category) => {
                const today = chartData[category]?.today ?? 0;
                const yesterday = chartData[category]?.yesterday ?? 0;
                return (
                  <tr key={category} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      {category === "individual" ? "Individual" : "Non Individual"}
                    </td>
                    <td className="text-right py-3 px-4 font-semibold text-blue-600">
                      {formatNumber(today)}
                    </td>
                    <td className="text-right py-3 px-4">{formatNumber(yesterday)}</td>
                    <td className="text-right py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          today > yesterday
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {today > yesterday ? "+" : ""}
                        {today - yesterday}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KYCBarChart;
