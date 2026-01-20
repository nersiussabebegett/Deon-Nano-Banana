
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageCardProps {
  image: GeneratedImage;
  onDownload: (url: string, filename: string) => void;
  onRemove: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDownload, onRemove }) => {
  return (
    <div className="group relative glass-panel rounded-[32px] overflow-hidden hover:border-yellow-500/50 transition-all duration-500">
      <div className="aspect-square overflow-hidden bg-black/40">
        <img 
          src={image.url} 
          alt={image.prompt}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
        <div className="space-y-4">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest line-clamp-1 italic">"{image.prompt}"</p>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black bg-yellow-500 text-black px-2 py-0.5 rounded uppercase">
              {image.config.aspectRatio}
            </span>
            <span className="text-[9px] font-black bg-white/10 text-white px-2 py-0.5 rounded uppercase">
              {image.config.model.includes('pro') ? 'PRO' : 'FLASH'}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onDownload(image.url, `banana-${image.id}.png`)}
              className="flex-1 bg-white text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-colors"
            >
              Save Asset
            </button>
            <button
              onClick={() => onRemove(image.id)}
              className="bg-red-500/10 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
