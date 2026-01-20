
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ImageCard from './components/ImageCard';
import WorkflowView from './components/WorkflowView';
import { GeminiService } from './services/geminiService';
import { ModelType, AspectRatio, StylePreset, GeneratedImage } from './types';
import { STYLE_PRESETS } from './constants';

const App: React.FC = () => {
  const [model, setModel] = useState<ModelType>('gemini-2.5-flash-image');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [selectedStyle, setSelectedStyle] = useState<StylePreset>(STYLE_PRESETS[0]);
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'workflow' | 'gallery'>('canvas');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState<'idle' | 'trigger' | 'style' | 'api' | 'output'>('idle');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setError(null);
    setIsSidebarOpen(false);
    
    if (model === 'gemini-3-pro-image-preview') {
      const hasKey = await GeminiService.checkApiKey();
      if (!hasKey) {
        await GeminiService.openKeySelector();
        return;
      }
    }

    setIsGenerating(true);
    setViewMode('workflow');
    setWorkflowStatus('trigger');

    try {
      await new Promise(r => setTimeout(r, 600));
      setWorkflowStatus('style');
      const finalPrompt = `[Style: ${selectedStyle.prompt}] [Subject: ${prompt}] [Quality: Cinematic, Masterpiece, 8k]`;
      
      await new Promise(r => setTimeout(r, 600));
      setWorkflowStatus('api');

      const imageUrl = await GeminiService.generateImage({
        model,
        prompt: finalPrompt,
        aspectRatio,
      });

      if (imageUrl) {
        const newImage: GeneratedImage = {
          id: Math.random().toString(36).substring(7),
          url: imageUrl,
          prompt: prompt,
          timestamp: Date.now(),
          config: { model, aspectRatio, style: selectedStyle.name }
        };
        setWorkflowStatus('output');
        await new Promise(r => setTimeout(r, 800));
        setHistory(prev => [newImage, ...prev]);
        setViewMode('canvas');
      }
    } catch (err: any) {
      setError(err.message || 'Workflow execution failed.');
      setViewMode('canvas');
    } finally {
      setIsGenerating(false);
      setWorkflowStatus('idle');
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        model={model}
        setModel={setModel}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        prompt={prompt}
        setPrompt={setPrompt}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Modern Navbar */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-12 glass-panel !border-0 !border-b !bg-black/40 z-30">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-white/5 rounded-2xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/></svg>
            </button>
            <nav className="flex items-center bg-white/5 p-1.5 rounded-2xl">
              {['canvas', 'workflow', 'gallery'].map((mode) => (
                <button 
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${viewMode === mode ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-gray-500 hover:text-white'}`}
                >
                  {mode}
                </button>
              ))}
            </nav>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">
              API STATUS: <span className="text-green-500">LIVE</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content View */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 relative">
          {viewMode === 'canvas' && (
            <div className="max-w-6xl mx-auto">
              {error && <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs text-center">{error}</div>}
              
              {!history[0] && !isGenerating ? (
                <div className="h-[60vh] flex flex-col items-center justify-center space-y-8 text-center">
                  <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center border border-white/10">
                    <svg className="w-12 h-12 text-yellow-500 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Enter the Creative Void</h2>
                    <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto font-medium">Configure your workflow nodes and let Gemini transform your thoughts into reality.</p>
                  </div>
                  <button onClick={() => setIsSidebarOpen(true)} className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Setup Workflow</button>
                </div>
              ) : (
                <div className="space-y-12">
                   {history[0] && (
                     <div className="glass-panel p-2 rounded-[40px] overflow-hidden group">
                        <img src={history[0].url} className="w-full h-auto rounded-[32px] shadow-2xl transition-transform duration-1000 group-hover:scale-105" alt="Masterpiece" />
                        <div className="p-8 flex items-center justify-between">
                           <div>
                              <h3 className="text-lg font-black tracking-tight">{history[0].prompt}</h3>
                              <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">{history[0].config.style} • {history[0].config.aspectRatio}</p>
                           </div>
                           <button onClick={() => {const a = document.createElement('a'); a.href = history[0].url; a.download = 'art.png'; a.click();}} className="p-4 bg-yellow-500 rounded-2xl text-black hover:scale-110 active:scale-95 transition-all">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                           </button>
                        </div>
                     </div>
                   )}
                </div>
              )}
            </div>
          )}

          {viewMode === 'workflow' && (
            <div className="h-full flex flex-col items-center justify-center">
               <WorkflowView status={workflowStatus} model={model} style={selectedStyle.name} />
               <div className="mt-12 text-center max-w-lg">
                  <h4 className="text-sm font-black uppercase tracking-widest text-yellow-500 mb-2">Automated Execution Pipeline</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">Aplikasi ini mensimulasikan logika n8n node-based. Setiap langkah memvalidasi parameter input sebelum diteruskan ke Gemini Image Engine.</p>
               </div>
            </div>
          )}

          {viewMode === 'gallery' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {history.map(img => (
                  <ImageCard 
                    key={img.id} 
                    image={img} 
                    onDownload={(url, name) => {const a = document.createElement('a'); a.href = url; a.download = name; a.click();}}
                    onRemove={(id) => setHistory(h => h.filter(i => i.id !== id))}
                  />
               ))}
            </div>
          )}
        </div>

        {/* Mobile Action Bar */}
        <div className="lg:hidden h-20 glass-panel !bg-black/80 flex items-center justify-around px-6 border-t border-white/5">
           <button onClick={() => setViewMode('canvas')} className={`p-3 rounded-2xl ${viewMode === 'canvas' ? 'text-yellow-500 bg-yellow-500/10' : 'text-gray-500'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/></svg>
           </button>
           <button onClick={() => setIsSidebarOpen(true)} className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-xl shadow-yellow-500/20 transform -translate-y-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
           </button>
           <button onClick={() => setViewMode('gallery')} className={`p-3 rounded-2xl ${viewMode === 'gallery' ? 'text-yellow-500 bg-yellow-500/10' : 'text-gray-500'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
           </button>
        </div>
      </main>
    </div>
  );
};

export default App;
