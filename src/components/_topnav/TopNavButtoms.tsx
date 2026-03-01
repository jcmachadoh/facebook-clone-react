import { useState, useRef, useEffect, type ReactNode } from "react"
import type { NotificationData } from "../../store/useNotificationStore"

interface TopNavButtomsProps {
    icon: ReactNode,
    title: string,
    onClick: () => void,
    notification?: NotificationData[],
    dropdown?: ReactNode
}

export const TopNavButtoms = ({ icon, onClick, title, notification, dropdown }: TopNavButtomsProps) => {
    
    // 1. Estado para saber si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);
    
    // 2. Nuestro "lazo" (Ref) que amarraremos al contenedor principal
    const menuRef = useRef<HTMLDivElement>(null);

    // 3. El detector de clics afuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Si el menú está amarrado (current existe) 
            // Y el elemento al que le dimos clic NO está dentro de nuestro menú...
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false); // ¡Lo cerramos!
            }
        };

        // Escuchamos los clics en todo el documento
        document.addEventListener('mousedown', handleClickOutside);
        
        // Limpiamos el evento cuando el componente desaparece (¡Muy importante para evitar bugs!)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // El array vacío significa que esto solo se configura una vez al nacer el componente

    // 4. Función que maneja el clic en el botón circular
    const handleButtonClick = () => {
        if (dropdown) {
            setIsOpen(!isOpen); // Abre/Cierra el menú si tiene dropdown
        }
        onClick(); // Ejecuta la acción original (como cambiar el tema)
    };

    return (
        // 5. ¡AQUÍ AMARRAMOS EL LAZO! (ref={menuRef})
        <div className="group relative flex items-center justify-center" ref={menuRef}>

            {/* El botón circular */}
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-900 dark:text-gray-100 transition-colors cursor-pointer
                    ${isOpen ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'}
                `}
                onClick={handleButtonClick}
            >
                {icon}
            </div>

            {/* Tooltip normal (Solo se muestra si NO hay dropdown) */}
            {!dropdown && (
                <span className="absolute top-[calc(100%+5px)] hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-50 pointer-events-none bg-opacity-90 shadow-sm font-medium">
                    {title}
                </span>
            )}

            {/* Panel Dropdown (AHORA CONTROLADO POR REACT Y NO POR CSS) */}
            {dropdown && isOpen && (
                <div className="absolute top-full right-0 pt-2 cursor-default z-50">
                    {dropdown}
                </div>
            )}

            {/* La burbuja roja de notificaciones */}
            {notification && notification.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notification.length}
                </div>
            )}
        </div>
    )
}