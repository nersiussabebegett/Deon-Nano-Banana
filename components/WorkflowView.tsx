
import React from 'react';

interface WorkflowViewProps {
  status: 'idle' | 'trigger' | 'style' | 'api' | 'output';
  model: string;
  style: string;
}

const Node: React.FC<{ active: boolean; done: boolean; title: string; icon: React.ReactNode }> = ({ active, done, title, icon }) => (
  <div className={`relative flex flex-col items-center transition-all duration-500 ${active ? 'scale-110' : 'scale-100'}`}>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
      active ? 'bg-yellow-500 border-yellow-400 text-black shadow-[0_0_25px_rgba(234,179,8,0.4)]' : 
      done ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-white/5 border-white/10 text-gray-500'
    }`}>
      {icon}
    </div>
    <span className={`mt-3 text-[10px] font-bold uppercase tracking-widest ${active ? 'text-yellow-500' : 'text-gray-500'}`}>{title}</span>
  </div>
);

const Connector: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="flex-1 min-w-[30px] h-[2px] bg-white/5 relative overflow-hidden">
    {active && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-full animate-[shimmer_1.5s_infinite]" style={{backgroundSize: '200% 100%'}}></div>}
  </div>
);

const WorkflowView: React.FC<WorkflowViewProps> = ({ status, model, style }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 glass-panel rounded-3xl flex items-center justify-between">
      <Node 
        title="Trigger" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
        active={status === 'trigger'}
        done={['style', 'api', 'output'].includes(status)}
      />
      <Connector active={['trigger', 'style'].includes(status)} />
      <Node 
        title="Styling" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>}
        active={status === 'style'}
        done={['api', 'output'].includes(status)}
      />
      <Connector active={['style', 'api'].includes(status)} />
      <Node 
        title="GenAI" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>}
        active={status === 'api'}
        done={['output'].includes(status)}
      />
      <Connector active={['api', 'output'].includes(status)} />
      <Node 
        title="Output" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
        active={status === 'output'}
        done={false}
      />
    </div>
  );
};

export default WorkflowView;
