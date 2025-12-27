
import React, { useMemo, useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend 
} from 'recharts';
// Fixed: Corrected imported function name from getAllData to getAllDailyData
import { getAllDailyData } from '../services/storage';
import { DailyData } from '../types';

type StatsRange = 'week' | 'month' | 'year';

const StatsSection: React.FC = () => {
  const [range, setRange] = useState<StatsRange>('week');
  const [allData, setAllData] = useState<Record<string, DailyData>>({});
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log("StatsSection: Fetching data...");
      // Fixed: Updated function call to use getAllDailyData
      const data = getAllDailyData();
      if (data && typeof data === 'object') {
        setAllData(data);
        console.log("StatsSection: Data loaded", Object.keys(data).length, "days found");
      }
      setIsReady(true);
    } catch (e) {
      console.error("StatsSection: Data loading error", e);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
      setIsReady(true);
    }
  }, []);

  const statsData = useMemo(() => {
    try {
      const sortedDates = Object.keys(allData).sort();
      if (sortedDates.length === 0) return [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const filteredDates = sortedDates.filter(dateStr => {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return false;
        d.setHours(0, 0, 0, 0);

        const limitDate = new Date(today);
        if (range === 'week') limitDate.setDate(today.getDate() - 7);
        else if (range === 'month') limitDate.setMonth(today.getMonth() - 1);
        else if (range === 'year') limitDate.setFullYear(today.getFullYear() - 1);
        
        return d >= limitDate;
      });

      return filteredDates.map(date => {
        const data = allData[date];
        const checklist = data?.checklist || {};
        const completedTasks = Object.values(checklist).filter(val => val === true).length;
        
        const bibleChapters = (data?.bibleLogs || []).reduce((acc, log) => acc + (Number(log.chapterCount) || 0), 0);
        const readingPages = (data?.readingLogs || []).reduce((acc, log) => acc + (Number(log.pages) || 0), 0);

        return {
          name: date.slice(5),
          '완료된 일과': completedTasks,
          '성경(장)': bibleChapters,
          '독서(쪽)': readingPages,
        };
      });
    } catch (e) {
      console.error("StatsSection: useMemo processing error", e);
      return [];
    }
  }, [allData, range]);

  const cumulativeStats = useMemo(() => {
    const dataArray = Object.values(allData);
    if (!dataArray.length) return { totalReading: 0, totalBible: 0 };

    const totalReading = dataArray.reduce((acc, d) => 
      acc + (d.readingLogs || []).reduce((p, l) => p + (Number(l.pages) || 0), 0), 0);
    const totalBible = dataArray.reduce((acc, d) => 
      acc + (d.bibleLogs || []).reduce((p, l) => p + (Number(l.chapterCount) || 0), 0), 0);
    
    return { totalReading, totalBible };
  }, [allData]);

  if (!isReady) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-slate-100">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 text-sm">통계 정보를 분석하고 있습니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-[2.5rem] border border-red-100">
        <p className="text-red-600 font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-sm text-red-500 underline">새로고침</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* 요약 카드 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-600 p-6 rounded-[2.5rem] shadow-lg shadow-emerald-100">
          <p className="text-emerald-100 text-[10px] font-bold mb-1 uppercase tracking-widest">누적 독서</p>
          <p className="text-3xl font-black text-white">
            {cumulativeStats.totalReading.toLocaleString()}
            <span className="text-sm font-bold ml-1 opacity-60">P</span>
          </p>
        </div>
        <div className="bg-indigo-600 p-6 rounded-[2.5rem] shadow-lg shadow-indigo-100">
          <p className="text-indigo-100 text-[10px] font-bold mb-1 uppercase tracking-widest">누적 성경</p>
          <p className="text-3xl font-black text-white">
            {cumulativeStats.totalBible.toLocaleString()}
            <span className="text-sm font-bold ml-1 opacity-60">장</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 min-h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800">성장 리포트</h2>
            <p className="text-xs text-slate-400 mt-1">기록의 축적이 삶의 간증이 됩니다.</p>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
            {(['week', 'month', 'year'] as StatsRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`flex-1 sm:flex-none px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                  range === r 
                    ? 'bg-white text-emerald-600 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {r === 'week' ? '주간' : r === 'month' ? '월간' : '연간'}
              </button>
            ))}
          </div>
        </div>

        {statsData.length > 0 ? (
          <div className="space-y-12">
            {/* 일과 완료 */}
            <div className="w-full">
              <h3 className="text-sm font-bold text-slate-600 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
                일과 완료 현황
              </h3>
              <div className="h-64 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    />
                    <Bar dataKey="완료된 일과" fill="#10b981" radius={[6, 6, 0, 0]} barSize={range === 'week' ? 24 : 8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 성경/독서 */}
            <div className="w-full border-t border-slate-50 pt-10">
              <h3 className="text-sm font-bold text-slate-600 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
                지성 및 영성 성장
              </h3>
              <div className="h-64 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={statsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '10px', paddingBottom: '30px' }} />
                    <Line type="monotone" dataKey="성경(장)" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="독서(쪽)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-4">
              <BarChart className="text-slate-200 w-8 h-8" />
            </div>
            <p className="text-slate-500 font-bold">통계 데이터가 없습니다.</p>
            <p className="text-slate-400 text-xs mt-2 px-10 text-center leading-relaxed">
              최근 7일 내에 기록된 활동이 없습니다.<br/>
              오늘의 일과를 먼저 체크해볼까요?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsSection;
