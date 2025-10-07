import React, { useState } from 'react';
import { Scene, SceneCategory } from '../types';
import { SCENE_CATEGORIES, ALL_SCENES } from '../constants';
import XIcon from './icons/XIcon';

interface SceneSelectorProps {
  selectedScenes: Scene[];
  onSceneSelectionChange: (scenes: Scene[]) => void;
}

const MAX_SCENES = 10;

const SceneSelector: React.FC<SceneSelectorProps> = ({ selectedScenes, onSceneSelectionChange }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const limitReached = selectedScenes.length >= MAX_SCENES;

  const handleCheckboxChange = (scene: Scene) => {
    const isSelected = selectedScenes.some(s => s.id === scene.id);
    if (!isSelected && limitReached) {
      // Ngăn không cho chọn thêm nếu đã đạt giới hạn
      return;
    }
    
    if (isSelected) {
      onSceneSelectionChange(selectedScenes.filter(s => s.id !== scene.id));
    } else {
      onSceneSelectionChange([...selectedScenes, scene]);
    }
  };

  const handleDeselectAll = () => {
    // Chỉ bỏ chọn các bối cảnh có sẵn, giữ lại các bối cảnh tùy chỉnh
    const customScenes = selectedScenes.filter(s => s.id.startsWith('custom-'));
    onSceneSelectionChange(customScenes);
  };
  
  const handleRandomize = () => {
    const customScenes = selectedScenes.filter(s => s.id.startsWith('custom-'));
    const remainingSlots = MAX_SCENES - customScenes.length;

    if (remainingSlots <= 0) {
        onSceneSelectionChange(customScenes); // Bỏ chọn tất cả các bối cảnh không phải tùy chỉnh
        return;
    }

    const shuffled = [...ALL_SCENES].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 4) + 2; // Cố gắng chọn từ 2 đến 5 bối cảnh
    const finalCount = Math.min(count, remainingSlots);
    const randomScenes = shuffled.slice(0, finalCount);
    
    // Thay thế các bối cảnh có sẵn bằng các bối cảnh ngẫu nhiên mới, giữ lại bối cảnh tùy chỉnh
    onSceneSelectionChange([...customScenes, ...randomScenes]);
  };
  
  const handleAddCustomScene = (e: React.FormEvent) => {
    e.preventDefault();
    if (limitReached) {
        return;
    }
    if (customPrompt.trim()) {
      const newScene: Scene = {
        id: `custom-${Date.now()}`,
        name: `Tuỳ chỉnh: "${customPrompt.trim()}"`,
        prompt: customPrompt.trim(),
      };
      if (!selectedScenes.some(s => s.prompt === newScene.prompt)) {
        onSceneSelectionChange([...selectedScenes, newScene]);
      }
      setCustomPrompt('');
    }
  };

  const handleRemoveScene = (sceneId: string) => {
    onSceneSelectionChange(selectedScenes.filter(s => s.id !== sceneId));
  };
  
  const handleToggleCategory = (category: SceneCategory) => {
    const categorySceneIds = new Set(category.scenes.map(s => s.id));
    const areAllSelected = category.scenes.every(scene => selectedScenes.some(s => s.id === scene.id));

    if (areAllSelected) {
      // Bỏ chọn tất cả trong danh mục này
      onSceneSelectionChange(selectedScenes.filter(s => !categorySceneIds.has(s.id)));
    } else {
      // Chọn các bối cảnh có sẵn trong danh mục này, cho đến khi đạt giới hạn
      const scenesToAdd = category.scenes.filter(scene => !selectedScenes.some(s => s.id === scene.id));
      const remainingSlots = MAX_SCENES - selectedScenes.length;
      
      if (remainingSlots <= 0) {
        return; // Không thể thêm nữa
      }
      
      const scenesToAddLimited = scenesToAdd.slice(0, remainingSlots);
      onSceneSelectionChange([...selectedScenes, ...scenesToAddLimited]);
    }
  };

  const customScenes = selectedScenes.filter(s => s.id.startsWith('custom-'));

  return (
    <div className="w-full">
      <div className="flex items-baseline mb-3">
        <h2 className="text-xl font-semibold text-gray-200">
            <span className="text-indigo-400 font-bold">Bước 2:</span> Chọn bối cảnh
        </h2>
        <span className={`text-base font-normal ml-auto ${limitReached ? 'text-red-400 font-semibold' : 'text-gray-400'}`}>
            {selectedScenes.length} / {MAX_SCENES} đã chọn
        </span>
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={handleDeselectAll} className="flex-1 min-w-[120px] bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors text-sm">Bỏ chọn (có sẵn)</button>
        <button onClick={handleRandomize} className="flex-1 min-w-[120px] bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors text-sm">Ngẫu nhiên</button>
      </div>

      {limitReached && (
        <div className="bg-yellow-900/30 border border-yellow-600 text-yellow-300 px-4 py-2 rounded-lg text-center text-sm mb-6 animate-fade-in">
            Bạn đã chọn tối đa {MAX_SCENES} bối cảnh. Bỏ chọn một bối cảnh để chọn bối cảnh khác.
        </div>
      )}

      <div className="space-y-6">
        {SCENE_CATEGORIES.map(category => {
          const areAllSelected = category.scenes.every(scene => selectedScenes.some(s => s.id === scene.id));
          return (
            <div key={category.name}>
              <div className="flex justify-between items-center mb-3 border-b-2 border-gray-700 pb-2">
                <h3 className="text-lg font-semibold text-indigo-300">
                  {category.name}
                </h3>
                <button
                  onClick={() => handleToggleCategory(category)}
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                  disabled={!areAllSelected && limitReached}
                >
                  {areAllSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {category.scenes.map(scene => {
                    const isSelected = selectedScenes.some(s => s.id === scene.id);
                    const isDisabled = !isSelected && limitReached;
                    return (
                    <label
                        key={scene.id}
                        className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                        isSelected
                            ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400'
                            : 'bg-gray-800 text-gray-300'
                        } ${isDisabled 
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-gray-700 cursor-pointer'
                        }`}
                    >
                        <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCheckboxChange(scene)}
                        className="hidden"
                        disabled={isDisabled}
                        />
                        <span className="select-none text-sm font-medium">{scene.name}</span>
                    </label>
                    );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-200 mb-3 border-t-2 border-gray-700 pt-6">
          <span className="text-indigo-400 font-bold">Hoặc:</span> Thêm bối cảnh tuỳ chọn
        </h2>
        <form onSubmit={handleAddCustomScene} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            placeholder={limitReached ? "Đã đạt giới hạn bối cảnh" : "Ví dụ: trên mặt trăng, trong một tiệm sách cũ..."}
            className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400 disabled:opacity-50"
            disabled={limitReached}
          />
          <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!customPrompt.trim() || limitReached}>
            Thêm
          </button>
        </form>

        {customScenes.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-md font-semibold text-gray-300">Bối cảnh đã thêm:</h4>
            {customScenes.map(scene => (
              <div key={scene.id} className="flex items-center justify-between bg-gray-700/50 p-2 pl-4 rounded-md animate-fade-in">
                <span className="text-gray-200 text-sm italic">"{scene.prompt}"</span>
                <button 
                  onClick={() => handleRemoveScene(scene.id)} 
                  className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-500/20"
                  title="Xoá bối cảnh"
                  aria-label={`Xoá bối cảnh ${scene.prompt}`}
                >
                  <XIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneSelector;