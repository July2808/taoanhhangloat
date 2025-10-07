import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import DownloadIcon from './icons/DownloadIcon';
import ImageModal from './ImageModal';

// Khai báo JSZip để TypeScript không báo lỗi vì nó được import từ CDN
declare const JSZip: any;

interface ImageGalleryProps {
  images: GeneratedImage[];
}

interface ImageCardProps {
  image: GeneratedImage;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn modal mở khi bấm nút tải
    const link = document.createElement('a');
    link.href = image.imageUrl;
    // Lấy phần mở rộng tệp từ chuỗi data URL (ví dụ: 'jpeg', 'png')
    const fileExtension = image.imageUrl.split(';')[0].split('/')[1] || 'png';
    link.download = `anh-${image.sceneName.replace(/\s+/g, '-').toLowerCase()}-${image.id}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group relative animate-fade-in cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <img src={image.imageUrl} alt={image.sceneName} className="w-full h-56 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-center">
        <p className="text-white font-semibold truncate pr-2">{image.sceneName}</p>
        <button
          onClick={handleDownload}
          className="p-2 rounded-full bg-indigo-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-500 flex-shrink-0"
          title="Tải ảnh chất lượng cao"
          aria-label={`Tải ảnh ${image.sceneName}`}
        >
          <DownloadIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};


const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [isZipping, setIsZipping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleOpenModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDownloadAll = async () => {
    if (!images.length || typeof JSZip === 'undefined') {
      if (typeof JSZip === 'undefined') {
        console.error("Lỗi: Thư viện JSZip chưa được tải. Không thể tạo file zip.");
        alert("Không thể tải tất cả ảnh. Vui lòng thử lại sau.");
      }
      return;
    }

    setIsZipping(true);
    try {
      const zip = new JSZip();

      const imagePromises = images.map(async (image) => {
        const response = await fetch(image.imageUrl);
        const blob = await response.blob();
        const fileExtension = blob.type.split('/')[1] || 'png';
        const fileName = `anh-${image.sceneName.replace(/\s+/g, '-').toLowerCase()}-${image.id}.${fileExtension}`;
        zip.file(fileName, blob);
      });

      await Promise.all(imagePromises);

      const content = await zip.generateAsync({ type: 'blob' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'anh-hang-loat.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

    } catch (error) {
      console.error("Lỗi khi tạo file zip:", error);
      alert("Đã có lỗi xảy ra khi nén ảnh. Vui lòng thử lại.");
    } finally {
      setIsZipping(false);
    }
  };


  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 mt-8">
        <h2 className="text-xl font-semibold text-gray-200 mb-2 sm:mb-0">
          Kết quả
        </h2>
        <button
          onClick={handleDownloadAll}
          disabled={isZipping}
          className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <DownloadIcon className="w-5 h-5" />
          {isZipping ? 'Đang nén...' : 'Tải tất cả (.zip)'}
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-6 -mt-2">
        Nhấp vào một ảnh để xem ở chế độ phóng to.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <ImageCard key={image.id} image={image} onClick={() => handleOpenModal(index)} />
        ))}
      </div>
      {isModalOpen && (
        <ImageModal
          images={images}
          currentIndex={currentImageIndex}
          onClose={handleCloseModal}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </div>
  );
};

export default ImageGallery;