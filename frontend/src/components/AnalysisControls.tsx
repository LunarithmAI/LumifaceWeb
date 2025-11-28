import React from 'react';

interface AnalysisControlsProps {
  isLoading: boolean;
  hasImage: boolean;
  onAnalyze: () => void;
}

export const AnalysisControls: React.FC<AnalysisControlsProps> = ({
  isLoading,
  hasImage,
  onAnalyze,
}) => {
  return (
    <div className="text-center space-y-4">
      <p className="text-sm text-gray-500 max-w-md mx-auto">
        Analysis uses a Vision-Language Model. Cosmetic focus only. No medical advice.
      </p>
      <button
        onClick={onAnalyze}
        disabled={!hasImage || isLoading}
        className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
          !hasImage || isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Analyzing...
          </span>
        ) : (
          'Analyze my face'
        )}
      </button>
    </div>
  );
};
