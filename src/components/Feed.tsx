import { useMemo } from 'react';

import { PostCard } from './_feed/PostCard';
import type { Author, CommentData, PostData } from '../interfaces/types';
import { CreatePostInput } from './_feed/CreatePostInput';
import currentUserData from '../mocks/currentUser.json';
import { usePostStore, useNotificationStore, useLanguageStore } from '../store';
import { translations } from '../i18n/translations';

const currentUser = currentUserData as Author;

export const Feed = () => {

  const { language } = useLanguageStore();
  const t = translations[language];

  const addNotification = useNotificationStore((state) => state.addNotification);

  // ¡AQUÍ ESTÁ LA MAGIA! 
  // Al traer las cosas así, Feed se "suscribe" a la pizarra en vivo.
  const { posts, addPost, addPostLikeToggle, addPostComment, searchQuery } = usePostStore();

  // const filterPostsBySearchQuery = () => {
  //   if (!searchQuery.trim()) return posts; // Si no hay query, devolvemos todo

  //   const lowerCaseQuery = searchQuery.toLowerCase();
  //   return posts.filter(post =>
  //     post.content.toLowerCase().includes(lowerCaseQuery) ||
  //     post.author.name.toLowerCase().includes(lowerCaseQuery)
  //   );
  // }

  const filterPostsBySearchQuery = useMemo(() => posts.filter(post => {

    if (searchQuery.trim() === '') return true; // Si no hay búsqueda, mostramos todos

    const lowerQuery = searchQuery.toLowerCase();
    const contentMatch = post.content.toLowerCase().includes(lowerQuery);
    const authorMatch = post.author.name.toLowerCase().includes(lowerQuery);

    return contentMatch || authorMatch;
  }), [posts, searchQuery]);

  const handlePostLikeToggle = (postId: string) => {
    // Usamos el "posts" que sacamos del hook arriba
    const currentPost = posts.find(post => post.id === postId);
    if (!currentPost) return;

    const actionText = currentPost.isLikedByMe ? 'quitado el me gusta a' : 'dado me gusta a';
    addNotification({
      text: `Le has ${actionText} la publicación de ${currentPost.author.name}`,
      type: 'like',
    });

    // Usamos la función destructurada
    addPostLikeToggle(postId);
  };

  const handleCreateNewPost = (textContent: string) => {
    const newPost: PostData = {
      id: crypto.randomUUID(),
      author: currentUser,
      createdAt: 'Justo ahora',
      content: textContent,
      likesCount: 0,
      commentsCount: 0,
      isLikedByMe: false,
      comments: [],
    };

    // Usamos la función destructurada
    addPost(newPost);

    addNotification({
      text: `Has creado una nueva publicación: ${textContent}`,
      type: 'post',
    });
  };

  const handleAddComment = (postId: string, comment: CommentData) => {
    addPostComment(postId, comment);

    const postAuthorName = posts.find(p => p.id === postId)?.author.name;
    addNotification({
      text: `Has comentado en la publicación de ${postAuthorName}`,
      type: 'comment',
    });
  }

  return (
    <main className="flex-1 max-w-170 w-full mt-4 px-4 flex flex-col gap-4 items-center pb-10">
      <CreatePostInput onAddPost={handleCreateNewPost} />
      <div className="w-full flex flex-col gap-4">
        {filterPostsBySearchQuery.length > 0 ? (
          filterPostsBySearchQuery.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLikeToggle={handlePostLikeToggle}
              onAddComment={handleAddComment}
            />
          ))) :
          (
            <p className="text-center text-gray-500">{t.noPostsFound}</p>
          )
        }
      </div>
    </main>
  );
};