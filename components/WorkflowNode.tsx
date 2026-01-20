
import React from 'react';

interface WorkflowNodeProps {
  title: string;
  icon: React.ReactNode;
  status: 'idle' | 'active' | 'success';
  description: string;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ title, icon, status, description }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] animate-pulse';
      case 'success': return 'border-green-500';
      default: return 'border-[#333]';
    }
  };

  return (
    <div className={`bg-[#111] border-2 rounded-xl p-4 w-56 transition-all duration-500 ${getStatusColor()}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${status === 'active' ? 'bg-yellow-500 text-black' : 'bg-[#222] text-gray-400'}`}>
          {icon}
        </div>
        <h4 className="text-sm font-bold text-gray-200">{title}</h4>
      </div>
      <p className="text-[10px] text-gray-500 leading-tight">{description}</p>
      <div className="mt-3 flex justify-between">
        <div className="w-2 h-2 rounded-full bg-[#222]"></div>
        <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-[#222]'}`}></div>
      </div>
    </div>
  );
};

export default WorkflowNode;
