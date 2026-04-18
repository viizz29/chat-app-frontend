import { useTranslation } from "react-i18next";
import ChatUIExample from "@/features/home/chatui-example";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRooms, type Room } from "@/api/room-api";
import { Box, Grid, Paper, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";


interface Props {
  users: Room[],
  onSelectUser: (userId: string) => void;
}



const UserList: React.FC<Props> = ({ users, onSelectUser }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItemButton key={user.id} onClick={() => onSelectUser(user.id)}>
          <ListItemText primary={user.title} />
        </ListItemButton>
      ))}
    </List>
  );
};


export default function Home() {
  const { t } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: chatHandles = [], isLoading } = useQuery({
    queryKey: ["chat-handles"],
    queryFn: getRooms,
  });


  if (isLoading) return <div className="text-center mt-10">Loading...</div>;


  return (

    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>

        {/* LEFT: User List */}
        <Grid size={{ xs: 4, md: 3, lg: 2 }}>
          <Paper sx={{ height: "100%", overflowY: "auto" }}>
            <UserList users={chatHandles} onSelectUser={setSelectedRoom} />
          </Paper>
        </Grid>

        {/* RIGHT: Chat Window */}
        <Grid size={{ xs: 8, md: 9, lg: 10 }}>
          <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {selectedRoom ?
              <ChatUIExample roomId={selectedRoom} /> : <div>Select a chat handle.</div>}
          </Paper>
        </Grid>

      </Grid>
    </Box>


  );
}

