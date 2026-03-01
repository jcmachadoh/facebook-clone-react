import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; // Un ícono de carga bonito

// 1. Cambiamos las importaciones estáticas por importaciones perezosas (Lazy)
const Home = lazy(() => import('../pages/Home').then(module => ({ default: module.Home })));
const Profile = lazy(() => import('../pages/Profile').then(module => ({ default: module.Profile })));
const Notifications = lazy(() => import('../pages/Notifications').then(module => ({ default: module.Notifications })));
const Friends = lazy(() => import('../pages/Friends').then(module => ({ default: module.Friends })));
const Marketplace = lazy(() => import('../pages/Markeplace').then(module => ({ default: module.Marketplace })));
const Video = lazy(() => import('../pages/Videos').then(module => ({ default: module.Videos })));
import Memories from '../pages/Memories';
import Saves from '../pages/Saves';
import Conversations from '../pages/Conversations';
import Messages from '../components/_sidebar/Messages';

// Creamos un pequeño componente de carga para mostrar mientras se descarga la página
const PageLoader = () => (
  <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
    <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium">Cargando...</p>
  </div>
);

export const AppRouter = () => {
  return (
    // 2. Envolvemos nuestras rutas en <Suspense>
    // 'fallback' es lo que se mostrará en pantalla mientras el código viaja por internet
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/video' element={<Video />} />
        <Route path='/memories' element={<Memories />} />
        <Route path='/saves' element={<Saves />} />
        <Route path='/conversations' element={<Conversations />} />
        <Route path='/message/:id' element={<Messages />} />
      </Routes>
    </Suspense>
  );
};