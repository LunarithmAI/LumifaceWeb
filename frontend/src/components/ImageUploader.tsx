import React, { useCallback } from 'react';

interface ImageUploaderProps {
  selectedImage: File | null;
  previewUrl: string | null;
  onImageSelect: (file: File | null, previewUrl: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedImage,
  previewUrl,
  onImageSelect,
}) => {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
          alert('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
          return;
        }
        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert('File size must be less than 10MB');
          return;
        }
        const url = URL.createObjectURL(file);
        onImageSelect(file, url);
      }
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
          alert('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert('File size must be less than 10MB');
          return;
        }
        const url = URL.createObjectURL(file);
        onImageSelect(file, url);
      }
    },
    [onImageSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleClear = useCallback(() => {
    onImageSelect(null, null);
  }, [onImageSelect]);

  return (
    <div className="w-full max-w-md mx-auto">
      {!selectedImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-400 transition-colors cursor-pointer bg-white"
        >
          <div className="space-y-4">
            <div className="text-gray-400">
              <svg
                className="mx-auto h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-gray-600">
              <p className="font-medium">Drag and drop your face image here</p>
              <p className="text-sm text-gray-400">or</p>
            </div>
            <label className="inline-block">
              <span className="px-4 py-2 bg-pink-500 text-white rounded-lg cursor-pointer hover:bg-pink-600 transition-colors">
                Upload face image
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400">
              Supports JPEG, PNG, WebP, GIF (max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={previewUrl || ''}
              alt="Preview"
              className="w-full h-64 object-contain"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            {selectedImage.name}
          </p>
        </div>
      )}
    </div>
  );
};
