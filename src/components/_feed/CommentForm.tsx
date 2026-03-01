import { Send } from 'lucide-react'
import { useState } from 'react'

interface CommentFormProps {
    addComment: (post_id: string, content: string) => void;
    postId: string;
}

export const CommentForm = ({ postId, addComment }: CommentFormProps) => {

    const [comment, setComment] = useState('');

    const handleSend = () => {
        if (comment.trim() === '') return;
        addComment(postId, comment);
        setComment('');
    };

    return (
        <div className='flex items-center rounded-full px-1 py-1 gap-2 mt-2'>
            <input
                type="text"
                placeholder="Escribe un comentario..."
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-[14px] focus:outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                }}
            />
            {comment.trim() !== '' && (
                <Send
                    className="w-6 h-6 text-blue-600 cursor-pointer hover:scale-110 transition-transform"
                    onClick={handleSend}
                />
            )}
        </div>
    )
}