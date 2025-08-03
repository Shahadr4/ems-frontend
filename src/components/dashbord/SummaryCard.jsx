import React from 'react';

const colorMap = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  red: 'bg-red-600',
  yellow: 'bg-yellow-600',
  purple: 'bg-purple-600',
  gray: 'bg-gray-600',
  indigo: 'bg-indigo-600',
};

function SummaryCard({ icon, text, number, color = 'blue' }) {
  return (
    <div className="bg-gray-400 shadow-md rounded-xl p-4 flex items-center space-x-4 hover:shadow-lg transition duration-200">
      {/* Icon */}
      <div className={`text-white text-2xl sm:text-3xl p-3 rounded-full ${colorMap[color] || 'bg-blue-600'}`}>
        {icon}
      </div>

      {/* Text and Number */}
      <div>
        <p className="text-white text-xs sm:text-sm md:text-base">{text}</p>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{number}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
