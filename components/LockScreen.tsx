import React, { useState } from 'react';
import { Lock, LogIn, Sparkles } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
  storedPassword?: string;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, storedPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === storedPassword) {
      onUnlock();
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Sparkles className="text-emerald-600 w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-black text-slate-800 mb-2">
            New Life
          </h1>
          <p className="text-slate-500 text-sm">
            평신도 신앙생활 가이드
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition-all font-semibold text-slate-700"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-500 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            시작하기 <LogIn size={20} />
          </button>
        </form>

        <p className="mt-8 text-[10px] text-slate-400 text-center leading-relaxed">
          비밀번호를 잊어버리셨다면<br/>
          데이터를 초기화해야 합니다.
        </p>
      </div>
    </div>
  );
};

export default LockScreen;
