import { FC, useState } from "react";
import {
  useAppState,
  useChatScroll,
  useChatSocket,
} from "../../../../../hooks";
import { Message, MessagePayload } from "../../../../../d";
import { Avatar, Divider, Input } from "antd";
import { Send } from "../../../../../icons";

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

export const ChatMessagesList: FC = () => {
  const { chat, authenticate } = useAppState();
  const { sendMessage } = useChatSocket();
  const chatScrollRef = useChatScroll(chat.messages);
  const [messageText, setMessageText] = useState<string>("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <>
      <div
        style={{
          minHeight: "414px",
          maxHeight: "414px",
          overflowY: "auto",
        }}
        ref={chatScrollRef}
      >
        <div
          style={{
            rowGap: "1rem",
            display: "flex",
            flexDirection: "column",
            padding: "0 24px",
          }}
        >
          {chat.messages.map((message: Message, index: number) => {
            const senderName =
              message.senderId === authenticate.user?.id
                ? "You"
                : chat.selectedProfile?.user.name;
            return (
              <div style={{}} key={index}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    size={40}
                    src={
                      senderName === "You"
                        ? `${REACT_APP_IMAGE_BASIC_PATH}${authenticate.user?.avatar}`
                        : chat.selectedProfile?.user.avatar
                        ? `${REACT_APP_IMAGE_BASIC_PATH}${chat.selectedProfile?.user.avatar}`
                        : "https://gravatar.com/avatar?s=300&d=mp"
                    }
                  />
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      marginLeft: "16px",
                    }}
                  >
                    {senderName}
                  </p>
                  <p
                    style={{
                      fontWeight: "300",
                      marginLeft: "8px",
                      color: "#666668",
                    }}
                  >
                    {formatDate(message.createdAt)}
                  </p>
                </div>
                <p style={{ marginLeft: "56px" }}>{message.message}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Divider style={{ margin: 0 }} />
        <Input
          variant="borderless"
          placeholder="Type a message"
          addonAfter={
            <button style={{ border: "none" }}>
              <Send />
            </button>
          }
          style={{ padding: "8px 0" }}
          size="large"
          value={messageText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessageText(e.target.value)
          }
          onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            const message: MessagePayload = {
              senderId: authenticate.user!.id,
              receiverId: chat.selectedProfile!.user.id,
              message: target.value,
            };
            sendMessage(message);
            setMessageText("");
          }}
        />
      </div>
    </>
  );
};
