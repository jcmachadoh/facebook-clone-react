import { create } from 'zustand';
import type { Language } from '../i18n/translations';

interface LanguageState {
    language: Language;
    setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: 'es', // Idioma por defecto

    setLanguage: (language: string) => set({ language: language as Language }),
}));