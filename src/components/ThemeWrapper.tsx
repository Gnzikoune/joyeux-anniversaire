import { ReactNode } from 'react';
import { Theme } from '../types';

interface ThemeWrapperProps {
  theme: Theme;
  children: ReactNode;
  className?: string;
}

export const ThemeWrapper = ({ theme, children, className = '' }: ThemeWrapperProps) => {
  const getThemeClasses = (t: Theme) => {
    switch (t) {
      case 'festive':
        return 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white font-festive';
      case 'elegant':
        return 'bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#000000] text-amber-200 font-elegant';
      case 'kids':
        return 'bg-gradient-to-br from-yellow-300 via-lime-300 to-cyan-300 text-indigo-900 font-kids';
      case 'minimalist':
        return 'bg-gray-50 text-gray-900 font-minimalist';
      default:
        return 'bg-white text-gray-900 font-sans';
    }
  };

  return (
    <div className={`h-[100dvh] w-full flex flex-col transition-all duration-1000 overflow-hidden ${getThemeClasses(theme)} ${className}`}>
      {children}
    </div>
  );
};
