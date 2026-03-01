import { Search } from 'lucide-react';
import { useLanguageStore } from '../../store';
import { translations } from '../../i18n/translations';
import { usePostStore } from '../../store/usePostStore';

export const TopNavSearch = () => {

    const { searchQuery, setSearchQuery } = usePostStore();
    const { language } = useLanguageStore();
    const t = translations[language];

    return (
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-2 gap-2">
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <input
                type="search"
                className="bg-transparent outline-none w-full placeholder-gray-500 text-gray-900 dark:text-gray-100"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}