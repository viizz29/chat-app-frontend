import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  ClickAwayListener,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchUsers, type UserRecord } from "@/api/user-api";
import { useTranslation } from "react-i18next";

type Props = {
  onSelect: (user: UserRecord) => void;
};

const SearchWidget: React.FC<Props> = ({ onSelect }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(input);
    }, 400);

    return () => clearTimeout(timer);
  }, [input]);

  // React Query
  const { data = [], isLoading } = useQuery({
    queryKey: ["users", debounced],
    queryFn: () => searchUsers(debounced),
    enabled: !!debounced,
    staleTime: 1000 * 60 * 5,
  });

  // Open dropdown when results come
  useEffect(() => {
    if (data.length > 0) {
      setOpen(true);
    }
  }, [data]);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ position: "relative", width: 300 }}>
        <TextField
          fullWidth
          size="small"
          placeholder={t("search_users")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => data.length > 0 && setOpen(true)}
        />

        {open && (
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              mt: 0.5,
              maxHeight: 250,
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            {isLoading && (
              <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={20} />
              </Box>
            )}

            {!isLoading && data.length === 0 && (
              <Typography sx={{ p: 2 }} variant="body2">
                No results
              </Typography>
            )}

            {!isLoading && data.length > 0 && (
              <List dense>
                {data.map((user) => (
                  <ListItemButton
                    key={user.id}
                    onClick={() => {
                      onSelect(user);
                      setInput("");
                      setOpen(false);
                    }}
                  >
                    <ListItemText primary={user.name} />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchWidget;