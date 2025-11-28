import { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisControls } from './components/AnalysisControls';
import { ResultsMetrics } from './components/ResultsMetrics';
import { ResultsCharts } from './components/ResultsCharts';
import { ResultsComments } from './components/ResultsComments';
import type { AnalysisResult, ApiError } from './types';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback(
    (file: File | null, url: string | null) => {
      setSelectedImage(file);
      setPreviewUrl(url);
      setResult(null);
      setError(null);
    },
    []
  );

  const handleAnalyze = useCallback(async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            LumiFace
          </h1>
          <p className="mt-2 text-gray-600">
            AI-Powered Beauty & Skin Analysis
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12 space-y-8">
        {/* Upload Section */}
        <section className="space-y-6">
          <ImageUploader
            selectedImage={selectedImage}
            previewUrl={previewUrl}
            onImageSelect={handleImageSelect}
          />

          <AnalysisControls
            isLoading={isLoading}
            hasImage={!!selectedImage}
            onAnalyze={handleAnalyze}
          />
        </section>

        {/* Error Display */}
        {error && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <section className="space-y-8 animate-fade-in">
            <div className="border-t border-gray-200 pt-8">
              <ResultsMetrics skin={result.skin} features={result.features} />
            </div>

            <ResultsCharts skin={result.skin} features={result.features} />

            <ResultsComments text={result.text} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400">
        <p>Cosmetic analysis only. Not intended for medical diagnosis.</p>
      </footer>
    </div>
  );
}

export default App;
