import { Bell } from 'lucide-react';
import { useNotificationStore } from '../../store/useNotificationStore';

export const TopNotificationDropdown = () => {

    // 1. Solo sacamos el arreglo de la pizarra (esto es seguro y no rompe la memoria)
    const notifications = useNotificationStore((state) => state.notifications);
    // 2. Hacemos el filtro fuera del hook de Zustand
    const unviewedNotifications = notifications.filter(n => !n.viewed);

    return (
        <div className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col">

            {/* Cabecera del panel */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">Notificaciones</h3>
                {unviewedNotifications.length > 0 && (
                    <button
                        onClick={() => useNotificationStore.getState().markAllAsViewed()}
                        className="text-blue-600 text-sm hover:bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md transition-colors font-medium">
                        Marcar leídas
                    </button>
                )}
            </div>

            {/* Lista iterada (con barra de scroll si son muchas) */}
            <div className="max-h-100 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="p-4 text-gray-500 dark:text-gray-400 text-center font-medium">No hay notificaciones</p>
                ) : (
                    notifications.map(notif => (
                        !notif.viewed ? (
                            <div
                                key={notif.id}
                                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:bg-gray-700 cursor-pointer transition-colors"
                                onClick={() => {
                                    console.log(`Notificación clickeada: ${notif.text}`);
                                    useNotificationStore.getState().markNotificationAsViewed(notif.id);
                                }}
                            >
                                {/* Ícono de campana con fondo azul o gris según su estado */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.viewed ? 'bg-gray-200 text-gray-600' : 'bg-blue-100 text-blue-600'}`}>
                                    <Bell className="w-6 h-6" />
                                </div>

                                {/* Texto de la notificación */}
                                <div className="flex-1">
                                    <p className={`text-[15px] leading-tight ${notif.viewed ? 'text-gray-700' : 'font-semibold text-gray-900 dark:text-gray-100'}`}>
                                        {notif.text}
                                    </p>
                                    <p className={`text-[13px] mt-1 ${notif.viewed ? 'text-gray-500 dark:text-gray-400' : 'text-blue-600 font-medium'}`}>
                                        {notif.createdAt}
                                    </p>
                                </div>

                                {/* Puntito azul indicador de "Nueva" */}
                                {!notif.viewed && (
                                    <div className="w-3 h-3 bg-blue-600 rounded-full shrink-0"></div>
                                )}
                            </div>
                        ) : null
                    ))
                )}
            </div>
        </div>
    )
}
