
import React from 'react';
import { Youtube, ExternalLink, PlayCircle } from 'lucide-react';

const VideoSection: React.FC = () => {
  const channelUrl = "https://www.youtube.com/@milal_sound"; // Assumed channel handle
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-6">
          <Youtube className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">영상 묵상</h2>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
          '밀알의 소리샘' 채널의 오늘의 말씀을 통해<br /> 깊은 은혜의 시간을 누려보세요.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 mb-6 aspect-video flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
          <PlayCircle className="w-16 h-16 text-slate-300 mb-4" />
          <p className="text-slate-400 text-sm">유튜브 앱 또는 브라우저에서 시청 가능합니다.</p>
        </div>

        <a 
          href={channelUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100"
        >
          밀알의 소리샘 바로가기 <ExternalLink size={18} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
            <PlayCircle />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">묵상 가이드</h3>
            <p className="text-xs text-slate-500">조용한 장소에서 기도로 시작하세요.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
            <Youtube />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">채널 구독</h3>
            <p className="text-xs text-slate-500">새로운 영상을 알림으로 받아보세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
