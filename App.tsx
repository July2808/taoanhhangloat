
import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import SceneSelector from './components/SceneSelector';
import ImageGallery from './components/ImageGallery';
import LoadingSpinner from './components/LoadingSpinner';
import { Scene, GeneratedImage } from './types';
import { generateImageForScene } from './services/geminiService';

const App: React.FC = () => {
  const [characterImage, setCharacterImage] = useState<{ file: File; base64: string } | null>(null);
  const [selectedScenes, setSelectedScenes] = useState<Scene[]>([]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File, base64: string) => {
    setCharacterImage({ file, base64 });
  };

  const handleGenerate = async () => {
    if (!characterImage || selectedScenes.length === 0) {
      setError('Vui lòng tải lên một ảnh và chọn ít nhất một bối cảnh.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    const generationPromises = selectedScenes.map(async (scene) => {
      try {
        const imageUrl = await generateImageForScene(
          characterImage.base64,
          characterImage.file.type,
          scene.prompt
        );
        return {
          id: `${scene.id}-${Date.now()}`,
          sceneName: scene.name,
          imageUrl: imageUrl,
        };
      } catch (err) {
        console.error(`Lỗi khi tạo ảnh cho bối cảnh "${scene.name}":`, err);
        // Trả về null để đánh dấu lỗi cho bối cảnh này
        return null;
      }
    });
    
    const results = await Promise.all(generationPromises);
    const successfulImages = results.filter(img => img !== null) as GeneratedImage[];

    setGeneratedImages(successfulImages);

    if(successfulImages.length < selectedScenes.length) {
      setError(`Không thể tạo ảnh cho ${selectedScenes.length - successfulImages.length} bối cảnh. Vui lòng thử lại.`);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        <main className="mt-8 space-y-8">
          <div className="bg-gray-800/50 p-6 rounded-lg shadow-inner space-y-6">
            <ImageUploader onImageUpload={handleImageUpload} />
            <SceneSelector selectedScenes={selectedScenes} onSceneSelectionChange={setSelectedScenes} />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-200 mb-3">
              <span className="text-indigo-400 font-bold">Bước 3:</span> Tạo ảnh hàng loạt
            </h2>
            <button
              onClick={handleGenerate}
              disabled={isLoading || !characterImage || selectedScenes.length === 0}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? 'Đang tạo...' : `Tạo ${selectedScenes.length} ảnh`}
            </button>
          </div>
          
          {error && <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">{error}</div>}

          {isLoading && <LoadingSpinner />}
          
          <ImageGallery images={generatedImages} />
        </main>
      </div>
    </div>
  );
};

export default App;
