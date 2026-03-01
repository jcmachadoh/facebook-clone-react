// src/_topnav/TopNavPestana.tsx
import type { ReactNode } from "react"

interface TopNavPestanaProps {
    icon: ReactNode,
    isActive: boolean,
    title: string, // <-- Nueva prop para el texto del tooltip
    onClick: () => void
}

export const TopNavPestana = ({ isActive, onClick, icon, title }: TopNavPestanaProps) => {
    return (
        <div className="group relative h-full flex items-center justify-center w-24">

            <div
                className={`w-full h-full flex items-center justify-center cursor-pointer transition-colors 
    ${isActive
                        ? 'border-b-[3px] border-blue-600 text-blue-600 dark:text-blue-500'
                        : 'border-b-[3px] border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg my-1'
                    }`}
                onClick={onClick}
            >
                {icon}
            </div>

            {/* 2. El Tooltip: oculto por defecto, visible al hacer hover en el grupo */}
            <span className="absolute top-[calc(100%+5px)] hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-50 pointer-events-none bg-opacity-90 shadow-sm font-medium">
                {title}
            </span>
        </div>
    )
}