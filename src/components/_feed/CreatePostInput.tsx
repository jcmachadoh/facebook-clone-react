import { useState } from 'react';
import { Video, Image as ImageIcon, Smile } from 'lucide-react';

import type { Author } from '../../interfaces/types';
import currentUserData from '../../mocks/currentUser.json';
import { CreatePostModal } from './CreatePostModal';

import { useLanguageStore } from '../../store';
import { translations } from '../../i18n/translations'

// 1. Definimos que este componente recibirá la función del padre
interface InputProps {
    onAddPost: (content: string) => void;
}

// Tipamos nuestro JSON usando la interfaz que ya teníamos
const currentUser = currentUserData as Author;

export const CreatePostInput = ({ onAddPost }: InputProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const firstName = currentUser.name.split(' ')[0];

    const { language } = useLanguageStore();
    const t = translations[language];

    return (
        <>
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4 transition-colors">

                {/* 1. Sección Superior */}
                <div className="flex items-center gap-2 mb-3">
                    <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        // AQUÍ ESTÁ LA MAGIA OSCURA: dark:bg-gray-700 dark:text-gray-300
                        className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-left px-4 py-2.5 rounded-full text-gray-500 dark:text-gray-300 transition-colors cursor-pointer">
                        {t.whatsOnYourMind}, {firstName}?
                    </button>
                </div>

                {/* Línea divisoria */}
                <hr className="border-gray-200 dark:border-gray-700 mb-2" />

                {/* 2. Sección Inferior: Botones */}
                <div className="flex justify-between">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Video className="w-6 h-6 text-red-500" />
                        <span className="hidden sm:inline">{t.liveVideo}</span>
                    </button>

                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300">
                        <ImageIcon className="w-6 h-6 text-green-500" />
                        <span className="hidden sm:inline">{t.photoVideo}</span>
                    </button>

                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Smile className="w-6 h-6 text-yellow-500" />
                        <span className="hidden sm:inline">{t.feelingActivity}</span>
                    </button>
                </div>
            </div>
            {/* 5. Renderizado Condicional */}
            {/* Si isModalOpen es true, se dibuja el modal. Si es false, esto se ignora. */}
            {isModalOpen && (
                <CreatePostModal
                    onPublish={onAddPost}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};