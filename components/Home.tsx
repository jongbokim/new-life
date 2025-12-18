
import React from 'react';
import { ViewType } from '../types';
import { CheckSquare, Book, Play, BarChart2, Quote } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: ViewType) => void;
  date: string;
}

const Home: React.FC<HomeProps> = ({ onNavigate, date }) => {
  const menuItems = [
    { id: 'today', label: '체크리스트', icon: <CheckSquare className="w-8 h-8" />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'journals', label: '기록장', icon: <Book className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600' },
    { id: 'video', label: '영상묵상', icon: <Play className="w-8 h-8" />, color: 'bg-red-100 text-red-600' },
    { id: 'stats', label: '통계', icon: <BarChart2 className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600' },
  ];

  const formattedDate = new Intl.DateTimeFormat('ko-KR', { 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  }).format(new Date(date));

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-180px)] py-12 px-6">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-emerald-600 tracking-tighter mb-2">New Life</h1>
        <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px]">Layman Faith Check-up</p>
      </div>

      {/* Bible Verse Section */}
      <div className="flex flex-col items-center max-w-xs text-center px-4">
        <Quote className="w-6 h-6 text-emerald-200 mb-4 rotate-180" />
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          "내가 너와 함께 있어 네가 어디로 가든지 너를 지키며 너를 이끌어 이 땅으로 돌아오게 할지라"
        </p>
        <p className="text-[11px] text-emerald-500 mt-2 font-bold">(창세기 28:15)</p>
      </div>

      {/* Date & Menu Section */}
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Today</p>
          <h2 className="text-xl font-bold text-slate-800">{formattedDate}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewType)}
              className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <div className={`p-4 rounded-2xl mb-3 transition-colors ${item.color} group-hover:scale-110 duration-200`}>
                {item.icon}
              </div>
              <span className="text-sm font-bold text-slate-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
