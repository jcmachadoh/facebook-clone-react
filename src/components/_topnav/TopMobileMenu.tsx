import { Link } from 'react-router-dom';
import { Home, Users, MonitorPlay, Store, Moon, Sun } from 'lucide-react';
import { useThemeStore, useLanguageStore } from '../../store';
import { translations } from '../../i18n/translations';

export const TopMobileMenu = () => {
    const { theme, toggleTheme } = useThemeStore();
    const { language } = useLanguageStore();
    const t = translations[language];

    return (
        <div className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 flex flex-col">

            <Link to="/" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors">
                <Home className="w-6 h-6 text-blue-500" /> <span className="font-semibold text-[15px]">{t.home}</span>
            </Link>

            <Link to="/friends" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors">
                <Users className="w-6 h-6 text-blue-500" /> <span className="font-semibold text-[15px]">{t.friends}</span>
            </Link>

            <Link to="/video" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors">
                <MonitorPlay className="w-6 h-6 text-blue-500" /> <span className="font-semibold text-[15px]">{t.video}</span>
            </Link>

            <Link to="/marketplace" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors">
                <Store className="w-6 h-6 text-blue-500" /> <span className="font-semibold text-[15px]">{t.marketplace}</span>
            </Link>

            <hr className="my-2 border-gray-200 dark:border-gray-700 mx-4" />

            <button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors w-full text-left">
                {theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
                <span className="font-semibold text-[15px]">{theme === 'dark' ? t.switchLight : t.switchDark}</span>
            </button>
        </div>
    );
};