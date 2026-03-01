import { create } from 'zustand';
import type { CommentData, PostData } from '../interfaces/types';

import postList from '../mocks/posts.json';

interface PostStore {
    posts: PostData[];
    searchQuery: string;
    addPost: (post: Omit<PostData, 'id' | 'createdAt'>) => void;
    addPostLikeToggle: (postId: string) => void;
    addPostComment: (postId: string, comment: CommentData) => void;
    setSearchQuery: (query: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
    posts: postList as PostData[],

    addPost: (post) =>
        set((state) => ({
            posts: [
                {
                    ...post, id: crypto.randomUUID(), createdAt: new Date().toISOString(), likesCount: 0, commentsCount: 0, isLikedByMe: false, comments: []
                },
                ...state.posts],
        })),

    searchQuery: '',

    setSearchQuery: (query: string) => set({ searchQuery: query }),

    addPostLikeToggle: (postId: string) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        isLikedByMe: !post.isLikedByMe,
                        likesCount: post.isLikedByMe ? post.likesCount - 1 : post.likesCount + 1,
                    }
                    : post
            )
        })),

    addPostComment: (postId: string, comment: CommentData) =>
        set((state) => ({
            posts: state.posts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        commentsCount: post.commentsCount + 1,
                        comments: [...(post.comments || []), comment]
                    }
                    : post
            )
        }))
}));


