import { Camera, Plus, Pen, MoreHorizontal, Briefcase, GraduationCap, Home as HomeIcon, MapPin } from 'lucide-react';

import { useNotificationStore, usePostStore, useLanguageStore } from '../store';
import currentUserData from '../mocks/currentUser.json';
import type { Author, CommentData } from '../interfaces/types';

import { CreatePostInput } from '../components/_feed/CreatePostInput';
import { PostCard } from '../components/_feed/PostCard';
import { translations } from '../i18n/translations';

const currentUser = currentUserData as Author;


export const Profile = () => {

    const userPosts = usePostStore((state) => state.posts);
    const { posts, addPostLikeToggle, addPostComment } = usePostStore();
    const addNotification = useNotificationStore((state) => state.addNotification);
    const { language } = useLanguageStore();
    const t = translations[language];

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

    const handleAddComment = (postId: string, comment: CommentData) => {
        addPostComment(postId, comment);

        const postAuthorName = posts.find(p => p.id === postId)?.author.name;
        addNotification({
            text: `Has comentado en la publicación de ${postAuthorName}`,
            type: 'comment',
        });
    }

    return (
        // Contenedor principal centrado
        <div className="w-full flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pb-10">

            {/* --- SECCIÓN SUPERIOR: Cabecera blanca/oscura --- */}
            <div className="w-full bg-white dark:bg-gray-800 shadow-sm flex flex-col items-center">
                <div className="max-w-274 w-full flex flex-col relative">

                    {/* 1. Foto de Portada */}
                    <div className="w-full h-87 bg-gray-300 dark:bg-gray-700 rounded-b-lg relative group">
                        {/* Puedes poner una imagen real aquí. Usamos un gradiente por ahora */}
                        <div className="w-full h-full rounded-b-lg bg-linear-to-b from-gray-400 to-gray-500 object-cover"></div>

                        {/* Botón flotante para editar portada */}
                        <button className="absolute bottom-4 right-4 bg-white dark:bg-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-md font-semibold text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition shadow-sm">
                            <Camera className="w-4 h-4" />
                            <span className="hidden sm:inline">{t.addCoverPhoto}</span>
                        </button>
                    </div>

                    {/* 2. Foto de Perfil y Acciones */}
                    <div className="px-8 flex flex-col md:flex-row justify-between items-center md:items-end -mt-8 md:-mt-12 mb-4 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            {/* Avatar superpuesto */}
                            <div className="relative">
                                <img
                                    src={currentUser.avatarUrl}
                                    alt="Perfil"
                                    className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 object-cover bg-white"
                                />
                                <button className="absolute bottom-2 right-2 w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition border-2 border-white dark:border-gray-800">
                                    <Camera className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                                </button>
                            </div>

                            {/* Nombre y cantidad de amigos */}
                            <div className="text-center md:text-left mt-2 md:mt-10">
                                <h1 className="text-[32px] font-bold text-gray-900 dark:text-gray-100 leading-none">{currentUser.name}</h1>
                                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">452 amigos</p>
                                {/* Miniaturas de amigos (simuladas) */}
                                <div className="flex justify-center md:justify-start mt-1">
                                    <img src="https://i.pravatar.cc/150?img=12" className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 -ml-1 first:ml-0" alt="amigo" />
                                    <img src="https://i.pravatar.cc/150?img=32" className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 -ml-2" alt="amigo" />
                                    <img src="https://i.pravatar.cc/150?img=53" className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 -ml-2" alt="amigo" />
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción derecha */}
                        <div className="flex gap-2 mt-4 md:mt-0 md:mb-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-semibold text-[15px] flex items-center gap-2 transition">
                                <Plus className="w-5 h-5" />
                                {t.addFriend}
                            </button>
                            <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded-md font-semibold text-[15px] flex items-center gap-2 transition">
                                <Pen className="w-4 h-4" />
                                {t.editProfile}
                            </button>
                            <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded-md transition flex items-center justify-center">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* 3. Pestañas del perfil */}
                    <div className="w-full px-4 border-t border-gray-200 dark:border-gray-700 flex gap-1 mt-2">
                        {['Publicaciones', 'Información', 'Amigos', 'Fotos', 'Videos', 'Reels'].map((tab, idx) => (
                            <button key={idx} className={`px-4 py-4 font-semibold text-[15px] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${idx === 0 ? 'text-blue-600 dark:text-blue-500 border-b-[3px] border-blue-600 rounded-none hover:bg-transparent' : ''}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- SECCIÓN INFERIOR: Cuerpo (2 Columnas) --- */}
            <div className="w-full max-w-274 flex flex-col md:flex-row gap-4 mt-4 px-4">

                {/* Columna Izquierda: Detalles (Toma el 40% del espacio) */}
                <div className="w-full md:w-[40%] flex flex-col gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                        <h2 className="text-[20px] font-bold text-gray-900 dark:text-gray-100 mb-4">Detalles</h2>

                        <div className="flex flex-col gap-4 text-[15px] text-gray-800 dark:text-gray-200">
                            <div className="flex items-center gap-3">
                                <Briefcase className="w-5 h-5 text-gray-400" />
                                <span>{t.worksAt} <strong>React Developer</strong></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 text-gray-400" />
                                <span>{t.studiedAt}<strong>Universidad de la Vida</strong></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <HomeIcon className="w-5 h-5 text-gray-400" />
                                <span>{t.livesIn} <strong>Ciudad de México</strong></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <span>{t.from} <strong>Guantanamo, Cuba</strong></span>
                            </div>
                        </div>

                        <button className="w-full mt-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold py-1.5 rounded-lg transition">
                            {t.editDetails}
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 h75 flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                        (Cuadrícula de Fotos)
                    </div>
                </div>

                {/* Columna Derecha: Muro de Publicaciones (Toma el 60% del espacio) */}
                <div className="w-full md:w-[60%] flex flex-col gap-4">
                    <CreatePostInput onAddPost={(content) => console.log('Nuevo post:', content)} />

                    {/* Reutilizamos el PostCard con nuestros datos de prueba */}
                    <div className="w-full flex flex-col gap-4">
                        {userPosts.map((post) => (
                            (post.author.id === currentUser.id) &&
                            <PostCard
                                key={post.id}
                                post={post}
                                onLikeToggle={handlePostLikeToggle}
                                onAddComment={handleAddComment}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};