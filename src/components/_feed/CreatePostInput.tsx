import { useState, useRef, useEffect } from 'react';
import { Video, Image as ImageIcon, Smile, X } from 'lucide-react';

import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../i18n/translations';
import currentUserData from '../../mocks/currentUser.json';
import type { Author } from '../../interfaces/types';

const currentUser = currentUserData as Author;

interface Props {
    onAddPost: (content: string) => void;
}

export const CreatePostInput = ({ onAddPost }: Props) => {
    // 1. Estados
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postText, setPostText] = useState('');
    
    // 2. Nuestro "lazo" para detectar el clic fuera del modal
    const modalRef = useRef<HTMLDivElement>(null);

    const { language } = useLanguageStore();
    const t = translations[language];

    // 3. Efecto para cerrar el modal al hacer clic afuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Si el modal está abierto y el clic NO fue dentro de nuestra caja blanca (modalRef)...
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };
        // Solo escuchamos clics si el modal está abierto para ahorrar memoria
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        // Limpieza al desmontar
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isModalOpen]);

    const handleSubmit = () => {
        if (postText.trim()) {
            onAddPost(postText);
            setPostText('');
            setIsModalOpen(false);
        }
    };

    // Extraer solo el primer nombre para hacerlo más amigable
    const firstName = currentUser.name.split(' ')[0];

    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4 transition-colors border border-gray-200 dark:border-gray-700">
            
            {/* --- SECCIÓN SUPERIOR --- */}
            <div className="flex items-center gap-2 mb-3">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
                
                {/* SOLUCIÓN DE CONTRASTE: Usamos dark:bg-gray-700 y dark:text-gray-300 */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-left px-4 py-2.5 rounded-full text-gray-500 dark:text-gray-300 transition-colors cursor-pointer"
                >
                    {t.whatsOnYourMind}, {firstName}?
                </button>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 mb-2" />

            {/* --- SECCIÓN INFERIOR: LOS 3 BOTONES --- */}
            {/* A todos les pusimos onClick={() => setIsModalOpen(true)} */}
            <div className="flex justify-between">
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                    <Video className="w-6 h-6 text-red-500" />
                    <span className="hidden sm:inline">{t.liveVideo}</span>
                </button>

                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                    <ImageIcon className="w-6 h-6 text-green-500" />
                    <span className="hidden sm:inline">{t.photoVideo}</span>
                </button>

                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                    <Smile className="w-6 h-6 text-yellow-500" />
                    <span className="hidden sm:inline">{t.feelingActivity}</span>
                </button>
            </div>

            {/* --- EL MODAL FLOTANTE --- */}
            {isModalOpen && (
                // Fondo oscuro transparente (No tiene ref, al hacer clic aquí se cierra)
                <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
                    
                    {/* LA CAJA DEL MODAL: ¡Aquí está amarrado el lazo de useRef! */}
                    <div
                        ref={modalRef}
                        className="w-full max-w-125 bg-white dark:bg-gray-800 rounded-xl shadow-xl flex flex-col border border-gray-200 dark:border-gray-700"
                    >
                        {/* Cabecera */}
                        <div className="relative flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Crear publicación</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-4 w-9 h-9 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>

                        {/* Cuerpo */}
                        <div className="p-4 flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
                                <span className="font-semibold text-gray-900 dark:text-gray-100">{currentUser.name}</span>
                            </div>

                            {/* El autoFocus hace que el cursor titile automáticamente al abrir */}
                            <textarea
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                                placeholder={`${t.whatsOnYourMind}, ${firstName}?`}
                                className="w-full min-h-[150px] bg-transparent outline-none text-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                                autoFocus
                            />

                            <button
                                onClick={handleSubmit}
                                disabled={!postText.trim()}
                                className={`w-full py-2 rounded-lg font-semibold transition-colors
                                    ${postText.trim()
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};