import React from 'react';
import type { Skin, Features } from '../types';

interface ResultsMetricsProps {
  skin: Skin;
  features: Features;
}

const MetricCard: React.FC<{
  title: string;
  value: number | string;
  maxValue?: number;
  reason?: string;
}> = ({ title, value, maxValue, reason }) => {
  const isNumeric = typeof value === 'number' && maxValue !== undefined;
  const percentage = isNumeric ? (value / maxValue) * 100 : 0;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </h4>
      <div className="mt-2">
        {isNumeric ? (
          <>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-gray-800">{value}</span>
              <span className="text-sm text-gray-400">/ {maxValue}</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </>
        ) : (
          <span className="text-xl font-semibold text-gray-800 capitalize">
            {value}
          </span>
        )}
        {reason && (
          <p className="mt-2 text-xs text-gray-500">{reason}</p>
        )}
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800 capitalize">{value}</span>
  </div>
);

export const ResultsMetrics: React.FC<ResultsMetricsProps> = ({
  skin,
  features,
}) => {
  return (
    <div className="space-y-6">
      {/* Skin Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Skin Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Wrinkles"
            value={skin.wrinkles.grade}
            maxValue={4}
            reason={skin.wrinkles.reason}
          />
          <MetricCard
            title="Acne"
            value={skin.acne.grade}
            maxValue={4}
            reason={skin.acne.reason}
          />
          <MetricCard
            title="Pigmentation"
            value={skin.pigmentation.grade}
            maxValue={4}
            reason={skin.pigmentation.reason}
          />
          <MetricCard
            title="Overall Score"
            value={skin.overall_score}
            maxValue={100}
          />
        </div>
      </div>

      {/* Facial Features */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Facial Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Face Shape
            </h4>
            <span className="text-xl font-semibold text-gray-800 capitalize">
              {features.face_shape}
            </span>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Jawline
            </h4>
            <FeatureItem label="Shape" value={features.jawline.shape} />
            <FeatureItem
              label="Definition"
              value={`${features.jawline.definition}/4`}
            />
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Nose
            </h4>
            <FeatureItem label="Length" value={features.nose.length} />
            <FeatureItem label="Width" value={features.nose.width} />
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Eyes
            </h4>
            <FeatureItem label="Size" value={features.eyes.size} />
            <FeatureItem label="Spacing" value={features.eyes.spacing} />
            <FeatureItem label="Shape" value={features.eyes.shape} />
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Lips
            </h4>
            <FeatureItem label="Fullness" value={features.lips.fullness} />
          </div>
        </div>
      </div>
    </div>
  );
};
