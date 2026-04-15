import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { ThemeToggleButton } from "@/components/layouts/theme-toggle-button";
import { CalendarIcon } from "../../assets/calendar-icon";
import { formatDate } from "../../utils/format-date";
import UserMenu from "./user-menu";
import LanguageSwitcher from "@/components/misc/language-switcher";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const dateString = formatDate(new Date());

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        m: 2,
        borderRadius: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Section */}
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={toggleSidebar}
            sx={{
              display: { xs: "block", md: isSidebarOpen ? "none" : "block" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            ml={2}
          >
            <CalendarIcon strokeColor="currentColor" />
            <Typography variant="subtitle1" ml={1}>
              {dateString}
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Stack direction="row" spacing={2} alignItems="center">
          <LanguageSwitcher />
          <ThemeToggleButton />
          <UserMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};