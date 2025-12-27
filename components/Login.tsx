
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Lock, User, LogIn, Sparkles, Phone, Search, ArrowLeft, KeyRound } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
  onSignupClick: () => void;
  storedProfile?: UserProfile;
}

type ViewMode = 'login' | 'findId' | 'findPw';

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSignupClick, storedProfile }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  
  // Login States
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Find States
  const [findName, setFindName] = useState('');
  const [findPhone, setFindPhone] = useState('');
  const [findIdInput, setFindIdInput] = useState('');
  const [searchResult, setSearchResult] = useState<{ success: boolean; message: string } | null>(null);

  const resetFindStates = () => {
    setFindName('');
    setFindPhone('');
    setFindIdInput('');
    setSearchResult(null);
  };

  const handleModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    resetFindStates();
    setLoginError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!storedProfile) {
      setLoginError('등록된 회원이 없습니다. 회원가입을 먼저 진행해주세요.');
      return;
    }

    if (userId === storedProfile.userId && password === storedProfile.password) {
      onLoginSuccess();
    } else {
      setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleFindId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storedProfile) {
      setSearchResult({ success: false, message: '등록된 회원 정보가 없습니다.' });
      return;
    }
    
    if (storedProfile.name === findName && storedProfile.phoneNumber === findPhone) {
      setSearchResult({ success: true, message: `회원님의 아이디는 [ ${storedProfile.userId} ] 입니다.` });
    } else {
      setSearchResult({ success: false, message: '입력하신 정보와 일치하는 회원을 찾을 수 없습니다.' });
    }
  };

  const handleFindPw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storedProfile) {
      setSearchResult({ success: false, message: '등록된 회원 정보가 없습니다.' });
      return;
    }

    if (storedProfile.userId === findIdInput && storedProfile.phoneNumber === findPhone) {
      setSearchResult({ success: true, message: `회원님의 비밀번호는 [ ${storedProfile.password} ] 입니다.` });
    } else {
      setSearchResult({ success: false, message: '입력하신 정보와 일치하는 회원을 찾을 수 없습니다.' });
    }
  };

  // 렌더링 헬퍼: 입력 필드
  const renderInput = (
    icon: React.ElementType, 
    placeholder: string, 
    value: string, 
    onChange: (val: string) => void, 
    type: string = 'text'
  ) => (
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
        {React.createElement(icon, { size: 20 })}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition-all font-semibold text-slate-700"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="text-center mb-10 relative">
          {viewMode !== 'login' && (
            <button 
              onClick={() => handleModeChange('login')}
              className="absolute left-0 top-0 p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            {viewMode === 'login' ? <Sparkles className="text-emerald-600 w-10 h-10" /> : <Search className="text-emerald-600 w-10 h-10" />}
          </div>
          
          <h1 className="text-3xl font-black text-slate-800 mb-2">
            {viewMode === 'login' ? 'New Life' : viewMode === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}
          </h1>
          <p className="text-slate-500 text-sm">
            {viewMode === 'login' ? '평신도 신앙생활 가이드' : '등록된 정보를 입력해주세요'}
          </p>
        </div>

        {/* Login View */}
        {viewMode === 'login' && (
          <>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                {renderInput(User, "아이디", userId, setUserId)}
                {renderInput(Lock, "비밀번호", password, setPassword, "password")}
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-500 text-xs font-bold text-center">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                로그인 <LogIn size={20} />
              </button>
            </form>

            <div className="mt-6 flex justify-center gap-4 text-sm font-bold text-slate-400">
              <button onClick={() => handleModeChange('findId')} className="hover:text-slate-600 transition-colors">아이디 찾기</button>
              <span className="w-px bg-slate-200 h-4 self-center"></span>
              <button onClick={() => handleModeChange('findPw')} className="hover:text-slate-600 transition-colors">비밀번호 찾기</button>
            </div>

            <div className="mt-8 text-center pt-8 border-t border-slate-100">
              <p className="text-slate-400 text-sm">아직 계정이 없으신가요?</p>
              <button 
                onClick={onSignupClick}
                className="mt-2 text-emerald-600 font-bold hover:underline"
              >
                회원가입하기
              </button>
            </div>
          </>
        )}

        {/* Find ID View */}
        {viewMode === 'findId' && (
          <form onSubmit={handleFindId} className="space-y-6">
            <div className="space-y-4">
              {renderInput(User, "성명", findName, setFindName)}
              {renderInput(Phone, "전화번호", findPhone, setFindPhone, "tel")}
            </div>

            {searchResult && (
              <div className={`p-4 rounded-xl text-sm font-bold text-center ${searchResult.success ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                {searchResult.message}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              아이디 확인 <Search size={20} />
            </button>
          </form>
        )}

        {/* Find Password View */}
        {viewMode === 'findPw' && (
          <form onSubmit={handleFindPw} className="space-y-6">
            <div className="space-y-4">
              {renderInput(User, "아이디", findIdInput, setFindIdInput)}
              {renderInput(Phone, "전화번호", findPhone, setFindPhone, "tel")}
            </div>

            {searchResult && (
              <div className={`p-4 rounded-xl text-sm font-bold text-center ${searchResult.success ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                {searchResult.message}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              비밀번호 확인 <KeyRound size={20} />
            </button>
          </form>
        )}

      </div>
      
      {viewMode === 'login' && (
        <p className="mt-8 text-[10px] text-slate-400 text-center max-w-xs leading-relaxed">
          PC 버전을 이용하시려면 브라우저 설정에서<br/>
          '앱 설치' 또는 '홈 화면에 추가'를 선택하세요.
        </p>
      )}
    </div>
  );
};

export default Login;
