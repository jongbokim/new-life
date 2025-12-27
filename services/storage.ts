
import { DailyData, DailyChecklist, UserProfile, AppData } from '../types';

const STORAGE_KEY = 'new_life_app_v2_data';

export const getDefaultChecklist = (): DailyChecklist => ({
  dawnPrayer: false,
  morningPrayer: false,
  noonPrayer: false,
  afternoonPrayer: false,
  nightPrayer: false,
  worship: false,
  exercise: false,
  recitation: false,
  cleaning: false,
  organization: false,
  recycling: false,
  hygiene: false,
  doorLightCheck: false,
  environmentCheck: false,
  slowChewing: false,
  bedsidePrep: false,
});

export const getAppData = (): AppData => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { dailyData: {} };
  return JSON.parse(raw);
};

export const saveProfile = (profile: UserProfile) => {
  const data = getAppData();
  data.profile = profile;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getDailyData = (date: string): DailyData => {
  const data = getAppData();
  return data.dailyData[date] || {
    date,
    checklist: getDefaultChecklist(),
    readingLogs: [],
    bibleLogs: [],
  };
};

export const saveDailyData = (dailyData: DailyData) => {
  const data = getAppData();
  data.dailyData[dailyData.date] = dailyData;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getAllDailyData = (): Record<string, DailyData> => {
  return getAppData().dailyData;
};

// 관리자용 시뮬레이션 데이터 생성기 (서버가 없으므로 데모를 위해 사용)
export const getAdminMockStats = () => {
  return {
    visitorStats: [
      { name: '월', users: 120 },
      { name: '화', users: 150 },
      { name: '수', users: 180 },
      { name: '목', users: 140 },
      { name: '금', users: 210 },
      { name: '토', users: 320 },
      { name: '일', users: 450 },
    ],
    genderData: [
      { name: '남성', value: 450 },
      { name: '여성', value: 550 },
    ],
    regionData: [
      { name: '서울', value: 300 },
      { name: '경기', value: 250 },
      { name: '인천', value: 100 },
      { name: '기타', value: 150 },
    ],
    topActivities: [
      { name: '새벽기도', value: 85 },
      { name: '성경읽기', value: 72 },
      { name: '정리정돈', value: 65 },
      { name: '천천히씹기', value: 40 },
    ]
  };
};
