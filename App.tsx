
import React, { useState, useEffect } from 'react';
import { ViewType, DailyData } from './types';
import { getDailyData, saveDailyData } from './services/storage';
import Navigation from './components/Navigation';
import Home from './components/Home';
import DailyChecklist from './components/DailyChecklist';
import JournalSection from './components/JournalSection';
import VideoSection from './components/VideoSection';
import StatsSection from './components/StatsSection';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyData, setDailyData] = useState<DailyData>(getDailyData(selectedDate));

  useEffect(() => {
    setDailyData(getDailyData(selectedDate));
  }, [selectedDate]);

  const handleUpdate = (newData: DailyData) => {
    setDailyData(newData);
    saveDailyData(newData);
  };

  const changeDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const formattedDate = new Intl.DateTimeFormat('ko-KR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  }).format(new Date(selectedDate));

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Dynamic Header */}
      {currentView !== 'home' && (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 px-6 py-4 animate-in fade-in slide-in-from-top-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 
              onClick={() => setCurrentView('home')} 
              className="text-2xl font-black text-emerald-600 cursor-pointer hover:opacity-80 transition-opacity"
            >
              뉴 라이프
            </h1>
            <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <Calendar size={16} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-700">{formattedDate}</span>
            </div>
          </div>
        </header>
      )}

      {/* Content Area */}
      <main className="max-w-4xl mx-auto px-6 pt-6">
        {/* Date Selector for Daily Views (Today and Journals) */}
        {(currentView === 'today' || currentView === 'journals') && (
          <div className="flex items-center justify-center gap-6 mb-8 animate-in fade-in duration-700">
            <button 
              onClick={() => changeDate(-1)}
              className="p-2 hover:bg-white rounded-full transition-colors text-slate-400"
            >
              <ChevronLeft />
            </button>
            <span className="text-sm font-black text-slate-600">
              {selectedDate === new Date().toISOString().split('T')[0] ? '오늘' : selectedDate}
            </span>
            <button 
              onClick={() => changeDate(1)}
              className="p-2 hover:bg-white rounded-full transition-colors text-slate-400"
            >
              <ChevronRight />
            </button>
          </div>
        )}

        <div className="transition-all duration-500">
          {currentView === 'home' && (
            <div className="animate-in fade-in zoom-in-95 duration-700">
              <Home date={selectedDate} onNavigate={setCurrentView} />
            </div>
          )}
          {currentView === 'today' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <DailyChecklist data={dailyData} onUpdate={handleUpdate} />
            </div>
          )}
          {currentView === 'journals' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <JournalSection data={dailyData} onUpdate={handleUpdate} />
            </div>
          )}
          {currentView === 'video' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <VideoSection />
            </div>
          )}
          {currentView === 'stats' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <StatsSection />
            </div>
          )}
        </div>
      </main>

      <Navigation currentView={currentView} setView={setCurrentView} />
    </div>
  );
};

export default App;
