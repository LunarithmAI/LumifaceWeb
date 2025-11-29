import React, { useCallback } from 'react';

const MAX_IMAGES = 3;

interface ImageData {
  file: File;
  previewUrl: string;
}

interface ImageUploaderProps {
  images: ImageData[];
  onImagesChange: (images: ImageData[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onImagesChange,
}) => {
  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return false;
    }
    return true;
  };

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remainingSlots = MAX_IMAGES - images.length;
      
      if (remainingSlots <= 0) {
        alert(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }

      const filesToAdd = fileArray.slice(0, remainingSlots);
      const newImages: ImageData[] = [];

      for (const file of filesToAdd) {
        if (validateFile(file)) {
          newImages.push({
            file,
            previewUrl: URL.createObjectURL(file),
          });
        }
      }

      if (newImages.length > 0) {
        onImagesChange([...images, ...newImages]);
      }
    },
    [images, onImagesChange]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        addFiles(e.target.files);
      }
      // Reset input so the same file can be selected again
      e.target.value = '';
    },
    [addFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleRemoveImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    },
    [images, onImagesChange]
  );

  const handleClearAll = useCallback(() => {
    onImagesChange([]);
  }, [onImagesChange]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {images.length === 0 ? (
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
              <p className="font-medium">Drag and drop your face images here</p>
              <p className="text-sm text-gray-400">or</p>
            </div>
            <label className="inline-block">
              <span className="px-4 py-2 bg-pink-500 text-white rounded-lg cursor-pointer hover:bg-pink-600 transition-colors">
                Upload face images
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400">
              Supports JPEG, PNG, WebP, GIF (max 10MB each, up to {MAX_IMAGES} images)
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square"
              >
                <img
                  src={image.previewUrl}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
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
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded text-white text-xs">
                  {index + 1} / {MAX_IMAGES}
                </div>
              </div>
            ))}

            {/* Add More Button */}
            {images.length < MAX_IMAGES && (
              <label
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-colors"
              >
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="mt-2 text-sm text-gray-500">Add more</span>
                <span className="text-xs text-gray-400">
                  ({MAX_IMAGES - images.length} remaining)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* File Names and Clear All */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {images.map((image, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                >
                  {image.file.name}
                </span>
              ))}
            </div>
            <button
              onClick={handleClearAll}
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
