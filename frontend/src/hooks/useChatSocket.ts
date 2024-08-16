import { useEffect, useState } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { io, Socket } from "socket.io-client";
import {
  addMessage,
  setChatProfiles,
  setMessages,
  setSelectedProfile,
} from "../redux/chat/chatSlice";
import { useAppState } from "./useAppState";
import { ChatProfile, Message, User } from "../d";

const { REACT_APP_SOCKET_URL } = process.env;

export const useChatSocket = () => {
  const dispatch = useAppDispatch();
  const { tokens, user } = useAppState().authenticate;
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      console.log("Connecting socket");
      const newSocket: Socket = io(
        REACT_APP_SOCKET_URL
          ? `${REACT_APP_SOCKET_URL}?name=${user?.name}&sub=${user?.id}`
          : `http://localhost:1111?name=${user?.name}&sub=${user?.id}`,
        {
          extraHeaders: { Authorization: `Bearer ${tokens?.accessToken}` },
          reconnectionAttempts: 5,
          reconnectionDelay: 2000,
        }
      );

      newSocket.on("connect", () => {
        console.log("Socket connected:", user?.name);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", user?.name, reason);
      });

      newSocket.on("chatProfiles", (profiles) => {
        console.log("Chat Profiles:", profiles);
        dispatch(setChatProfiles(profiles));
      });

      newSocket.on("userProfile", (profile: User) => {
        const chatProfile: ChatProfile = {
          id: "to be generated",
          user: profile,
          lastMessage: null,
          lastMessageDate: null,
        };
        dispatch(setSelectedProfile(chatProfile));
        newSocket.emit("getChatHistory", profile.id);
      });

      newSocket.on("chatHistory", (history) => {
        dispatch(setMessages(history));
      });

      newSocket.on("message", (payload: Message) => {
        dispatch(addMessage(payload));
      });

      setSocket(newSocket);

      return () => {
        console.log("Disconnecting socket");
        newSocket.disconnect();
      };
    }
  }, [dispatch, user?.name, user?.id, tokens?.accessToken]);

  return socket;
};
