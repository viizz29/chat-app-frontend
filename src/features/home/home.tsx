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
  rooms: Room[],
  onRoomSelected: (room: Room) => void;
}



const RoomList: React.FC<Props> = ({ rooms, onRoomSelected: onSelectUser }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);


  const handleClick = (room: Room) => {
    setSelectedUserId(room.id);
    onSelectUser(room);
  };

  return (
    <List>
      {rooms.map((user) => (
        <ListItemButton
          key={user.id}
          selected={selectedUserId === user.id}
          onClick={() => handleClick(user)}
        >
          <ListItemText primary={user.title} />
        </ListItemButton>
      ))}
    </List>
  );
};


export default function Home() {
  const { t } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
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

    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="top"
        height="50px">
        <div>
          <SearchWidget onSelect={(user: UserRecord) => {
            mutation.mutate(user);
          }} />
        </div>

      </Box>
      <Grid container sx={{ height: "50%" }}>

        {/* LEFT: User List */}
        <Grid size={{ xs: 4, md: 3, lg: 2 }}>
          <Paper sx={{ height: "100%", overflowY: "auto" }}>
            <RoomList rooms={chatHandles} onRoomSelected={setSelectedRoom} />
          </Paper>
        </Grid>

        {/* RIGHT: Chat Window */}
        <Grid size={{ xs: 8, md: 9, lg: 10 }}>
          <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {selectedRoom ?
              <ChatUIExample room={selectedRoom} /> : <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="500px"
              >
                <div className="flex flex-col">
                  <div>{t("select_chat_handle")}</div>
                  <Animation1 />
                </div>

              </Box>}
          </Paper>
        </Grid>

      </Grid>
    </Box>


  );
}

