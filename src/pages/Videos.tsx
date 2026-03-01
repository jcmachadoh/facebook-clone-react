import { Play, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import type { VideoData } from "../interfaces/types"
import videoData from '../mocks/videos.json';

export const Videos = () => {
    const videos = videoData as VideoData[];

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-20 px-4 flex flex-col items-center pb-10">
            <div className="w-full max-w-170">
                {videos.map(video => (
                    <div key={video.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-4 border border-gray-200 dark:border-gray-700">

                        <div className="flex items-center gap-3 p-4">
                            <img src={video.author.avatarUrl} alt={video.author.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{video.author.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{video.createdAt}</p>
                            </div>
                        </div>

                        <div className="px-4 pb-3">
                            <p className="text-gray-800 dark:text-gray-200 text-sm">{video.description}</p>
                        </div>

                        {/* Contenedor del video con botón Play superpuesto */}
                        <div className="relative w-full bg-black cursor-pointer group">
                            <img src={video.thumbnailUrl} alt="Thumbnail" className="w-full max-h-100 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-white ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                                {video.duration}
                            </div>
                        </div>

                        <div className="px-4 py-2 flex justify-between text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                            <span>{video.viewsCount} reproducciones</span>
                            <span>👍 {video.likesCount}</span>
                        </div>

                        <div className="flex justify-between px-2 py-1">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <ThumbsUp className="w-5 h-5" /> Me gusta
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <MessageSquare className="w-5 h-5" /> Comentar
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Share2 className="w-5 h-5" /> Compartir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}