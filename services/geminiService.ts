
import { GoogleGenAI } from "@google/genai";
import { AspectRatio, ImageSize, ModelType } from "../types";

export class GeminiService {
  private static getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  static async generateImage(params: {
    model: ModelType;
    prompt: string;
    aspectRatio: AspectRatio;
    imageSize?: ImageSize;
    searchGrounding?: boolean;
  }): Promise<string | null> {
    const ai = this.getClient();

    try {
      const config: any = {
        imageConfig: {
          aspectRatio: params.aspectRatio,
        }
      };

      if (params.model === 'gemini-3-pro-image-preview' && params.imageSize) {
        config.imageConfig.imageSize = params.imageSize;
        if (params.searchGrounding) {
          config.tools = [{ googleSearch: {} }];
        }
      }

      const response = await ai.models.generateContent({
        model: params.model,
        contents: {
          parts: [{ text: params.prompt }],
        },
        config,
      });

      // Find the image part in response parts
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }

      return null;
    } catch (error) {
      console.error("Image generation failed:", error);
      throw error;
    }
  }

  static async checkApiKey(): Promise<boolean> {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      return await (window as any).aistudio.hasSelectedApiKey();
    }
    return true; // Default to true if environment doesn't support the helper
  }

  static async openKeySelector() {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
    }
  }
}
