
export type Gender = 'male' | 'female';
export type Region = '서울' | '경기' | '인천' | '강원' | '충청' | '전라' | '경상' | '제주' | '해외';

export interface UserProfile {
  id: string;          // 내부 식별용
  userId: string;      // 로그인 ID
  password: string;    // 로그인 PW
  name: string;        // 성명
  age: string;         // 나이
  affiliation: string; // 소속
  phoneNumber: string; // 전화번호
  gender: Gender;
  region: Region;
  joinedAt: string;
  lastLoginIp?: string;
}

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

export interface AppData {
  profile?: UserProfile;
  dailyData: Record<string, DailyData>;
}

export type ViewType = 'home' | 'today' | 'journals' | 'video' | 'stats' | 'user' | 'admin' | 'login' | 'signup';
export type UserRole = 'user' | 'admin';
