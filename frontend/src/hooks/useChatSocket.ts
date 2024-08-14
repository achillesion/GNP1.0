import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { addMessage } from "../redux/chat/chatSlice";
const { REACT_APP_SOCKET_URL } = process.env;

const socket: Socket = io(REACT_APP_SOCKET_URL || "http://localhost:1111");

export const useChatSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("message", (payload: { sender: string; message: string }) => {
      dispatch(addMessage(payload));
    });

    return () => {
      socket.off("message");
    };
  }, [dispatch]);

  return socket;
};
