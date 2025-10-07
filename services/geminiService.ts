
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateImageForScene = async (
  base64Image: string,
  mimeType: string,
  scenePrompt: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Place the character from the image ${scenePrompt}. Ensure the character is clearly visible and integrated into the scene.`,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          const base64ImageBytes: string = part.inlineData.data;
          return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
      }
    }

    throw new Error('Không tìm thấy dữ liệu hình ảnh trong phản hồi của Gemini.');
  } catch (error) {
    console.error("Lỗi khi tạo ảnh:", error);
    throw new Error('Đã xảy ra lỗi khi giao tiếp với Gemini API. Vui lòng thử lại.');
  }
};
