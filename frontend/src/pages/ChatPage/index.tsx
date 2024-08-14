import { FC } from "react";
import { useChatSocket } from "../../hooks/useChatSocket";
import { useAppState } from "../../hooks";
import { Message } from "../../d";

export const ChatPage: FC = () => {
  const socket = useChatSocket(); // Initialize the socket connection
  const { chat, authenticate } = useAppState();

  return (
    <>
      <div>
        <h2>Chat</h2>
        <div>
          {chat.messages.map((msg, index) => (
            <div key={index}>
              {msg.sender}: {msg.message}
            </div>
          ))}
        </div>
        <input
          type="text"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              const target = e.target as HTMLInputElement;
              const message: Message = {
                sender: authenticate.user!.name,
                message: target.value,
              };
              socket.emit("message", message);
              target.value = "";
            }
          }}
        />
      </div>
    </>
  );
};
