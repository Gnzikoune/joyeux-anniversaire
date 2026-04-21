import { BirthdayData } from '../types';

export const encodeBirthdayData = (data: BirthdayData): string => {
  return btoa(encodeURIComponent(JSON.stringify(data)));
};

export const decodeBirthdayData = (encoded: string): BirthdayData | null => {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch (e) {
    return null;
  }
};
