
import React, { useState } from 'react';
import { UserProfile, Gender, Region } from '../types';
import { ArrowLeft, Check, MapPin, User, Hash, Briefcase, Phone, Lock, Eye, EyeOff } from 'lucide-react';

interface SignupProps {
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

// InputField를 외부로 분리하여 불필요한 리렌더링 및 포커스 분실 방지
interface InputFieldProps {
  icon: React.ElementType;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition-all font-semibold"
      />
    </div>
  </div>
);

const Signup: React.FC<SignupProps> = ({ onComplete, onBack }) => {
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    gender: 'male',
    region: '서울'
  });
  const [showPw, setShowPw] = useState(false);

  const regions: Region[] = ['서울', '경기', '인천', '강원', '충청', '전라', '경상', '제주', '해외'];

  const handleChange = (key: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 유효성 검사
    if (!formData.userId || !formData.password || !formData.name) {
      alert('필수 정보를 입력해주세요.');
      return;
    }

    const newProfile: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      userId: formData.userId!,
      password: formData.password!,
      name: formData.name!,
      age: formData.age || '',
      affiliation: formData.affiliation || '',
      phoneNumber: formData.phoneNumber || '',
      gender: formData.gender as Gender,
      region: formData.region as Region,
      joinedAt: new Date().toISOString(),
    };
    onComplete(newProfile);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-50 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="text-slate-800" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">회원가입</h2>
      </div>

      <div className="flex-1 p-6 pb-10 max-w-lg mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 계정 정보 섹션 */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-600 mb-2">계정 정보</h3>
            <InputField 
              icon={User} 
              label="아이디" 
              value={formData.userId || ''} 
              onChange={(val) => handleChange('userId', val)} 
              placeholder="사용할 아이디 입력" 
            />
            
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={formData.password || ''}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition-all font-semibold"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 개인 정보 섹션 */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-600 mb-2">개인 정보</h3>
            <InputField 
              icon={User} 
              label="성명" 
              value={formData.name || ''} 
              onChange={(val) => handleChange('name', val)} 
              placeholder="홍길동" 
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField 
                icon={Hash} 
                label="나이" 
                type="number" 
                value={formData.age || ''} 
                onChange={(val) => handleChange('age', val)} 
                placeholder="30" 
              />
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">성별</label>
                <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-200">
                  {(['male', 'female'] as Gender[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleChange('gender', g)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        formData.gender === g 
                          ? 'bg-white text-emerald-600 shadow-sm' 
                          : 'text-slate-400'
                      }`}
                    >
                      {g === 'male' ? '남성' : '여성'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <InputField 
              icon={Briefcase} 
              label="소속" 
              value={formData.affiliation || ''} 
              onChange={(val) => handleChange('affiliation', val)} 
              placeholder="○○교회 / 청년부" 
            />
            <InputField 
              icon={Phone} 
              label="전화번호" 
              type="tel" 
              value={formData.phoneNumber || ''} 
              onChange={(val) => handleChange('phoneNumber', val)} 
              placeholder="010-0000-0000" 
            />
            
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">지역</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  value={formData.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition-all font-semibold appearance-none"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            가입완료 <Check size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
