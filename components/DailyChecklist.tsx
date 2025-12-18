
import React from 'react';
import { DailyData, DailyChecklist as IChecklist } from '../types';
import { CHECKLIST_ITEMS } from '../constants';
import { Check } from 'lucide-react';

interface DailyChecklistProps {
  data: DailyData;
  onUpdate: (data: DailyData) => void;
}

const DailyChecklist: React.FC<DailyChecklistProps> = ({ data, onUpdate }) => {
  const toggleItem = (itemId: keyof IChecklist) => {
    const newData: DailyData = {
      ...data,
      checklist: {
        ...data.checklist,
        [itemId]: !data.checklist[itemId],
      },
    };
    onUpdate(newData);
  };

  const completedCount = Object.values(data.checklist).filter(Boolean).length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">오늘의 생활 체크</h2>
            <p className="text-slate-500 text-sm">성실함이 기적을 만듭니다.</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-emerald-600">{progressPercent}%</span>
            <p className="text-xs text-slate-400">{completedCount} / {totalCount}</p>
          </div>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CHECKLIST_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id as keyof IChecklist)}
            className={`flex items-center gap-3 p-4 rounded-2xl text-left border transition-all duration-200 ${
              data.checklist[item.id as keyof IChecklist]
                ? 'bg-emerald-50 border-emerald-200 shadow-sm'
                : 'bg-white border-slate-100'
            }`}
          >
            <div className={`p-2 rounded-xl ${
              data.checklist[item.id as keyof IChecklist] ? 'bg-white' : 'bg-slate-50'
            }`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${
                data.checklist[item.id as keyof IChecklist] ? 'text-emerald-900' : 'text-slate-700'
              }`}>
                {item.label}
              </p>
            </div>
            {data.checklist[item.id as keyof IChecklist] && (
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DailyChecklist;
