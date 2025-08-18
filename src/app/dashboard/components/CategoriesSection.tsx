"use client";

import React, { useState } from "react";
import { useKYCData } from "@/hooks/useKYCData";
import CircularChartSkeleton from "./CircularChartSkeleton";

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState<"Individual" | "Non Individual">("Individual");
  const { data, loading, error } = useKYCData(); // get real API data

  const ProgressBarSet = ({ label, darkValue, lightValue }) => (
    <div className="mb-2">
      <div className="flex items-center mb-1">
        <span className="text-xs font-medium text-gray-400 w-7">{label}</span>
      </div>
      {/* Dark bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-0.5">
        <div
          className="h-1.5 rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${darkValue}%` }}
        ></div>
      </div>
      {/* Light bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-blue-300 transition-all duration-300"
          style={{ width: `${lightValue}%` }}
        ></div>
      </div>
    </div>
  );

  if (loading) {
    return <CircularChartSkeleton />;
  }

  if (error || !data?.categories) {
    return <div className="p-2 text-xs text-red-500">Failed to load category data.</div>;
  }

  // Get active tab data from API response
  const tabData =
    data.categories[activeTab] || { RI: { dark: 0, light: 0 }, NRI: { dark: 0, light: 0 } };

  return (
    <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 h-fit">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
        <h3 className="text-sm font-semibold text-gray-800">Categories</h3>

        <div className="flex bg-gray-100 rounded-full p-0.5">
          {["Individual", "Non Individual"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "Individual" | "Non Individual")}
              className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-1">
        <ProgressBarSet label="RI" darkValue={tabData.RI.dark} lightValue={tabData.RI.light} />
        <ProgressBarSet label="NRI" darkValue={tabData.NRI.dark} lightValue={tabData.NRI.light} />
      </div>

      {/* Legend */}
      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
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
