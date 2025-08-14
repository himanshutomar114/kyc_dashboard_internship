import React from "react";

const CircularChartSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 h-fit animate-pulse">
      {/* Tabs Skeleton */}
      <div className="flex space-x-4 mb-4">
        <div className="h-5 w-20 bg-gray-200 rounded"></div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Chart Skeleton */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
        <div className="relative flex-shrink-0">
          {/* Outer circle */}
          <div className="w-[200px] h-[200px] rounded-full border-8 border-gray-200"></div>
          {/* Center text placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-3 w-10 bg-gray-200 rounded mb-1"></div>
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Legends Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircularChartSkeleton;
