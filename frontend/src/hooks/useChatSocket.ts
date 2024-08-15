import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { addMessage } from "../redux/chat/chatSlice";
import { useAppState } from "./useAppState";
import { Message } from "../d";

const { REACT_APP_SOCKET_URL } = process.env;

export const useChatSocket = () => {
  const dispatch = useDispatch();
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

      newSocket.on("message", (payload: Message) =>
        dispatch(addMessage(payload))
      );

      setSocket(newSocket);

      return () => {
        console.log("Disconnecting socket");
        newSocket.disconnect();
      };
    }
  }, [dispatch, user?.name, user?.id, tokens?.accessToken]);

  return socket;
};
