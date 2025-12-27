
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ViewType, DailyData, AppData, UserProfile } from './types';
import { getDailyData, saveDailyData, getAppData, saveProfile } from './services/storage';
import Navigation from './components/Navigation';
import Home from './components/Home';
import DailyChecklist from './components/DailyChecklist';
import Login from './components/Login';
import Signup from './components/Signup';
import { Calendar, ChevronLeft, ChevronRight, Loader2, ShieldAlert } from 'lucide-react';

// 성능 최적화: 지연 로딩
const JournalSection = lazy(() => import('./components/JournalSection'));
const VideoSection = lazy(() => import('./components/VideoSection'));
const StatsSection = lazy(() => import('./components/StatsSection'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const UserProfileView = lazy(() => import('./components/UserProfileView'));

const SectionLoader = () => (
  <div className="flex flex-col items-center justify-center py-32 text-slate-400">
    <Loader2 className="w-10 h-10 animate-spin mb-4 text-emerald-500" />
    <p className="text-sm font-medium">데이터를 구성하고 있습니다...</p>
  </div>
);

const App: React.FC = () => {
  const [appData, setAppData] = useState<AppData>(getAppData());
  const [currentView, setCurrentView] = useState<ViewType>('login'); // 초기 화면은 로그인
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyData, setDailyData] = useState<DailyData>(getDailyData(selectedDate));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. 초기 로더 제거
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 400);
    }
  }, []);

  useEffect(() => {
    setDailyData(getDailyData(selectedDate));
  }, [selectedDate]);

  const handleUpdate = (newData: DailyData) => {
    setDailyData(newData);
    saveDailyData(newData);
  };

  const handleSignupComplete = (profile: UserProfile) => {
    saveProfile(profile);
    setAppData({ ...appData, profile });
    setCurrentView('login');
    alert('회원가입이 완료되었습니다. 로그인해주세요.');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    saveProfile(updatedProfile);
    setAppData({ ...appData, profile: updatedProfile });
  };

  const toggleAdmin = () => {
    const pw = prompt("관리자 암호를 입력하세요.");
    if (pw === "7777") {
      setCurrentView('admin');
    } else {
      alert("권한이 없습니다.");
    }
  };

  const changeDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const formattedDate = new Intl.DateTimeFormat('ko-KR', { 
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' 
  }).format(new Date(selectedDate));

  // --- View Routing ---

  if (currentView === 'login') {
    return (
      <Login 
        onLoginSuccess={handleLoginSuccess} 
        onSignupClick={() => setCurrentView('signup')} 
        storedProfile={appData.profile}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <Signup 
        onComplete={handleSignupComplete} 
        onBack={() => setCurrentView('login')} 
      />
    );
  }

  if (currentView === 'admin') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <AdminDashboard onBack={() => setCurrentView('home')} />
      </Suspense>
    );
  }

  // --- Main App Layout ---

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Dynamic Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 
            onClick={() => setCurrentView('home')} 
            className="text-2xl font-black text-emerald-600 cursor-pointer"
          >
            뉴 라이프
          </h1>
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <Calendar size={14} className="text-slate-500" />
              <span className="text-[11px] font-bold text-slate-700">{formattedDate}</span>
            </div>
            <button onClick={toggleAdmin} className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
              <ShieldAlert size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-2">
        {(currentView === 'today' || currentView === 'journals') && (
          <div className="flex items-center justify-center gap-6 my-6">
            <button onClick={() => changeDate(-1)} className="p-2 text-slate-400"><ChevronLeft size={20} /></button>
            <span className="text-sm font-black text-slate-600">{selectedDate}</span>
            <button onClick={() => changeDate(1)} className="p-2 text-slate-400"><ChevronRight size={20} /></button>
          </div>
        )}

        <Suspense fallback={<SectionLoader />}>
          {currentView === 'home' && <Home date={selectedDate} onNavigate={setCurrentView} />}
          {currentView === 'today' && <DailyChecklist data={dailyData} onUpdate={handleUpdate} />}
          {currentView === 'journals' && <JournalSection data={dailyData} onUpdate={handleUpdate} />}
          {currentView === 'video' && <VideoSection />}
          {currentView === 'stats' && <StatsSection />}
          {currentView === 'user' && appData.profile && (
            <UserProfileView 
              profile={appData.profile} 
              onUpdate={handleProfileUpdate}
              onLogout={handleLogout}
            />
          )}
        </Suspense>
      </main>

      <Navigation currentView={currentView} setView={setCurrentView} />
    </div>
  );
};

export default App;
