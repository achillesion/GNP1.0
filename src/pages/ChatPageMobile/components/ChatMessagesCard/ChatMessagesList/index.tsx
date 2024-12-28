import { FC, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useAppDispatch,
  useAppState,
  useChatSocket,
} from "../../../../../hooks";
import { Message } from "../../../../../d";
import { Avatar, Divider, Input } from "antd";
import { Clock, DoubleTick, Send, Error } from "../../../../../icons";
import { addMessage } from "../../../../../redux/store";

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

const MESSAGE_STATUS = {
  SENDING: <Clock />,
  SENT: <DoubleTick />,
  FAILED: <Error />,
};

export const ChatMessagesList: FC = () => {
  const { chat, authenticate } = useAppState();
  const dispatch = useAppDispatch();
  const socket = useChatSocket();
  const [messageText, setMessageText] = useState<string>("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [lastMessageCount, setLastMessageCount] = useState<number>(0);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }

  function handleSendMessage() {
    const message: Message = {
      id: uuidv4(),
      senderId: authenticate.user!.id,
      receiverId: chat.selectedProfile!.user.id,
      message: messageText,
      createdAt: new Date().toISOString(),
      status: "SENDING",
    };
    dispatch(addMessage(message));
    socket?.emit("message", message);
    setMessageText("");
  }

  useEffect(() => {
    // Scroll to the last message if a new message is added
    if (chat.messages.length > lastMessageCount) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      setLastMessageCount(chat.messages.length);
    }
  }, [chat.messages, lastMessageCount]);

  return (
    <>
      <div
        style={{
          rowGap: "1rem",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "60px",
        }}
      >
        {chat.messages.map((message: Message, index: number) => {
          const senderName =
            message.senderId === authenticate.user?.id
              ? "You"
              : chat.selectedProfile?.user.name;

          return (
            <div
              key={index}
              ref={index === chat.messages.length - 1 ? lastMessageRef : null}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
                <span style={{ color: "#666668" }}>
                  {message.status
                    ? MESSAGE_STATUS[message.status]
                    : MESSAGE_STATUS["SENT"]}
                </span>
              </div>
              <p style={{ marginLeft: "56px" }}>{message.message}</p>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Divider style={{ margin: 0 }} />
        <Input
          variant="borderless"
          placeholder="Type a message"
          addonAfter={
            <button onClick={handleSendMessage}>
              <Send />
            </button>
          }
          style={{ padding: "8px 0" }}
          size="large"
          value={messageText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessageText(e.target.value)
          }
          onPressEnter={handleSendMessage}
        />
      </div>
    </>
  );
};
