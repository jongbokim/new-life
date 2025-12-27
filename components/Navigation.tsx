
import React from 'react';
import { Home, CheckSquare, Book, Play, BarChart2, UserCircle } from 'lucide-react';
import { ViewType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', label: '홈', icon: <Home /> },
    { id: 'today', label: '체크', icon: <CheckSquare /> },
    { id: 'journals', label: '기록', icon: <Book /> },
    { id: 'video', label: '묵상', icon: <Play /> },
    { id: 'stats', label: '통계', icon: <BarChart2 /> },
    { id: 'user', label: '사용자', icon: <UserCircle /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] pb-safe">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as ViewType)}
          className={`flex flex-col items-center gap-1 p-2 transition-all min-w-[3.5rem] ${
            currentView === item.id 
              ? 'text-emerald-600 -translate-y-1' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {React.cloneElement(item.icon as React.ReactElement<any>, { 
            size: 24, 
            strokeWidth: currentView === item.id ? 2.5 : 2,
            fill: currentView === item.id && item.id !== 'user' ? 'currentColor' : 'none',
            className: currentView === item.id ? 'opacity-100' : 'opacity-80'
          })}
          <span className="text-[10px] font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
