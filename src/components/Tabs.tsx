"use client";
import { useState, ReactNode } from "react";

interface TabsProps {
  tabs: { label: string; content: ReactNode }[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200 px-6">
        <nav className="flex -mb-px">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`mr-8 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === index
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">{tabs[activeTab].content}</div>
    </div>
  );
}
