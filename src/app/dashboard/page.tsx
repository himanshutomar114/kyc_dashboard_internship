"use client";

import KYCBarChart from "./components/BarChart";
import CategoriesSection from "./components/CategoriesSection";
import KYCDashboard from "./components/KycCard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import KYCStatusCards from "./components/KYCStatusCard";
import SolicitedUnsolicitedSection from "./components/Solicited";
import PANDataStatsSection from "./components/PanSection";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState("Today");
  const [customDate, setCustomDate] = useState<Date | null>(new Date());
  

  const downloadPDF = async () => {
  const dashboard = document.getElementById("dashboard-section");
  if (!dashboard) return;

  const imgData = await toPng(dashboard, { cacheBust: true });
  const pdf = new jsPDF("l", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save("dashboard.pdf");
};



  return (
    <div className="flex h-screen">
      
      {/* Sidebar (handles its own mobile menu) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Filter Buttons */}
        <div className="flex items-center h-14 justify-end bg-white border-b p-2 shadow-sm pr-14">
          <button
      onClick={downloadPDF}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
    >
      Download PDF
    </button>
        <div className="flex items-center w-72 bg-white rounded-full border p-1 m-4">
          {["Today", "This Month", "Custom"].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedRange === range
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Date Picker (only for custom range) */}
        
          <div className="flex items-center bg-white w-32 border rounded-full px-4 py-3 text-gray-700 cursor-pointer mx-4 overflow-x-hidden">
            <Calendar className="w-4 h-4 mr-2 " />
            <DatePicker
              selected={customDate}
              onChange={(date) => setCustomDate(date)}
              dateFormat="dd MMM yyyy"
              className="outline-none cursor-pointer text-xs bg-transparent w-full"
            />
          </div>
    
        </div>

        {/* Page Content */}
        <main className="p-4 overflow-y-auto bg-gray-50 flex flex-col gap-6" id="dashboard-section">
          <div className="flex gap-6 flex-col lg:flex-row">
            {/* Left Column */}
            <div className="w-full lg:w-xl flex flex-col gap-2">
              <KYCDashboard />
              <KYCBarChart />
              <KYCStatusCards />
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-xl flex flex-col gap-6">
              <CategoriesSection />
              <SolicitedUnsolicitedSection />
              <PANDataStatsSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
