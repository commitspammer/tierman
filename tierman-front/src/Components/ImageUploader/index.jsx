import { useState } from "react";

export default function ImageUploader({ onImagesChange }) {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFilesChange = (e) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileArray]);
    setPreviews((prev) => [...prev, ...newPreviews]);

    if (onImagesChange) onImagesChange([...images, ...fileArray]);
  };

  const handleRemove = (index) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviews(newPreviews);

    if (onImagesChange) onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Upload de Imagens
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFilesChange}
          className="mt-2 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 h-[20rem] overflow-y-auto">
        {previews.map((src, index) => (
          <div key={index} className="relative group w-[140px] h-[130px]">
            <img
              src={src}
              alt={`Preview ${index}`}
              className="w-[140px] h-[130px] object-fill rounded shadow"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
