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


const ChatUIExample: React.FC = () => {
  const queryClient = useQueryClient();

  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const socket = useSocket();


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
    queryKey: ["messages"],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage.prevCursor,
    initialPageParam: null,
  });

  const messages = data?.pages.flatMap((p) => p.data).reverse() ?? [];

  // Send mutation
  const sendMutation = useMutation({
    mutationFn: sendMessage,
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
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  // Detect scroll top → load older messages
  const handleScroll = () => {
    if (!listRef.current) return;

    if (listRef.current.scrollTop === 0 && hasNextPage) {
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
    <Box display="flex" flexDirection="column" height="500px" border="1px solid #ccc">
      {/* Header */}
      <Box p={1} display="flex" justifyContent="space-between">
        <Typography variant="h6">Chat</Typography>
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
      >
        {/* {status === "pending" && <CircularProgress />} */}

        {isFetchingNextPage && <CircularProgress size={20} />}

        <List>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              dense
              secondaryAction={
                <Checkbox
                  checked={selected.includes(msg.id)}
                  onChange={() => toggleSelect(msg.id)}
                />
              }
            >
              <ListItemText
                primary={
                  msg.text ? (
                    msg.text
                  ) : msg.fileUrl ? (
                    <a href={msg.fileUrl} target="_blank" rel="noreferrer">
                      {msg.fileType || "Attachment"}
                    </a>
                  ) : null
                }
                secondary={new Date(msg.createdAt).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Input */}
      <Box display="flex" p={1} gap={1}>
        <IconButton onClick={() => fileRef.current?.click()}>
          <AttachFileIcon />
        </IconButton>
        <input
          type="file"
          hidden
          ref={fileRef}
          onChange={handleFileChange}
          accept="image/*,.pdf,.zip"
        />

        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatUIExample;