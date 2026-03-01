import { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

import type { Author, CommentData, PostData } from "../../interfaces/types";
import { ActionButton } from "./ActionButton";
import { CommentFeed } from './CommentFeed';
import { CommentForm } from './CommentForm';
import currentUserData from '../../mocks/currentUser.json';
import { useNotificationStore, useLanguageStore } from '../../store';
import { translations } from '../../i18n/translations';

// Definimos que este componente recibe una propiedad llamada "post" que sigue nuestro molde
interface PostCardProps {
    post: PostData;
    onLikeToggle: (post_id: string) => void;
    onAddComment?: (post_id: string, comment: CommentData) => void;
}

const currentUser = currentUserData as Author;

export const PostCard = ({ post, onLikeToggle, onAddComment }: PostCardProps) => {

    const [isActiveCommentInput, setIsActiveCommentInput] = useState<string | null>(null);
    const addNotification = useNotificationStore((state) => state.addNotification);
    const { language } = useLanguageStore();
    const t = translations[language];

    const handleCommentClick = () => {
        setIsActiveCommentInput((prev) => (prev === post.id ? null : post.id));
    };
    const sendComment = (post_id: string, comment: string) => {
        const _comment: CommentData = {
            id: crypto.randomUUID(),
            author: currentUser,
            content: comment,
            createdAt: new Date().toDateString()
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onAddComment && onAddComment(post_id, _comment);
        addNotification({
            text: post.author.id === currentUser.id ?
                `Has comentado en tu publicación: ${comment}` :
                `Has comentado la publicación de ${post.author.name}: ${comment}`,
            type: 'comment',
        });
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4">
            {/* 1. PostHeader: Avatar, Nombre y Fecha */}
            <div className="flex items-center gap-3 p-4">
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{post.author.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{post.createdAt}</p>
                </div>
            </div>
            {/* 2. PostContent: Texto de la publicación */}
            <div className="px-4 pb-3">
                <p className="text-gray-800 dark:text-gray-200 text-sm">{post.content}</p>
            </div>
            {/* 3. PostMedia: Renderizado condicional (solo si hay imagen) */}
            {post.mediaUrls && post.mediaUrls.length > 0 && (
                <div className="w-full bg-gray-100 dark:bg-gray-700">
                    <img src={post.mediaUrls[0]} alt="Contenido" className="w-full max-h-125 object-cover" />
                </div>
            )}
            {/* 4. PostStats: Contador de Likes y Comentarios */}
            <div className="px-4 py-2 flex justify-between text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200">
                <span>👍 {post.likesCount}</span>
                <span>{post.commentsCount} comentarios</span>
            </div>
            {/* 5. PostActions: Botones de interacción */}
            <div className="flex justify-between px-2 py-1">
                <ActionButton
                    isLikedByMe={post.isLikedByMe}
                    icon={<ThumbsUp className="w-5 h-5" />}
                    text={t.like}
                    onHandleClic={() => onLikeToggle(post.id)}
                />
                <ActionButton
                    icon={<MessageSquare className="w-5 h-5" />}
                    text={t.comment}
                    onHandleClic={handleCommentClick}
                />
                <ActionButton
                    icon={<Share2 className="w-5 h-5" />}
                    text={t.share}
                />
            </div>
            {isActiveCommentInput && (
                <div className="px-4 py-2">
                    {post.comments && post.comments.length > 0 && (
                        <div className="mb-2">
                            {post.comments.map((comment) => (
                                <CommentFeed
                                    key={comment.id}
                                    comment={comment} />
                            ))}
                        </div>
                    )}
                    <CommentForm postId={post.id} addComment={sendComment} />
                </div>
            )}
        </div>
    );
};