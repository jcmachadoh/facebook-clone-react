import { Link, useLocation } from 'react-router-dom';

import { Home, Users, MonitorPlay, Store, Bell, Facebook, Moon, Sun, Globe, Menu } from "lucide-react";
import { TopNavButtoms } from "./_topnav/TopNavButtoms";
import { TopNavPestana } from "./_topnav/TopNavPestana";
import { TopNavSearch } from "./_topnav/TopNavSearch";

import currentUserData from "../mocks/currentUser.json";
import type { Author } from "../interfaces/types";

import { useThemeStore, useNotificationStore, useLanguageStore } from '../store/';

import { translations } from '../i18n/translations';

import { TopNotificationDropdown } from "./_topnav/TopNotificationDropdown";
import { TopSelectLanguage } from './_topnav/TopSelectLanguage';
import { TopMobileMenu } from './_topnav/TopMobileMenu';

const currentUser = currentUserData as Author;


export const TopNav = () => {

    // 1. Solo sacamos el arreglo de la pizarra (esto es seguro y no rompe la memoria)
    const notifications = useNotificationStore((state) => state.notifications);
    const { theme, toggleTheme } = useThemeStore();
    // 2. Hacemos el filtro fuera del hook de Zustand
    const unviewedNotifications = notifications.filter(n => !n.viewed);

    const location = useLocation();

    const { language } = useLanguageStore();

    // 2. Cargamos las traducciones para ese idioma específico
    const t = translations[language];
    // Ahora 't' tiene todas las palabras. Ej: t.home, t.friends


    return (
        <nav className="fixed top-0 w-full h-14 bg-white dark:bg-gray-800 shadow-md z-50 flex items-center px-4 justify-between">

            {/* LADO IZQUIERDO: Nuevo logo y Búsqueda */}
            <div className="flex items-center gap-2 basis-1/3">
                {/* Usamos el ícono de Facebook de Lucide */}
                {/* fill="currentColor" hace que se rellene del mismo color del texto (azul) */}
                <Link to="/">
                    <Facebook className="w-10 h-10 text-blue-600" fill="currentColor" />
                </Link>
                <TopNavSearch />
            </div>

            {/* CENTRO: Pestañas con tooltips */}
            <div className="hidden md:flex items-center justify-center gap-1 basis-1/3 h-full">
                <Link to="/">
                    <TopNavPestana
                        title={t.home}
                        icon={<Home className="w-7 h-7" />}
                        isActive={location.pathname === '/'} // <-- ¡Dinámico!
                        onClick={() => { }}
                    />
                </Link>
                <Link to={'/friends'} >
                    <TopNavPestana
                        title={t.friends}
                        icon={<Users className="w-7 h-7" />}
                        isActive={location.pathname === '/friends'} // <-- ¡Dinámico!
                        onClick={() => { }}
                    />
                </Link>
                <Link to={'/video'} >
                    <TopNavPestana
                        title={t.video}
                        icon={<MonitorPlay className="w-7 h-7" />}
                        isActive={location.pathname === '/video'} // <-- ¡Dinámico!
                        onClick={() => { }}
                    />
                </Link>
                <Link to={'/marketplace'}>
                    <TopNavPestana
                        title={t.marketplace}
                        icon={<Store className="w-7 h-7" />}
                        isActive={location.pathname === '/marketplace'} // <-- ¡Dinámico!
                        onClick={() => { }}
                    />
                </Link>
            </div>

            {/* LADO DERECHO: Botones con tooltips y Perfil */}
            <div className="flex items-center justify-end gap-2 basis-1/3">

                {/* 3A. VERSIÓN PC (Solo visible en pantallas medianas/grandes 'md:flex') */}
                <div className="hidden md:flex items-center gap-2">
                    {/* <TopNavButtoms title={t.menu} icon={<Grid className="w-5 h-5" />} onClick={() => { }} /> */}
                    {/* <Link to={'/conversations'}>
                        <TopNavButtoms title={t.messenger} icon={<MessageCircle className="w-5 h-5" />} onClick={() => { }} />
                    </Link> */}
                    <Link to={'/notifications'}>
                        <TopNavButtoms title={t.notifications} icon={<Bell className="w-5 h-5" />} notification={unviewedNotifications} dropdown={<TopNotificationDropdown />} onClick={() => { }} />
                    </Link>
                    <TopNavButtoms title={theme === 'dark' ? t.switchLight : t.switchDark} icon={theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} onClick={toggleTheme} />
                    <TopNavButtoms title="Idioma" icon={<Globe className="w-5 h-5" />} dropdown={<TopSelectLanguage />} onClick={() => { }} />
                </div>

                {/* 3B. VERSIÓN MÓVIL (Solo visible en pantallas pequeñas 'flex md:hidden') */}
                <div className="flex md:hidden items-center gap-2">
                    <TopNavButtoms title="Idioma" icon={<Globe className="w-5 h-5" />} dropdown={<TopSelectLanguage />} onClick={() => { }} />
                    {/* Botón Hamburguesa con nuestro nuevo menú */}
                    <TopNavButtoms
                        title="Menú"
                        icon={<Menu className="w-6 h-6" />}
                        onClick={() => { }}
                        dropdown={<TopMobileMenu />}
                    />
                </div>

                {/* PERFIL (Visible siempre) */}
                <div className="group relative flex items-center justify-center">
                    <Link to="/profile">
                        <img src={currentUser.avatarUrl} alt="Perfil" className="w-10 h-10 rounded-full object-cover ml-2 cursor-pointer border border-gray-200 dark:border-gray-700" />
                    </Link>
                </div>
            </div>

        </nav>
    );
};