import type { FriendsData } from "../interfaces/types";
import friendsData from '../mocks/friends.json';
import { useLanguageStore } from '../store';
import { translations } from '../i18n/translations';

export const Friends = () => {
    const friends = friendsData as FriendsData[];
    const { language } = useLanguageStore();
    const t = translations[language];

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-20 px-4 pb-10">
            <div className="max-w-300 mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t.friends}</h2>

                {/* Cuadrícula responsiva: 2 columnas en celular, hasta 5 en PC */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {friends.map(friend => (
                        <div key={friend.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
                            <img src={friend.avatarUrl} alt={friend.name} className="w-full h-48 object-cover" />
                            <div className="p-3 flex flex-col flex-1">
                                <h3 className="text-[16px] font-semibold text-gray-900 dark:text-gray-100">{friend.name}</h3>
                                <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-3">{friend.mutualFriends} {t.mutualFriends}</p>

                                <div className="mt-auto flex flex-col gap-2">
                                    {friend.status === 'suggestion' || friend.status === 'request' ? (
                                        <button className="w-full bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 font-semibold py-1.5 rounded-md text-sm hover:bg-blue-200 transition-colors">
                                            {t.addFriend}
                                        </button>
                                    ) : (
                                        <button className="w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 font-semibold py-1.5 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                            {t.sendMessage}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};