
import React, { useState, useRef } from 'react';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File, base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert("Kích thước tệp phải dưới 4MB.");
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImagePreview(reader.result as string);
        onImageUpload(file, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (fileInputRef.current) {
        fileInputRef.current.files = event.dataTransfer.files;
        handleFileChange({ target: fileInputRef.current } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-200 mb-3">
        <span className="text-indigo-400 font-bold">Bước 1:</span> Tải ảnh nhân vật
      </h2>
      <div 
        className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors duration-300 bg-gray-800/50"
        onClick={triggerFileInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {imagePreview ? (
          <div className="relative group">
            <img src={imagePreview} alt="Xem trước" className="max-h-60 mx-auto rounded-md shadow-lg"/>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg">Thay đổi ảnh</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <UploadIcon className="w-12 h-12 mb-2 text-gray-500" />
            <p className="font-semibold">Nhấp hoặc kéo thả ảnh vào đây</p>
            <p className="text-sm">PNG, JPG, WEBP (tối đa 4MB)</p>
          </div>
        )}
      </div>
       {fileName && <p className="text-sm text-gray-400 mt-2 text-center">Tệp đã chọn: {fileName}</p>}
    </div>
  );
};

export default ImageUploader;
