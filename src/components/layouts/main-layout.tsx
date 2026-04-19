import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";


import { SidebarHeader } from "./siderbar-header-component";
import { Header } from "./header-component";
import { ActiveStocksIcon } from "@/assets/active-stocks-icon";

const drawerWidth = 240;

const PageLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const menuItems = [
    { label: "Home", path: "/" },
    // { label: "Settings", path: "/settings" },
  ];

  const isSelected = (path: string) => {
    if (location && path) {
      if (location.pathname.startsWith(`/${path}`)) {
        return true;
      } else if (location.pathname === path) {
        return true;
      } else {
        return false;
      }
    }
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary" // mobile behavior
        open={isSidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box display="flex" flexDirection="column" height="100%">
          {/* Sidebar Header */}
          <SidebarHeader
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />

          {/* Menu */}
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                onClick={toggleSidebar}
                selected={isSelected(item.path)}
              >
                <ListItemIcon>
                  <ActiveStocksIcon strokeColor="#667085" />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            m: 2,
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;