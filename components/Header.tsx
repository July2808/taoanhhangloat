
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-2">
        Trình Tạo Ảnh Hàng Loạt
      </h1>
      <p className="text-lg text-gray-300">
        Tạo hàng loạt hình ảnh AI với nhiều bối cảnh khác nhau từ một nhân vật duy nhất, dùng Gemini Nano Banana.
      </p>
    </header>
  );
};

export default Header;
