// src/store/useNotificationStore.ts
import { create } from 'zustand';

import notificationData from '../mocks/notifications.json';

export interface NotificationData {
    id: string;
    text: string;
    type: 'like' | 'comment' | 'post';
    createdAt: string;
    viewed: boolean;
}

interface NotificationStore {
    notifications: NotificationData[];
    addNotification: (notif: Omit<NotificationData, 'id' | 'viewed' | 'createdAt'>) => void; // Función para agregar
    markAllAsViewed: () => void;
    markNotificationAsViewed: (id: string) => void;
}

// 3. Creamos el Store
export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: notificationData as NotificationData[], // Empezamos con la lista vacía

    // set() es la forma en que Zustand actualiza el estado global
    addNotification: (notif) =>
        set((state) => ({
            notifications: [
                {
                    ...notif,
                    id: crypto.randomUUID(), // Generamos un ID único
                    createdAt: 'Justo ahora',
                    viewed: false,
                },
                ...state.notifications,
            ],
        })),

    markAllAsViewed: () =>
        set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, viewed: true })),
        })),

    markNotificationAsViewed: (id: string) =>
        set((state) => ({
            notifications: state.notifications.map((n) =>
                n.id === id ? { ...n, viewed: true } : n
            ),
        })),
}));