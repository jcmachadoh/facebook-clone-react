import type { ReactNode } from "react";

// 1. Creamos un mini-componente reutilizable para cada fila del menú
interface SidebarItemProps {
    icon?: ReactNode; // Puede ser un ícono de Lucide...
    imageSrc?: string; // ... o una imagen (para el perfil)
    text: string;
}

export const SidebarItem = ({ icon, imageSrc, text }: SidebarItemProps) => {
    return (
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors">
            {/* Renderizado condicional: Si hay imagen, mostramos <img>, si no, mostramos el ícono */}
            {imageSrc ? (
                <img src={imageSrc} alt={text} className="w-9 h-9 rounded-full object-cover" />
            ) : (
                <div className="w-9 h-9 rounded-full flex items-center justify-center">
                    {icon}
                </div>
            )}
            <span className="font-medium text-gray-900 dark:text-gray-100 text-[15px]">{text}</span>
        </div>
    );
};