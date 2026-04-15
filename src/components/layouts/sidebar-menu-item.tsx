import { type ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
} from "@mui/material";

interface SidebarMenuItemProps {
    icon: ReactNode;
    activeIcon: ReactNode;
    name: string;
    children: ReactNode;
}

export const SidebarMenuItem = ({
    icon,
    activeIcon,
    children,
    name,
}: SidebarMenuItemProps) => {
    const location = useLocation();
    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        if (location && name) {
            if (location.pathname.startsWith(`/${name}`)) {
                setSelected(true);
            } else if (location.pathname === name) {
                setSelected(true);
            } else {
                setSelected(false);
            }
        }
    }, [location, name]);

    return (
        <Paper
            elevation={selected ? 3 : 1}
            sx={{
                m: 1,
                borderRadius: 2,
                bgcolor: selected ? "action.selected" : "background.paper",
            }}
        >
            <ListItemButton selected={selected}>
                <ListItemIcon>
                    {selected ? activeIcon : icon}
                </ListItemIcon>

                <ListItemText
                    primary={children}
                    slotProps={{
                        primary: {
                            sx: {
                                color: selected ? "text.primary" : "text.secondary",
                                fontWeight: selected ? 600 : 400,
                            },
                        },
                    }}
                />
            </ListItemButton>
        </Paper>
    );
};