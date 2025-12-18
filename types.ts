
export interface DailyChecklist {
  dawnPrayer: boolean;
  morningPrayer: boolean;
  noonPrayer: boolean;
  afternoonPrayer: boolean;
  nightPrayer: boolean;
  worship: boolean;
  exercise: boolean;
  recitation: boolean;
  cleaning: boolean;
  organization: boolean;
  recycling: boolean;
  hygiene: boolean;
  doorLightCheck: boolean;
  environmentCheck: boolean;
  slowChewing: boolean;
  bedsidePrep: boolean;
}

export interface ReadingLog {
  id: string;
  bookTitle: string;
  pages: number;
  highlight: string;
  createdAt: string;
}

export interface BibleLog {
  id: string;
  book: string;
  chapter: number;
  chapterCount: number;
  createdAt: string;
}

export interface DailyData {
  date: string; // YYYY-MM-DD
  checklist: DailyChecklist;
  readingLogs: ReadingLog[];
  bibleLogs: BibleLog[];
}

export type ViewType = 'home' | 'today' | 'journals' | 'video' | 'stats';
