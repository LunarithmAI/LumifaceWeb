import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import type { Skin, Features } from '../types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface ResultsChartsProps {
  skin: Skin;
  features: Features;
}

export const ResultsCharts: React.FC<ResultsChartsProps> = ({
  skin,
  features,
}) => {
  // Normalize overall_score from 0-100 to 0-4 scale for radar chart
  const normalizedOverallScore = (skin.overall_score / 100) * 4;

  const radarData = {
    labels: ['Wrinkles', 'Acne', 'Pigmentation', 'Overall Score'],
    datasets: [
      {
        label: 'Skin Metrics',
        data: [
          skin.wrinkles.grade,
          skin.acne.grade,
          skin.pigmentation.grade,
          normalizedOverallScore,
        ],
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(236, 72, 153, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(236, 72, 153, 1)',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 1,
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
  };

  const barData = {
    labels: ['Wrinkles', 'Acne', 'Pigmentation', 'Jawline Definition'],
    datasets: [
      {
        label: 'Grade (0-4)',
        data: [
          skin.wrinkles.grade,
          skin.acne.grade,
          skin.pigmentation.grade,
          features.jawline.definition,
        ],
        backgroundColor: [
          'rgba(236, 72, 153, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
        ],
        borderColor: [
          'rgba(236, 72, 153, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y' as const,
    scales: {
      x: {
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Visual Analysis</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Skin Metrics Overview
          </h4>
          <div className="max-w-xs mx-auto">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Feature Grades
          </h4>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};
