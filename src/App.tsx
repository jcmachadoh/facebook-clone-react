import { useEffect } from "react"
import { } from 'react-router-dom';

import { TopNav } from "./components/TopNav"
import { useThemeStore } from './store/useThemeStore';
import { AppRouter } from "./routes/AppRouter";

export const App = () => {

    const { theme } = useThemeStore();

    // 2. Usamos useEffect para inyectar la clase en el HTML cuando el tema cambie
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]); // Se ejecuta cada vez que "theme" cambie

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-700 dark:bg-gray-900 transition-colors duration-300">
            <TopNav />
            <AppRouter />
        </div>
    )
}
