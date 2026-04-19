import { useStorage } from "@/components/misc/local-storage-provider";
import { useThemeController } from "@/theme/theme-context";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

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

    const mode = get("mode") || "light";

    return (
        <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
            <IconButton color="inherit" onClick={toggleTheme}>
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </Tooltip>
    );
}