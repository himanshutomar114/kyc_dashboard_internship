"use client";

import React, { useState } from "react";
import { FileText, CheckCircle } from "lucide-react";
import { useKYCData } from "@/hooks/useKYCData";
import CircularChartSkeleton from "./CircularChartSkeleton";

const PANDataStatsSection = () => {
  const [activeTab, setActiveTab] = useState<"Individual" | "Non Individual">("Individual");
  const { data, loading } = useKYCData();

  if (loading) return <CircularChartSkeleton />;
  if (!data || !data.panDataStats)
    return <p className="text-xs text-gray-500">No PAN & Data Stats available.</p>;

  const currentData = data.panDataStats[activeTab];

  const StatCard = ({
    icon,
    title,
    data,
    bgColor,
  }: {
    icon: React.ReactNode;
    title: string;
    data: {
      kfinKra: number | string;
      withImage: number | string;
      withoutImage: number | string;
      total: number | string;
    };
    bgColor: string;
  }) => (
    <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {/* Icon */}
          <div
            className={`w-7 h-7 rounded-md ${bgColor} flex items-center justify-center mr-2`}
          >
            <div className="w-4 h-4">{icon}</div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-medium text-gray-800 mb-1 truncate">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-center">
                <div className="text-sm font-bold text-gray-800">{data.kfinKra}</div>
                <div className="text-[10px] text-gray-500">KFin KRA</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-800">{data.withImage}</div>
                <div className="text-[10px] text-gray-500">With Image</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-800">{data.withoutImage}</div>
                <div className="text-[10px] text-gray-500">Without Image</div>
              </div>
            </div>
          </div>
        </div>

        {/* Total number */}
        <div className="text-right ml-2">
          <div className="text-lg font-bold text-gray-800">{data.total}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-2 h-fit">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-800">PAN & Data Stats</h2>
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
