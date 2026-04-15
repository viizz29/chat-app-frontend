import { useStorage } from "@/components/misc/local-storage-provider";
import { useThemeController } from "@/theme/theme-context";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const ThemeToggleButton = () => {
    const { toggleTheme } = useThemeController();
    const [darkMode, setDarkMode] = useState(false);
    const { get, set, remove } = useStorage();

    useEffect(() => {
        const root = document.documentElement;

        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        toggleTheme();
    }, [darkMode]);


    const toggleMode = () => {
         setDarkMode(!darkMode);
         set("mode", !darkMode ? "dark" : "light");
    }


    useEffect(() => {
        const mode = get("mode") || "light";
        setDarkMode(mode == "dark");
    }, []);


    return (
        <div onClick={() => toggleMode()} className="text-primaryTextColor border p-2 bg-primaryBackgroundColor">
            <Button variant="contained">
                Toggle Theme
            </Button>
        </div>
    );
}