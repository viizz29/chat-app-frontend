import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ProfileLogo from "../../assets/react.svg";
import { useAuth } from "../../auth/use-auth";

const UserAvatarIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Background circle */}
    <circle cx="12" cy="12" r="12" fill="#E0E0E0" />

    {/* Head */}
    <circle cx="12" cy="9" r="4" fill="#9E9E9E" />

    {/* Shoulders */}
    <path
      d="M6 18c0-3.314 2.686-6 6-6s6 2.686 6 6"
      fill="#9E9E9E"
    />
  </svg>
);



const UserMenu: React.FC = () => {
  const { user, isAuthReady, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isAuthReady) {
      setIsLoggedIn(!!user);
    }
  }, [isAuthReady, user]);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {!isLoggedIn ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      ) : (
        <>
          <Avatar
            onClick={handleProfileClick}
            sx={{
              width: 40,
              height: 40,
              cursor: "pointer",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <UserAvatarIcon />
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box px={2} py={1}>
              <Typography variant="body2">
                Hello, {user?.sub || "User"}!
              </Typography>
            </Box>

            <MenuItem
              onClick={() => {
                handleClose();
                logout();
              }}
              sx={{ color: "error.main" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default UserMenu;