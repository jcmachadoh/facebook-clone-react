import { Users, Clock, Bookmark, MonitorPlay, Store, ChevronDown } from 'lucide-react';
import type { Author } from '../interfaces/types'; // Ajusta la ruta si es necesario
import currentUserData from '../mocks/currentUser.json'; // Ajusta la ruta
import { SidebarItem } from './_sidebar/SidebarItem';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../store/';
import { translations } from '../i18n/translations';

const currentUser = currentUserData as Author;

// 2. Nuestro componente principal que usa el mini-componente
export const LeftSidebar = () => {

  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    // Las clases que ya teníamos: oculto en móviles, pegajoso al hacer scroll
    <aside className="hidden xl:flex flex-col w-75 h-[calc(100vh-3.5rem)] sticky top-14 pt-4 px-2 overflow-y-auto">

      {/* Enlace a nuestro perfil usando los datos del JSON */}
      <Link to={'/profile'}>
        <SidebarItem imageSrc={currentUser.avatarUrl} text={currentUser.name} />
      </Link>

      {/* Lista de accesos directos con íconos de Lucide */}
      {/* Le damos colores específicos a los íconos para simular el diseño original */}
      <Link to="/friends">
        <SidebarItem icon={<Users className="w-7 h-7 text-blue-500" />} text={t.friends} />
      </Link>
      <Link to={'/memories'}>
        <SidebarItem icon={<Clock className="w-7 h-7 text-blue-500" />} text={t.memories} />
      </Link>
      <Link to={'/saves'} >
        <SidebarItem icon={<Bookmark className="w-7 h-7 text-purple-500" />} text={t.saves} />
      </Link>
      <Link to="/video">
        <SidebarItem icon={<MonitorPlay className="w-7 h-7 text-blue-500" />} text={t.video} />
      </Link>
      <Link to="/marketplace">
        <SidebarItem icon={<Store className="w-7 h-7 text-blue-500" />} text={t.marketplace} />
      </Link>
      {/* Botón de "Ver más" con un fondo gris circular */}
      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors mt-1">
        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
          <ChevronDown className="w-5 h-5 text-gray-700" />
        </div>
        <span className="font-medium text-gray-900 dark:text-gray-100 text-[15px]">{t.seeMore}</span>
      </div>

      {/* Una línea divisoria suave (opcional, típico en FB) */}
      <hr className="border-gray-300 my-2 mx-2" />

      {/* Título de sección secundaria */}
      <div className="px-2 py-1">
        <h3 className="text-gray-500 dark:text-gray-400 font-semibold text-[17px]">{t.shortcuts}</h3>
      </div>

      {/* Aquí irían grupos o páginas, por ahora ponemos un ejemplo */}
      <SidebarItem
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80"
        text="Grupo de Programadores React"
      />

    </aside>
  );
};