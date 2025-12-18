
import { DailyData, DailyChecklist } from '../types';

const STORAGE_KEY = 'new_life_app_data';

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

export const getDailyData = (date: string): DailyData => {
  const allData = getAllData();
  return allData[date] || {
    date,
    checklist: getDefaultChecklist(),
    readingLogs: [],
    bibleLogs: [],
  };
};

export const saveDailyData = (data: DailyData) => {
  const allData = getAllData();
  allData[data.date] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
};

export const getAllData = (): Record<string, DailyData> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
};
