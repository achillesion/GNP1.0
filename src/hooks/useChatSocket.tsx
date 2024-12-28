import { createContext, useContext, useMemo, useEffect, FC } from "react";
import { useAppDispatch, useAppState } from ".";
import SocketManager from "../SocketManager";
import {
  setChatProfiles,
  setLoadingMessages,
  setLoadingProfile,
  setLoadingProfiles,
  setMessages,
  setSelectedProfile,
  updateMessageStatus,
  addMessage,
  updateChatProfile,
  setActiveUsers,
  updateActiveUser,
  updateLastSeen,
} from "../redux/store";
import { Socket } from "socket.io-client";
import { UserStatusPayload } from "../d";

const { REACT_APP_SOCKET_URL } = process.env;

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { tokens, user } = useAppState().authenticate;

  const socket = useMemo(() => {
    if (user && tokens?.accessToken) {
      const SOCKET_URL = REACT_APP_SOCKET_URL || "http://localhost:3000/socket";
      return SocketManager.getInstance(
        `${SOCKET_URL}?name=${user.name}&sub=${user.id}`,
        {
          extraHeaders: { Authorization: `Bearer ${tokens.accessToken}` },
          reconnectionAttempts: 5,
          reconnectionDelay: 2000,
          secure: true,
        }
      );
    }
    return null;
  }, [user, tokens]);

  useEffect(() => {
    if (socket && user && tokens?.accessToken) {
      socket.on("connect", () => {
        console.log("Socket connected:", user.name);
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", user.name, reason);
      });

      socket.on("chatProfiles", (profiles) => {
        dispatch(setChatProfiles(profiles));
        dispatch(setLoadingProfiles(false));
      });

      socket.on("chatProfile", (profile) => {
        dispatch(updateChatProfile(profile));
      });

      socket.on("userProfile", (profile) => {
        const chatProfile = {
          id: "to be generated",
          user: profile,
          lastMessage: null,
          lastMessageDate: null,
          lastSeen: null,
        };
        dispatch(setSelectedProfile(chatProfile));
        dispatch(setLoadingProfile(false));
      });

      socket.on("chatHistory", (history) => {
        dispatch(setMessages(history));
        dispatch(setLoadingMessages(false));
      });

      socket.on("message", (payload) => {
        if (payload.senderId === user.id) {
          dispatch(updateMessageStatus({ id: payload.id, status: "SENT" }));
        } else {
          dispatch(addMessage(payload));
        }
      });

      socket.on("lastSeen", (payload) => {
        console.log("lastSeen", payload);
        dispatch(updateLastSeen(payload));
      });

      socket.on("activeUsers", (users: [string][]) => {
        dispatch(setActiveUsers(Object.fromEntries(users)));
      });

      socket.on("userStatus", (status: UserStatusPayload) => {
        dispatch(updateActiveUser(status));
      });

      return () => {
        SocketManager.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, socket, user?.name, user?.id, tokens?.accessToken]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useChatSocket = () => useContext(SocketContext);
