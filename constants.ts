
import { StylePreset, AspectRatio } from './types';

export const STYLE_PRESETS: StylePreset[] = [
  { 
    id: 'natural', 
    name: 'Suasana Alami', 
    prompt: 'soft natural lighting, outdoor photography, lush greenery, earthy tones, realistic textures, serene atmosphere, high dynamic range',
    previewColor: 'bg-green-700'
  },
  { 
    id: 'cinematic', 
    name: 'Cinematic', 
    prompt: 'highly detailed cinematic photography, dramatic lighting, anamorphic lens flares, 8k resolution, professional color grading',
    previewColor: 'bg-blue-600'
  },
  { 
    id: 'anime', 
    name: 'Anime', 
    prompt: 'modern high-quality anime style, vibrant colors, clean lines, Makoto Shinkai inspiration, emotive atmosphere',
    previewColor: 'bg-pink-500'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    prompt: 'neon-lit cyberpunk city, rainy streets, futuristic technology, high contrast, glowing accents, synthwave aesthetic',
    previewColor: 'bg-purple-600'
  },
  { 
    id: '3d-render', 
    name: '3D Render', 
    prompt: 'unreal engine 5 render, octanerender style, smooth surfaces, volumetric lighting, raytraced reflections, toy-like appearance',
    previewColor: 'bg-orange-500'
  },
  { 
    id: 'realistic', 
    name: 'Hyper-Realistic', 
    prompt: 'photorealistic portrait, macro detail, skin texture, natural soft lighting, shot on 85mm lens, f/1.8',
    previewColor: 'bg-emerald-600'
  }
];

export const ASPECT_RATIOS: { value: AspectRatio; label: string; icon: string }[] = [
  { value: '1:1', label: '1:1', icon: 'M4 4h16v16H4z' },
  { value: '16:9', label: '16:9', icon: 'M2 6h20v12H2z' },
  { value: '9:16', label: '9:16', icon: 'M6 2h12v20H6z' },
  { value: '4:3', label: '4:3', icon: 'M3 5h18v14H3z' },
  { value: '3:4', label: '3:4', icon: 'M5 3h14v18H5z' },
];
