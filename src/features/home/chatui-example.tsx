import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessages, fetchMessages, sendMessage } from "@/api/chat-message-apis";
import { useSocket } from "@/features/home/socket-provider";
import { toast } from "react-toastify";
import type { Room } from "@/api/room-api";
import { useTranslation } from "react-i18next";


interface Props {
  room: Room;
}


const ChatUIExample: React.FC<Props> = ({ room: { id: roomId, title: roomTitle } }) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const shouldAutoScrollRef = useRef(true);
  const prevScrollHeightRef = useRef(0);

  const socket = useSocket();


  useEffect(() => {
    if (socket) {
      return socket.addEventListener('new_message', (payload) => {
        const { roomId, content } = payload[0];

        const { type } = content;
        if (type == "text") {
          toast.info(content.content?.text);
        } else {
          toast.info(JSON.stringify(content));
        }

        queryClient.invalidateQueries({ queryKey: ["messages"] });

      });
    }
  }, [socket]);


  // useEffect(() => {
  //   socket.on("message", (data: {}) => {
  //     console.log("Received:", data);
  //   });

  //   return () => {
  //     socket.off("message");
  //   };
  // }, [socket]);



  // Infinite messages
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["messages", roomId],
    queryFn: (params: { pageParam: string | null }) => fetchMessages({ ...params, roomId }),
    getNextPageParam: (lastPage) => lastPage.prevCursorId,
    initialPageParam: null,
  });

  // const messages = data?.pages.flatMap((p) => p.data).reverse() ?? [];
  // const messages = data?.pages.flatMap((p) => p.data) ?? [];
  const messages =
    data?.pages
      .slice()
      .reverse()
      .flatMap((p) => p.data) ?? [];

  // Send mutation
  const sendMutation = useMutation({
    mutationFn: (formData: FormData) => sendMessage(roomId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setInput("");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteMessages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setSelected([]);
    },
  });

  // Scroll to bottom on new messages
  // useEffect(() => {
  //   if (listRef.current) {
  //     listRef.current.scrollTop = listRef.current.scrollHeight;
  //   }
  // }, [messages.length]);


  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const newScrollHeight = el.scrollHeight;

    if (shouldAutoScrollRef.current) {
      // User is at bottom → stick to bottom
      el.scrollTop = newScrollHeight;
    } else {
      // User is reading old messages → preserve position
      const diff = newScrollHeight - prevScrollHeightRef.current;
      el.scrollTop += diff;
    }

    prevScrollHeightRef.current = newScrollHeight;
  }, [messages]);


  // Detect scroll top → load older messages
  // const handleScroll = () => {
  //   if (!listRef.current) return;

  //   if (listRef.current.scrollTop === 0 && hasNextPage) {
  //     fetchNextPage();
  //   }
  // };

  const handleScroll = () => {
    if (!listRef.current) return;

    const el = listRef.current;

    // Detect near bottom
    const threshold = 100;
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    shouldAutoScrollRef.current = isNearBottom;

    // Load older messages
    if (el.scrollTop === 0 && hasNextPage) {
      prevScrollHeightRef.current = el.scrollHeight;
      fetchNextPage();
    }
  };

  // Send text
  const handleSend = () => {
    if (!input.trim()) return;

    const formData = new FormData();
    formData.append("text", input);

    sendMutation.mutate(formData);

    socket.test();

  };

  // Send file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    sendMutation.mutate(formData);
  };

  // Toggle selection
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Box display="flex" flexDirection="column" height="60vh" border="1px solid #ccc">
      {/* Header */}
      <Box p={1} display="flex" justifyContent="space-between">
        <Typography variant="h6">{t("talking_to", { name: roomTitle })}</Typography>
        {selected.length > 0 && (
          <Button
            startIcon={<DeleteIcon />}
            color="error"
            onClick={() => deleteMutation.mutate(selected)}
          >
            Delete ({selected.length})
          </Button>
        )}
      </Box>

      {/* Messages */}
      <Box
        ref={listRef}
        onScroll={handleScroll}
        flex={1}
        overflow="auto"
        p={1}


        display="flex"
        flexDirection="column"
        height="500px"
        border="1px solid #ccc"
        position="relative"   // 👈 important

      >
        {/* {status === "pending" && <CircularProgress />} */}

        {isFetchingNextPage && <CircularProgress size={20} />}

        <List>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              dense
            // secondaryAction={
            //   <Checkbox
            //     checked={selected.includes(msg.id)}
            //     onChange={() => toggleSelect(msg.id)}
            //   />
            // }
            >

              <Box sx={msg.direction == 'in' ? {} : { ml: "auto", textAlign: 'right' }}>
                <ListItemText
                  primary={
                    msg.content.type == "text" ? (
                      msg.content.content.text
                    ) : msg.content.content.fileUrl ? (
                      <a href={msg.content.content.fileUrl} target="_blank" rel="noreferrer">
                        {msg.content.content.fileType || "Attachment"}
                      </a>
                    ) : null
                  }
                  secondary={new Date(msg.createdAt).toLocaleString()}
                />

              </Box>

            </ListItem>
          ))}
        </List>

        {!shouldAutoScrollRef.current && (
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              if (listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight;
              }
            }}
            sx={{
              position: "absolute",
              bottom: 70, // above input box
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              borderRadius: "20px",
              boxShadow: 3,
            }}
          >
            New Messages ↓
          </Button>
        )}
      </Box>

      {/* Input */}
      <Box display="flex" p={1} gap={1}>
        {/* <IconButton onClick={() => fileRef.current?.click()}>
          <AttachFileIcon />
        </IconButton>
        <input
          type="file"
          hidden
          ref={fileRef}
          onChange={handleFileChange}
          accept="image/*,.pdf,.zip"
        /> */}

        <TextField
          fullWidth
          size="small"
          placeholder={t("type_a_message")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatUIExample;