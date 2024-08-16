import { FC } from "react";
import { useChatSocket } from "../../hooks/useChatSocket";
import { useAppState } from "../../hooks";
import { Message } from "../../d";
import { useParams } from "react-router-dom";
import { setSelectedProfile } from "../../redux/chat/chatSlice";

export const ChatPage: FC = () => {
  const socket = useChatSocket(); // Initialize the socket connection
  const dispatch = useAppDispatch();
  const { chat, authenticate } = useAppState();
  const params = useParams<{ receiverId: string }>();

  function getChatProfiles() {
    if (socket) {
      socket?.emit("getChatProfiles");
    }
  }

  function getChatHistory() {
    if (socket) {
      const receiverId = chat.selectedProfile?.user.id;
      socket?.emit("getChatHistory", receiverId);
    }
  }

  useEffect(() => {
    if (socket) {
      getChatProfiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (socket && chat.selectedProfile) {
      getChatHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat.selectedProfile]);

  useEffect(() => {
    if (params.receiverId) {
      const profile = chat.chatProfiles.find(
        (profile) => profile.user.id === params.receiverId
      );

      if (profile) {
        dispatch(setSelectedProfile(profile));
      } else {
        socket?.emit("getUserProfile", params.receiverId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.receiverId, socket]);

  return (
    <>
      <div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2>Chat Profiles</h2>
          <ul>
            {chat.chatProfiles.length ? (
              chat.chatProfiles.map((profile) => (
                <li
                  key={profile.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(setSelectedProfile(profile));
                  }}
                >
                  {profile.user.name} - {profile.lastMessage}
                </li>
              ))
            ) : (
              <li>No chat profiles found</li>
            )}
          </ul>
        </div>
        {!!chat.selectedProfile && (
          <>
            <div>
              {<h2>Selected Profile: {chat.selectedProfile?.user.name}</h2>}
              <h2>Chat History</h2>
              <ul>
                {chat.messages.length ? (
                  chat.messages.map((message: Message, index) => {
                    const senderName =
                      message.senderId === authenticate.user?.id
                        ? "You"
                        : chat.selectedProfile?.user.name;
                    return (
                      <li key={index}>
                        <strong>{senderName}</strong>: {message.message}
                      </li>
                    );
                  })
                ) : (
                  <li>No chat history found</li>
                )}
              </ul>
            </div>
            <div>
              <input
                type="text"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    const target = e.target as HTMLInputElement;
                    const message: Message = {
                      senderId: authenticate.user!.id,
                      receiverId: chat.selectedProfile!.user.id,
                      message: target.value,
                    };
                    socket?.emit("message", message);
                    target.value = "";
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
