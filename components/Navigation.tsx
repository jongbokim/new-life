
import React from 'react';
import { Home, CheckSquare, Book, Play, BarChart2 } from 'lucide-react';
import { ViewType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', label: '홈', icon: <Home /> },
    { id: 'today', label: '체크리스트', icon: <CheckSquare /> },
    { id: 'journals', label: '기록장', icon: <Book /> },
    { id: 'video', label: '영상묵상', icon: <Play /> },
    { id: 'stats', label: '통계', icon: <BarChart2 /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as ViewType)}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${
            currentView === item.id 
              ? 'text-emerald-600 scale-110' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {React.cloneElement(item.icon as React.ReactElement, { size: 22, strokeWidth: currentView === item.id ? 2.5 : 2 })}
          <span className="text-[9px] font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
