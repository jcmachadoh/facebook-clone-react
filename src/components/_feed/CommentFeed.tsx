import type { CommentData } from "../../interfaces/types"

interface CommentFeedProps {
    comment: CommentData
}

export const CommentFeed = ({ comment }: CommentFeedProps) => {
    return (
        <div className="flex items-start gap-2 mb-3">
            <img src={comment.author.avatarUrl} alt={comment.author.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-3 py-2 max-w-[85%]">
                <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">{comment.author.name}</p>
                <p className="text-[14px] text-gray-800 dark:text-gray-200 leading-snug">{comment.content}</p>
            </div>
        </div>
    )
}