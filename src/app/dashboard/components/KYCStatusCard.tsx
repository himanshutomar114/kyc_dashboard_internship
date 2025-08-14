import { useState } from "react";
import {
  RocketLaunchIcon,
  Cog6ToothIcon,
  UserIcon,
  ShieldCheckIcon,
  PauseCircleIcon,
  BeakerIcon
} from "@heroicons/react/24/outline";

import { useKYCData } from "@/hooks/useKYCData";

const iconMap: Record<string, React.ComponentType<any>> = {
  RocketLaunchIcon,
  Cog6ToothIcon,
  UserIcon,
  ShieldCheckIcon,
  PauseCircleIcon,
  BeakerIcon
};

const KYCStatusCards = () => {
  const { data, loading, error } = useKYCData();

  const [selectedDate, setSelectedDate] = useState<"today" | "yesterday">("today");
  const [selectedType, setSelectedType] = useState<"Individual" | "Non Individual">("Individual");

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }
  if (!data) {
    return <div className="text-center text-red-500">No data available</div>;
  }

  const typeMap: Record<"Individual" | "Non Individual", keyof typeof data.barChart> = {
    Individual: "individual",
    "Non Individual": "nonIndividual"
  };

  const filteredCount =
    data.barChart?.[typeMap[selectedType]]?.[selectedDate] ?? 0;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Top Tabs */}
      <div className="flex justify-between mb-6">
        {/* Date Tabs */}
        <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
          {["today", "yesterday"].map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date as "today" | "yesterday")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                selectedDate === date
                  ? "text-black bg-white shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {date.charAt(0).toUpperCase() + date.slice(1)}
            </button>
          ))}
        </div>

        {/* Type Tabs */}
        <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
          {["Individual", "Non Individual"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as "Individual" | "Non Individual")}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                selectedType === type
                  ? "text-black bg-white shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Display Filtered Data */}
      <div className="mb-4 text-center">
        <p className="text-gray-500">
          Showing data for <b>{selectedType}</b> - <b>{selectedDate}</b>
        </p>
        <p className="text-xl font-bold text-gray-700">
          {typeof filteredCount === "number" ? filteredCount.toLocaleString() : "-"}
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {(data.statusCards || []).map((status) => {
          const Icon = iconMap[status.icon] || UserIcon;
          return (
            <div
              key={status.id}
              className="flex flex-col items-center p-3 bg-gray-50 rounded-lg"
            >
              <Icon className={`h-6 w-6 mb-2 ${status.color}`} />
              <p className="text-sm text-gray-600">{status.title}</p>
              <p className="text-lg text-black font-bold">
                {typeof status.count === "number"
                  ? status.count.toLocaleString()
                  : "-"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KYCStatusCards;
