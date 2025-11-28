import React from 'react';
import type { TextContent } from '../types';

interface ResultsCommentsProps {
  text: TextContent;
}

export const ResultsComments: React.FC<ResultsCommentsProps> = ({ text }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Insights & Recommendations
      </h3>

      {/* Description */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          Overview
        </h4>
        <p className="text-gray-700 leading-relaxed">{text.description}</p>
      </div>

      {/* Style Tips */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border border-pink-100">
        <h4 className="text-sm font-medium text-purple-600 uppercase tracking-wide mb-3">
          Style Tips
        </h4>
        <ul className="space-y-3">
          {text.style_tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm text-gray-500 italic flex items-start gap-2">
          <svg
            className="w-5 h-5 flex-shrink-0 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {text.disclaimer}
        </p>
      </div>
    </div>
  );
};
