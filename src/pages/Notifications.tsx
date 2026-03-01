import { useLanguageStore, useNotificationStore } from '../store';
import { translations } from '../i18n/translations';
import { Bell } from "lucide-react";

export const Notifications = () => {
    // Suscripción correcta a Zustand, incluyendo la función
    const { notifications, markNotificationAsViewed } = useNotificationStore();
    const { language } = useLanguageStore();
    const t = translations[language];
    return (
        <div className="w-full flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-20 pb-10 px-4">
            <div className="w-full max-w-170 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.yourNotifications}</h2>
                </div>

                <div className="flex flex-col">
                    {notifications && notifications.length > 0 ? (
                        notifications.map(notif => (
                            <div
                                key={notif.id}
                                className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-none"
                                onClick={() => markNotificationAsViewed(notif.id)}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${notif.viewed ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                                    <Bell className="w-6 h-6" />
                                </div>

                                <div className="flex-1">
                                    <p className={`text-[15px] leading-tight ${notif.viewed ? 'text-gray-700 dark:text-gray-300' : 'font-semibold text-gray-900 dark:text-gray-100'}`}>
                                        {notif.text}
                                    </p>
                                    <p className={`text-[13px] mt-1 ${notif.viewed ? 'text-gray-500 dark:text-gray-400' : 'text-blue-600 dark:text-blue-400 font-medium'}`}>
                                        {notif.createdAt}
                                    </p>
                                </div>

                                {!notif.viewed && (
                                    <div className="w-3 h-3 bg-blue-600 rounded-full shrink-0"></div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400 font-medium">{t.noNewNotifications}</div>
                    )}
                </div>
            </div>
        </div>
    )
}