
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line 
} from 'recharts';
import { Users, Map, Activity, ShieldCheck, ArrowLeft, Globe } from 'lucide-react';
import { getAdminMockStats } from '../services/storage';

interface AdminDashboardProps {
  onBack: () => void;
}

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const stats = useMemo(() => getAdminMockStats(), []);
  
  // 가상의 IP 주소
  const currentIp = "211.231.144.92";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 pb-24 font-sans animate-in fade-in duration-500">
      {/* Admin Header */}
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={onBack}
          className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-right">
          <h1 className="text-xl font-black tracking-tight text-emerald-400 uppercase">Admin Console</h1>
          <p className="text-[10px] text-slate-500 font-mono">ID: ADMIN_01 | IP: {currentIp}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Users size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">일일 활성 사용자</span>
          </div>
          <p className="text-4xl font-black">450<span className="text-sm font-normal text-emerald-400 ml-1">▲ 12%</span></p>
        </div>
        <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Activity size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">누적 기록 수</span>
          </div>
          <p className="text-4xl font-black">12.5K</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="space-y-6">
        {/* 접속자 트렌드 */}
        <section className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold flex items-center gap-2">
              <Globe className="text-emerald-400" size={18} /> 주간 접속자 명단 및 추이
            </h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold">LIVE</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.visitorStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 성별 분포 */}
          <section className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="font-bold mb-8 flex items-center gap-2">
              <Users className="text-indigo-400" size={18} /> 성별 분포
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.genderData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 지역별 통계 */}
          <section className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="font-bold mb-8 flex items-center gap-2">
              <Map className="text-amber-400" size={18} /> 지역별 통계
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.regionData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* 활동 통계 */}
        <section className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
          <h3 className="font-bold mb-8 flex items-center gap-2">
            <ShieldCheck className="text-blue-400" size={18} /> 주요 체크리스트 달성률
          </h3>
          <div className="space-y-6">
            {stats.topActivities.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-300">{item.name}</span>
                  <span className="text-emerald-400">{item.value}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-10 text-center text-slate-600 text-[10px] font-mono">
        &copy; 2025 NEW LIFE MANAGEMENT SYSTEM. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
};

export default AdminDashboard;
