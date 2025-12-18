
import React from 'react';
import { 
  Sun, Moon, Sunrise, Sunset, BookOpen, Scroll, Video, BarChart3, 
  CheckCircle2, Dumbbell, Trash2, Sparkles, DoorOpen, Utensils, BedDouble
} from 'lucide-react';

export const CHECKLIST_ITEMS = [
  { id: 'dawnPrayer', label: '새벽 기도', icon: <Sunrise className="w-5 h-5 text-orange-400" /> },
  { id: 'morningPrayer', label: '아침 기도', icon: <Sun className="w-5 h-5 text-yellow-400" /> },
  { id: 'noonPrayer', label: '낮 기도', icon: <Sun className="w-5 h-5 text-yellow-600" /> },
  { id: 'afternoonPrayer', label: '오후 기도', icon: <Sunset className="w-5 h-5 text-orange-600" /> },
  { id: 'nightPrayer', label: '밤 기도', icon: <Moon className="w-5 h-5 text-indigo-400" /> },
  { id: 'worship', label: '예배', icon: <Scroll className="w-5 h-5 text-purple-400" /> },
  { id: 'exercise', label: '체조', icon: <Dumbbell className="w-5 h-5 text-green-400" /> },
  { id: 'recitation', label: '암송', icon: <BookOpen className="w-5 h-5 text-blue-400" /> },
  { id: 'cleaning', label: '청소', icon: <Sparkles className="w-5 h-5 text-cyan-400" /> },
  { id: 'organization', label: '정리정돈', icon: <Sparkles className="w-5 h-5 text-teal-400" /> },
  { id: 'recycling', label: '분리수거', icon: <Trash2 className="w-5 h-5 text-emerald-400" /> },
  { id: 'hygiene', label: '세면 및 양치질', icon: <Sparkles className="w-5 h-5 text-blue-300" /> },
  { id: 'doorLightCheck', label: '문 및 불 점검', icon: <DoorOpen className="w-5 h-5 text-red-400" /> },
  { id: 'environmentCheck', label: '환경점검', icon: <CheckCircle2 className="w-5 h-5 text-lime-500" /> },
  { id: 'slowChewing', label: '천천히 씹기', icon: <Utensils className="w-5 h-5 text-amber-500" /> },
  { id: 'bedsidePrep', label: '머리맡 준비', icon: <BedDouble className="w-5 h-5 text-slate-500" /> },
] as const;

export const BIBLE_BOOKS = [
  "창세기", "출애굽기", "레위기", "민수기", "신명기", "여호수아", "사사기", "룩기", "사무엘상", "사무엘하", "열왕기상", "열왕기하", "역대상", "역대하", "에스라", "느헤미야", "에스더", "욥기", "시편", "잠언", "전도서", "아가", "이사야", "예레미야", "예레미야애가", "에스겔", "다니엘", "호세아", "요엘", "아모스", "오바댜", "요나", "미가", "나훔", "하박국", "스바냐", "학개", "스가랴", "말라기",
  "마태복음", "마가복음", "누가복음", "요한복음", "사도행전", "로마서", "고린도전서", "고린도후서", "갈라디아서", "에베소서", "빌립보서", "골로새서", "데살로니가전서", "데살로니가후서", "디모데전서", "디모데후서", "디도서", "빌레몬서", "히브리서", "야고보서", "베드로전서", "베드로후서", "요한1서", "요한2서", "요한3서", "유다서", "요한계시록"
];
