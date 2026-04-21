export type Theme = 'festive' | 'elegant' | 'kids' | 'minimalist';

export interface BirthdayData {
  name: string;
  message: string;
  date?: string;
  theme: Theme;
}
