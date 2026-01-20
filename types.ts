
export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
export type ImageSize = '1K' | '2K' | '4K';
export type ModelType = 'gemini-2.5-flash-image' | 'gemini-3-pro-image-preview';

export interface StylePreset {
  id: string;
  name: string;
  prompt: string;
  negativePrompt?: string;
  previewColor: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  config: {
    model: ModelType;
    aspectRatio: AspectRatio;
    style: string;
  };
}

export interface WorkflowNode {
  id: string;
  type: 'prompt' | 'style' | 'config' | 'output';
  data: any;
  position: { x: number; y: number };
}
