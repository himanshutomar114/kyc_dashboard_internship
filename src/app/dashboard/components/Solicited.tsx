"use client";

import { useState } from "react";
import { useKYCData } from "@/hooks/useKYCData";
import CircularChartSkeleton from "./CircularChartSkeleton";

const SolicitedUnsolicitedSection = () => {
  const [activeTab, setActiveTab] = useState<"Individual" | "Non Individual">("Individual");
  const [activeSection, setActiveSection] = useState<"Solicited" | "Unsolicited">("Solicited");

  const { data, loading } = useKYCData();

  if (loading) return <CircularChartSkeleton />;
  if (!data) return <p className="text-xs text-gray-500">No KYC data available.</p>;

  const currentData = data.solicitedUnsolicited[activeTab][activeSection];
  const total = currentData.total || 1;

  const createCircularChart = () => {
    const centerX = 80;
    const centerY = 80;
    const baseRadius = 60;

    const circles = [
      { radius: baseRadius, value: currentData.noOfPANsSolicited, color: "#059669", strokeWidth: 8 },
      { radius: baseRadius - 12, value: currentData.received, color: "#2563eb", strokeWidth: 8 },
      { radius: baseRadius - 24, value: currentData.consumed, color: "#06b6d4", strokeWidth: 8 },
      { radius: baseRadius - 36, value: currentData.pending, color: "#f87171", strokeWidth: 8 },
    ];

    return circles.map((circle, index) => {
      const percentage = circle.value;
      const circumference = 2 * Math.PI * circle.radius;
      const strokeDasharray = circumference;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;

      return (
        <g key={index}>
          <circle
            cx={centerX}
            cy={centerY}
            r={circle.radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={circle.strokeWidth}
            opacity={0.3}
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={circle.radius}
            fill="none"
            stroke={circle.color}
            strokeWidth={circle.strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${centerX} ${centerY})`}
            className="transition-all duration-700 ease-out"
          />
        </g>
      );
    });
  };

  const legends = [
    { color: "#059669", label: "No Of PANs Solicited" },
    { color: "#2563eb", label: "Received" },
    { color: "#06b6d4", label: "Consumed" },
    { color: "#f87171", label: "Pending" },
  ];

  return (
    <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 h-fit">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex space-x-3">
          {["Solicited", "Unsolicited"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as "Solicited" | "Unsolicited")}
              className={`text-xs font-medium pb-0.5 border-b-2 transition-colors duration-200 ${
                activeSection === section
                  ? "text-gray-800 border-gray-800"
                  : "text-gray-400 border-transparent hover:text-gray-600"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="flex bg-gray-100 rounded-full p-0.5 self-end">
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

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
        <div className="relative flex-shrink-0">
          <svg width="160" height="160" className="transform -rotate-90">
            {createCircularChart()}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-gray-500 text-[10px] mb-0.5">Total</span>
            <span className="text-sm font-bold text-gray-800">
              {currentData.total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {legends.map((legend, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: legend.color }}></div>
              <span className="text-gray-600 text-xs">{legend.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolicitedUnsolicitedSection;
