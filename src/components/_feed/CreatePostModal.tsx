// src/CreatePostModal.tsx
import { X } from 'lucide-react';
import type { Author } from '../../interfaces/types';
import currentUserData from '../..//mocks/currentUser.json';
import { useState } from 'react';
// import { useLanguageStore } from '../../store';
// import { translations } from '../../i18n/translations';


const currentUser = currentUserData as Author;

interface ModalProps {
    onClose: () => void;
    onPublish: (content: string) => void;
}

export const CreatePostModal = ({ onClose, onPublish }: ModalProps) => {

    const [textContent, setTextContent] = useState('');
    // const { language } = useLanguageStore();
    // const t = translations[language];

    const handlePublish = () => {
        if (textContent.trim() === '') return;
        onPublish(textContent);
        onClose();
    }

    return (
        // 1. El fondo oscuro (Overlay) que ocupa toda la pantalla
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 w-full max-w-125 rounded-xl shadow-xl flex flex-col">
                {/* Cabecera del modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="w-8"></div> {/* Espaciador invisible para centrar el título */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Crear publicación</h2>
                    <button
                        onClick={onClose} // ¡Al hacer clic, ejecutamos la función para cerrar!
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {/* Cuerpo del modal (Usuario y Área de texto) */}
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            src={currentUser.avatarUrl}
                            alt={currentUser.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-sm">{currentUser.name}</p>
                            <span className="bg-gray-200 text-xs font-semibold px-2 py-1 rounded-md text-gray-800 dark:text-gray-200 flex items-center gap-1 w-fit mt-1">
                                🌎 Público
                            </span>
                        </div>
                    </div>
                    <textarea
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        className="w-full h-32 resize-none outline-none text-xl placeholder-gray-500"
                        placeholder={`¿Qué estás pensando, ${currentUser.name.split(' ')[0]}?`}
                    ></textarea>
                </div>
                {/* Pie del modal (Botón Publicar) */}
                <div className="p-4">
                    <button
                        onClick={handlePublish} // 6. Conectamos el botón
                        disabled={textContent.trim() === ''} // Deshabilitamos si no hay texto
                        className={`w-full font-semibold py-2 rounded-lg transition-colors ${textContent.trim() === ''
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handlePublish();
                        }}
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
};