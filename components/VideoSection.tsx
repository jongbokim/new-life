
import React from 'react';
import { Youtube, ExternalLink, Play } from 'lucide-react';

const VideoSection: React.FC = () => {
  const channelUrl = "https://youtube.com/channel/UCCIHZQbRrCkZ6dj0_RWBPPQ?si=v5oFsiSDfV7CCUD7";
  
  // 밀알의 소리샘 채널의 대표적인 묵상 영상 썸네일 URL (고해상도)
  // 실제 채널의 영상 ID 중 하나를 활용하여 썸네일을 가져옵니다.
  const thumbnailUrl = "https://img.youtube.com/vi/VfM1D_B8Rz8/maxresdefault.jpg";
  
  return (
    <div className="space-y-6 pb-10">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-center overflow-hidden">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-2xl mb-6">
          <Youtube className="w-8 h-8 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">오늘의 영상 묵상</h2>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
          '밀알의 소리샘' 채널의 귀한 말씀을 통해<br /> 
          오늘 하루도 주님의 은혜 안에 머무르세요.
        </p>

        {/* 썸네일 섹션 */}
        <div className="relative group cursor-pointer mb-8 max-w-md mx-auto" onClick={() => window.open(channelUrl, '_blank')}>
          <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl shadow-red-100/50 border border-slate-100">
            <img 
              src={thumbnailUrl} 
              alt="밀알의 소리샘 썸네일" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                // 썸네일 로드 실패 시 대체 이미지 처리
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=800";
              }}
            />
            {/* 오버레이 플레이 버튼 */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-red-600 fill-red-600 ml-1" />
              </div>
            </div>
          </div>
          {/* 하단 뱃지 */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">New Content</span>
          </div>
        </div>

        <a 
          href={channelUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-10 py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
        >
          채널 바로가기 <ExternalLink size={18} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">묵상 가이드</h3>
            <p className="text-xs text-slate-500 leading-snug">조용한 장소에서 기도로 <br/>마음을 준비해 보세요.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
            <Youtube className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">알림 설정</h3>
            <p className="text-xs text-slate-500 leading-snug">구독과 알림 설정을 통해<br/>매일 새 영상을 만나보세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
