import { useEffect, useState } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { io, Socket } from "socket.io-client";
import {
  addMessage,
  setChatProfiles,
  setLoadingMessages,
  setLoadingProfile,
  setLoadingProfiles,
  setMessages,
  setSelectedProfile,
} from "../redux/chat/chatSlice";
import { useAppState } from "./useAppState";
import { ChatProfile, Message, MessagePayload, User } from "../d";

const { REACT_APP_SOCKET_URL } = process.env;

export const useChatSocket = () => {
  const dispatch = useAppDispatch();
  const { tokens, user } = useAppState().authenticate;
  const [socket, setSocket] = useState<Socket | null>(null);

  // Emmitters

  function getChatProfiles() {
    socket?.emit("getChatProfiles");
  }

  function getChatHistory(receiverId: string) {
    socket?.emit("getChatHistory", receiverId);
  }

  function getUserProfile(userId: string) {
    socket?.emit("getUserProfile", userId);
  }

  function sendMessage(payload: MessagePayload) {
    socket?.emit("message", payload);
  }

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

      // Listners
      newSocket.on("connect", () => {
        console.log("Socket connected:", user?.name);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", user?.name, reason);
      });

      newSocket.on("chatProfiles", (profiles) => {
        dispatch(setChatProfiles(profiles));
        dispatch(setLoadingProfiles(false));
      });

      newSocket.on("userProfile", (profile: User) => {
        const chatProfile: ChatProfile = {
          id: "to be generated",
          user: profile,
          lastMessage: null,
          lastMessageDate: null,
        };
        dispatch(setSelectedProfile(chatProfile));
        dispatch(setLoadingProfile(false));
      });

      newSocket.on("chatHistory", (history) => {
        dispatch(setMessages(history));
        dispatch(setLoadingMessages(false));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user?.name, user?.id, tokens?.accessToken]);

  return {
    socket,
    getChatProfiles,
    getChatHistory,
    getUserProfile,
    sendMessage,
  };
};
