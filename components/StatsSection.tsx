
import React, { useMemo, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend 
} from 'recharts';
import { getAllData } from '../services/storage';
import { DailyData } from '../types';

type StatsRange = 'week' | 'month' | 'year';

const StatsSection: React.FC = () => {
  const [range, setRange] = useState<StatsRange>('week');
  const allData = useMemo(() => getAllData(), []);

  const statsData = useMemo(() => {
    const sortedDates = Object.keys(allData).sort();
    const now = new Date();
    
    const filteredDates = sortedDates.filter(date => {
      const d = new Date(date);
      if (range === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return d >= weekAgo;
      }
      if (range === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return d >= monthAgo;
      }
      if (range === 'year') {
        const yearAgo = new Date();
        yearAgo.setFullYear(now.getFullYear() - 1);
        return d >= yearAgo;
      }
      return true;
    });

    return filteredDates.map(date => {
      const data = allData[date];
      const completedTasks = Object.values(data.checklist).filter(Boolean).length;
      const bibleChapters = data.bibleLogs.reduce((acc, log) => acc + log.chapterCount, 0);
      const readingPages = data.readingLogs.reduce((acc, log) => acc + log.pages, 0);

      return {
        name: date.slice(-5), // MM-DD
        '완료된 일과': completedTasks,
        '성경(장)': bibleChapters,
        '독서(쪽)': readingPages,
      };
    });
  }, [allData, range]);

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">성장 통계</h2>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {(['week', 'month', 'year'] as StatsRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  range === r 
                    ? 'bg-white text-emerald-600 shadow-sm' 
                    : 'text-slate-400'
                }`}
              >
                {r === 'week' ? '주간' : r === 'month' ? '월간' : '연간'}
              </button>
            ))}
          </div>
        </div>

        {statsData.length > 0 ? (
          <div className="space-y-8">
            <div className="h-64 w-full">
              <h3 className="text-sm font-bold text-slate-600 mb-4">일과 완료 추이</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="완료된 일과" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="h-64 w-full">
              <h3 className="text-sm font-bold text-slate-600 mb-4">성경 및 독서량</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={statsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="성경(장)" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="독서(쪽)" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-xl">
            <p className="text-slate-400 text-sm">데이터가 충분하지 않습니다.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <p className="text-emerald-600 text-xs font-bold mb-1">전체 누적 독서</p>
          <p className="text-2xl font-black text-emerald-900">
            {/* Added explicit type casting for DailyData to fix property access error */}
            {(Object.values(allData) as DailyData[]).reduce((acc, d) => acc + d.readingLogs.reduce((p, l) => p + l.pages, 0), 0)}
            <span className="text-sm font-normal ml-1">쪽</span>
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
          <p className="text-purple-600 text-xs font-bold mb-1">전체 누적 성경</p>
          <p className="text-2xl font-black text-purple-900">
            {/* Added explicit type casting for DailyData to fix property access error */}
            {(Object.values(allData) as DailyData[]).reduce((acc, d) => acc + d.bibleLogs.reduce((p, l) => p + l.chapterCount, 0), 0)}
            <span className="text-sm font-normal ml-1">장</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
