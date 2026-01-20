
import React from 'react';
import { STYLE_PRESETS, ASPECT_RATIOS } from '../constants';
import { ModelType, AspectRatio, StylePreset } from '../types';

interface SidebarProps {
  model: ModelType;
  setModel: (m: ModelType) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (a: AspectRatio) => void;
  selectedStyle: StylePreset;
  setSelectedStyle: (s: StylePreset) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  prompt: string;
  setPrompt: (p: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  model, setModel, aspectRatio, setAspectRatio,
  selectedStyle, setSelectedStyle, isGenerating,
  onGenerate, prompt, setPrompt, isOpen, onClose
}) => {
  return (
    <>
      <div className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      
      <div className={`fixed lg:relative inset-y-0 left-0 w-full max-w-[320px] glass-panel z-50 flex flex-col transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-black">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">Banana<span className="text-yellow-500">Flow</span></h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Creative Lab v4.0</p>
            </div>
          </div>

          <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
            <section>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Select Engine</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'gemini-2.5-flash-image', label: 'Flash Speed', sub: 'Fast & Efficient' },
                  { id: 'gemini-3-pro-image-preview', label: 'Pro Quality', sub: 'High Fidelity' }
                ].map(m => (
                  <button key={m.id} onClick={() => setModel(m.id as ModelType)} className={`p-4 rounded-2xl text-left border-2 transition-all ${model === m.id ? 'bg-yellow-500 border-yellow-400 text-black' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}>
                    <div className="font-bold text-xs uppercase tracking-wider">{m.label}</div>
                    <div className={`text-[10px] ${model === m.id ? 'text-black/60' : 'text-gray-500'}`}>{m.sub}</div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Composition</h3>
              <div className="grid grid-cols-5 gap-2">
                {ASPECT_RATIOS.map(ar => (
                  <button key={ar.value} onClick={() => setAspectRatio(ar.value)} className={`aspect-square rounded-xl border flex items-center justify-center transition-all ${aspectRatio === ar.value ? 'bg-yellow-500 border-yellow-400 text-black' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ar.icon}/></svg>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Mood Preset</h3>
              <div className="grid grid-cols-2 gap-2">
                {STYLE_PRESETS.map(s => (
                  <button key={s.id} onClick={() => setSelectedStyle(s)} className={`p-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider text-center transition-all ${selectedStyle.id === s.id ? 'bg-yellow-500 border-yellow-400 text-black' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}>
                    {s.name}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Creative Prompt</h3>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your vision..." className="w-full bg-white/5 border-2 border-white/5 rounded-2xl p-4 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50 min-h-[120px] resize-none" />
            </section>
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-white/5 bg-black/20">
          <button onClick={onGenerate} disabled={isGenerating || !prompt.trim()} className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 ${isGenerating ? 'bg-white/10 text-gray-500' : 'bg-yellow-500 text-black hover:bg-yellow-400 active:scale-95 shadow-[0_10px_30px_rgba(234,179,8,0.2)]'}`}>
            {isGenerating ? <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div> : 'Start Workflow'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
