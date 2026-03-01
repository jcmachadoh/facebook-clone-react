import { useLanguageStore } from "../../store/useLanguageStore";
import type { Language } from "../../i18n/translations";

export const TopSelectLanguage = () => {
    const { language, setLanguage } = useLanguageStore();

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'ja', label: '日本語 (Kanji)', flag: '🇯🇵' },
    ];

    return (
        <div className="w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
            <h3 className="px-4 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700">
                Selecciona tu idioma
            </h3>
            <div className="flex flex-col mt-1">
                {languages.map((lng) => (
                    <button
                        key={lng.code}
                        onClick={() => setLanguage(lng.code)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                            ${language === lng.code ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}
                    >
                        <span className="text-lg">{lng.flag}</span>
                        {lng.label}
                    </button>
                ))}
            </div>
        </div>
    );
};