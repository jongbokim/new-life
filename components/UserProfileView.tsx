
import React, { useState, useRef } from 'react';
import { UserProfile, Region, Gender } from '../types';
import { User, MapPin, Hash, Briefcase, Phone, Save, LogOut, Download, Upload, FileJson, AlertCircle } from 'lucide-react';

interface UserProfileViewProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  onLogout: () => void;
}

interface InputFieldProps {
  icon: React.ElementType;
  label: string;
  field: keyof UserProfile;
  disabled: boolean;
  type?: string;
  value: string;
  isEditing: boolean;
  onChange: (val: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, label, field, disabled, type = "text", value, isEditing, onChange }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
      <Icon size={12} /> {label}
    </label>
    {isEditing && !disabled ? (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    ) : (
      <p className="text-base font-bold text-slate-800 px-1 truncate">
        {value || '-'}
      </p>
    )}
  </div>
);

const UserProfileView: React.FC<UserProfileViewProps> = ({ profile, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const regions: Region[] = ['서울', '경기', '인천', '강원', '충청', '전라', '경상', '제주', '해외'];

  const handleChange = (key: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
    alert('정보가 수정되었습니다.');
  };

  // 데이터 내보내기 (백업)
  const handleExportData = () => {
    try {
      const STORAGE_KEY = 'new_life_app_v2_data';
      const rawData = localStorage.getItem(STORAGE_KEY);
      
      if (!rawData) {
        alert('저장된 데이터가 없습니다.');
        return;
      }

      const blob = new Blob([rawData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // 파일명 생성 (예: NewLife_Backup_2023-10-25.json)
      const date = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `NewLife_Backup_${date}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('데이터 내보내기에 실패했습니다.');
    }
  };

  // 데이터 불러오기 (복원)
  const handleImportClick = () => {
    if (window.confirm('데이터를 복원하면 현재 기록된 모든 데이터가 덮어씌워집니다. 계속하시겠습니까?')) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        // 유효성 검사: JSON 파싱 가능 여부 확인
        const parsed = JSON.parse(json);
        
        if (!parsed.dailyData && !parsed.profile) {
          throw new Error('유효하지 않은 데이터 형식입니다.');
        }

        const STORAGE_KEY = 'new_life_app_v2_data';
        localStorage.setItem(STORAGE_KEY, json);
        
        alert('데이터가 성공적으로 복원되었습니다. 앱을 다시 시작합니다.');
        window.location.reload();
      } catch (error) {
        console.error('Import failed:', error);
        alert('데이터 복원에 실패했습니다. 올바른 백업 파일인지 확인해주세요.');
      }
    };
    reader.readAsText(file);
    // 같은 파일을 다시 선택할 수 있도록 value 초기화
    event.target.value = '';
  };

  return (
    <div className="pb-20 space-y-6">
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white text-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-900/50">
            {profile.name[0]}
          </div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-emerald-400 text-sm font-medium mt-1">{profile.affiliation || '소속 없음'}</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <h3 className="font-bold text-slate-800 text-lg">내 정보</h3>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-xs bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            수정하기
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setFormData(profile);
                setIsEditing(false);
              }}
              className="text-xs bg-slate-100 text-slate-500 px-4 py-2 rounded-xl font-bold"
            >
              취소
            </button>
            <button 
              onClick={handleSave}
              className="text-xs bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold shadow-md shadow-emerald-200 flex items-center gap-1"
            >
              <Save size={12} /> 저장
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField 
          icon={User} 
          label="아이디" 
          field="userId" 
          disabled={true} 
          value={formData.userId}
          isEditing={isEditing}
          onChange={(val) => handleChange('userId', val)}
        />
        <InputField 
          icon={User} 
          label="성명" 
          field="name" 
          disabled={false} 
          value={formData.name}
          isEditing={isEditing}
          onChange={(val) => handleChange('name', val)}
        />
        <InputField 
          icon={Hash} 
          label="나이" 
          field="age" 
          disabled={false} 
          type="number" 
          value={formData.age}
          isEditing={isEditing}
          onChange={(val) => handleChange('age', val)}
        />
        <InputField 
          icon={Briefcase} 
          label="소속" 
          field="affiliation" 
          disabled={false} 
          value={formData.affiliation}
          isEditing={isEditing}
          onChange={(val) => handleChange('affiliation', val)}
        />
        <InputField 
          icon={Phone} 
          label="전화번호" 
          field="phoneNumber" 
          disabled={false} 
          type="tel" 
          value={formData.phoneNumber}
          isEditing={isEditing}
          onChange={(val) => handleChange('phoneNumber', val)}
        />
        
        {/* 지역 선택은 커스텀 처리 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            <MapPin size={12} /> 지역
          </label>
          {isEditing ? (
            <select
              value={formData.region}
              onChange={(e) => handleChange('region', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {regions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          ) : (
             <p className="text-base font-bold text-slate-800 px-1">{formData.region}</p>
          )}
        </div>

         {/* 성별 선택 커스텀 처리 */}
         <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            <User size={12} /> 성별
          </label>
          {isEditing ? (
            <div className="flex bg-slate-50 rounded-lg p-1">
              {(['male', 'female'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => handleChange('gender', g)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                    formData.gender === g ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'
                  }`}
                >
                  {g === 'male' ? '남성' : '여성'}
                </button>
              ))}
            </div>
          ) : (
             <p className="text-base font-bold text-slate-800 px-1">{formData.gender === 'male' ? '남성' : '여성'}</p>
          )}
        </div>
      </div>

      {/* 데이터 백업 관리 섹션 */}
      <div className="pt-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4 px-2">데이터 관리</h3>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl mb-2">
            <AlertCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>PC에 파일로 저장:</strong> 데이터를 잃어버리지 않도록 주기적으로 백업 파일을 다운로드하여 원하는 폴더에 보관하세요.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleExportData}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all group"
            >
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Download size={24} className="text-slate-500 group-hover:text-emerald-500" />
              </div>
              <span className="text-sm font-bold">파일로 내보내기</span>
            </button>

            <button 
              onClick={handleImportClick}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all group"
            >
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Upload size={24} className="text-slate-500 group-hover:text-blue-500" />
              </div>
              <span className="text-sm font-bold">파일 불러오기</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden" 
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button 
          onClick={onLogout}
          className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut size={18} /> 로그아웃
        </button>
      </div>
    </div>
  );
};

export default UserProfileView;
