import { useTranslation } from "react-i18next";
import ChatUIExample from "@/features/home/chatui-example";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRoom, getRooms, type Room } from "@/api/room-api";
import { Box, Grid, Paper, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import SearchWidget from "@/features/home/search-widget";
import type { UserRecord } from "@/api/user-api";
import { toast } from "react-toastify";
import Animation1 from "@/components/misc/animation1";


interface Props {
  users: Room[],
  onSelectUser: (userId: string) => void;
}



const UserList: React.FC<Props> = ({ users, onSelectUser }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setSelectedUserId(id);
    onSelectUser(id);
  };

  return (
    <List>
      {users.map((user) => (
        <ListItemButton
          key={user.id}
          selected={selectedUserId === user.id}
          onClick={() => handleClick(user.id)}
        >
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

  const mutation = useMutation({
    mutationFn: (user: UserRecord) =>
      createRoom(user.id),

    onSuccess: (data) => {
      toast.info(`New connection created!`);
      queryClient.invalidateQueries({ queryKey: ["chat-handles"] });
    },

    onError: (error) => {
      console.error(error);
      alert("Could not create room." + JSON.stringify(error));
    },
  });


  if (isLoading) return <div className="text-center mt-10">Loading...</div>;


  return (

    <Box sx={{ height: "100vh" }}>
      <Box sx={{ alignContent: 'center' }}>
        <SearchWidget onSelect={(user: UserRecord) => {
          mutation.mutate(user);
        }} />
      </Box>
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
              <ChatUIExample roomId={selectedRoom} /> : <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="500px"
              >
                <div className="flex flex-col">
                  <div>Select a chat handle.</div>
                  <Animation1 />
                </div>

              </Box>}
          </Paper>
        </Grid>

      </Grid>
    </Box>


  );
}

