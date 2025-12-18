
import React, { useState } from 'react';
import { DailyData, ReadingLog, BibleLog } from '../types';
import { BIBLE_BOOKS } from '../constants';
import { Plus, Trash2, BookOpen, Scroll } from 'lucide-react';

interface JournalSectionProps {
  data: DailyData;
  onUpdate: (data: DailyData) => void;
}

const JournalSection: React.FC<JournalSectionProps> = ({ data, onUpdate }) => {
  const [readingForm, setReadingForm] = useState({ bookTitle: '', pages: 0, highlight: '' });
  const [bibleForm, setBibleForm] = useState({ book: '창세기', chapter: 1, chapterCount: 1 });

  const addReadingLog = () => {
    if (!readingForm.bookTitle) return;
    const newLog: ReadingLog = {
      id: Date.now().toString(),
      ...readingForm,
      createdAt: new Date().toISOString(),
    };
    onUpdate({ ...data, readingLogs: [newLog, ...data.readingLogs] });
    setReadingForm({ bookTitle: '', pages: 0, highlight: '' });
  };

  const addBibleLog = () => {
    const newLog: BibleLog = {
      id: Date.now().toString(),
      ...bibleForm,
      createdAt: new Date().toISOString(),
    };
    onUpdate({ ...data, bibleLogs: [newLog, ...data.bibleLogs] });
  };

  const removeLog = (type: 'reading' | 'bible', id: string) => {
    if (type === 'reading') {
      onUpdate({ ...data, readingLogs: data.readingLogs.filter(l => l.id !== id) });
    } else {
      onUpdate({ ...data, bibleLogs: data.bibleLogs.filter(l => l.id !== id) });
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Bible Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <Scroll className="text-purple-500" />
          <h2 className="text-xl font-bold text-slate-800">성경 읽기 일지</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">성경 책</label>
            <select 
              value={bibleForm.book}
              onChange={e => setBibleForm({...bibleForm, book: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-200 outline-none"
            >
              {BIBLE_BOOKS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">시작 장</label>
            <input 
              type="number"
              value={bibleForm.chapter}
              onChange={e => setBibleForm({...bibleForm, chapter: parseInt(e.target.value) || 0})}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-200 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 mb-1">읽은 장 수</label>
              <input 
                type="number"
                value={bibleForm.chapterCount}
                onChange={e => setBibleForm({...bibleForm, chapterCount: parseInt(e.target.value) || 0})}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
            <button 
              onClick={addBibleLog}
              className="mt-5 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors self-start"
            >
              <Plus />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {data.bibleLogs.map(log => (
            <div key={log.id} className="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                <span className="font-semibold text-slate-800">{log.book} {log.chapter}장</span>
                <span className="text-xs text-slate-400">({log.chapterCount}장 읽음)</span>
              </div>
              <button onClick={() => removeLog('bible', log.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {data.bibleLogs.length === 0 && <p className="text-center text-slate-400 text-sm py-4">오늘의 말씀 기록이 없습니다.</p>}
        </div>
      </section>

      {/* Reading Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-emerald-500" />
          <h2 className="text-xl font-bold text-slate-800">독서 일지</h2>
        </div>

        <div className="space-y-4 mb-6 p-4 bg-slate-50 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">책 제목</label>
              <input 
                placeholder="책 제목을 입력하세요"
                value={readingForm.bookTitle}
                onChange={e => setReadingForm({...readingForm, bookTitle: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">읽은 페이지 수</label>
              <input 
                type="number"
                value={readingForm.pages}
                onChange={e => setReadingForm({...readingForm, pages: parseInt(e.target.value) || 0})}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">인상 깊은 글</label>
            <textarea 
              rows={3}
              placeholder="기억하고 싶은 내용을 적어주세요"
              value={readingForm.highlight}
              onChange={e => setReadingForm({...readingForm, highlight: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-200 outline-none resize-none"
            />
          </div>
          <button 
            onClick={addReadingLog}
            className="w-full bg-emerald-600 text-white font-bold py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> 기록 추가하기
          </button>
        </div>

        <div className="space-y-4">
          {data.readingLogs.map(log => (
            <div key={log.id} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm relative group">
              <button 
                onClick={() => removeLog('reading', log.id)} 
                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
              <div className="flex items-start gap-3 mb-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{log.bookTitle}</h4>
                  <p className="text-xs text-slate-500">{log.pages} 페이지 읽음</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 italic bg-slate-50 p-3 rounded-lg border-l-4 border-emerald-400">
                "{log.highlight}"
              </p>
            </div>
          ))}
          {data.readingLogs.length === 0 && <p className="text-center text-slate-400 text-sm py-4">오늘의 독서 기록이 없습니다.</p>}
        </div>
      </section>
    </div>
  );
};

export default JournalSection;
