import React, { useEffect } from 'react';
import { GeneratedImage } from '../types';
import DownloadIcon from './icons/DownloadIcon';
import XIcon from './icons/XIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface ImageModalProps {
  images: GeneratedImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (!currentImage) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.imageUrl;
    const fileExtension = currentImage.imageUrl.split(';')[0].split('/')[1] || 'png';
    link.download = `anh-${currentImage.sceneName.replace(/\s+/g, '-').toLowerCase()}-${currentImage.id}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] p-4 flex flex-col animate-zoom-in" 
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center pb-3 mb-3 border-b border-gray-700 flex-shrink-0">
           <h3 className="text-lg font-semibold text-white truncate pr-4" title={currentImage.sceneName}>
             {currentImage.sceneName}
           </h3>
           <div className="flex items-center gap-2">
              <button 
                onClick={handleDownload} 
                className="p-2 text-gray-300 rounded-full hover:bg-indigo-500/30 hover:text-white transition-colors"
                title="Tải ảnh"
              >
                <DownloadIcon className="w-6 h-6" />
              </button>
              <button 
                onClick={onClose} 
                className="p-2 text-gray-300 rounded-full hover:bg-red-500/30 hover:text-white transition-colors"
                title="Đóng (Esc)"
                aria-label="Đóng"
              >
                <XIcon className="w-6 h-6" />
              </button>
           </div>
        </header>
        
        <main className="flex-grow flex items-center justify-center overflow-hidden relative">
            <img 
              src={currentImage.imageUrl} 
              alt={currentImage.sceneName} 
              className="max-w-full max-h-full object-contain" 
            />
        </main>
      </div>
      
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }} 
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        title="Ảnh trước (Mũi tên trái)"
        aria-label="Ảnh trước"
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }} 
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        title="Ảnh kế tiếp (Mũi tên phải)"
        aria-label="Ảnh kế tiếp"
      >
        <ChevronRightIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default ImageModal;