
import React, { useState } from 'react';
import { UserProfile, Gender, Region } from '../types';
import { User, MapPin, Check } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [region, setRegion] = useState<Region>('서울');

  const regions: Region[] = ['서울', '경기', '인천', '강원', '충청', '전라', '경상', '제주', '해외'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProfile: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      userId: '',
      password: '',
      name: name.trim(),
      age: '',
      affiliation: '',
      phoneNumber: '',
      gender,
      region,
      joinedAt: new Date().toISOString(),
    };
    onComplete(newProfile);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-[60] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="text-emerald-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800">환영합니다!</h2>
          <p className="text-slate-500 text-sm mt-2">나만의 신앙 기록을 시작하기 위해<br/>기본 정보를 알려주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">이름/닉네임</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="베드로"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-emerald-100 outline-none transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">성별</label>
            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-4 rounded-2xl font-bold border transition-all ${
                    gender === g 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100' 
                      : 'bg-white border-slate-100 text-slate-400'
                  }`}
                >
                  {g === 'male' ? '남성' : '여성'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">지역</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 focus:ring-4 focus:ring-emerald-100 outline-none transition-all font-semibold appearance-none"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            시작하기 <Check />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
