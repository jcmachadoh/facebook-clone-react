import type { ReactNode } from "react"

interface Props {
    isLikedByMe?: boolean,
    icon: ReactNode,
    text: string,
    onHandleClic?: () => void,
}

export const ActionButton = ({ isLikedByMe, icon, text, onHandleClic }: Props) => {

    return (
        <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isLikedByMe ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={onHandleClic}
        >
            {icon}
            {text}
        </button>
    )
}
