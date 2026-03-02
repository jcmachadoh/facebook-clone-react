import { Search } from 'lucide-react';
import { usePostStore } from '../../store/usePostStore';

export const TopNavSearch = () => {
    const { searchQuery, setSearchQuery } = usePostStore();

    return (
        // 1. En móviles (p-2) se hace un círculo perfecto. En PC (md:px-3 md:py-2) se alarga.
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-2 md:px-3 md:py-2 gap-2">
            <Search className="w-5 h-5 md:w-4 md:h-4 text-gray-500 dark:text-gray-400" />

            {/* 2. hidden md:block oculta el texto en móviles y lo muestra en PC */}
            <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hidden md:block bg-transparent outline-none w-full placeholder-gray-500 text-gray-900 dark:text-gray-100"
                placeholder="Buscar en Facebook"
            />
        </div>
    )
}