import sass from "./ChatPage.module.scss";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppState, useChatSocket } from "../../hooks";
import { useSocket } from "../../hooks/useChatSocket";
import { Search } from "../../icons";
import { Divider } from "../../components";
import { ChatProfilesCard } from "./components/ChatProfilesCard";
import { SearchChatProfileValues } from "../../d";
import { validationSchema } from "./components/ChatProfilesCard/SearchChatProfilesInput/validationSchema";
import { SearchChatProfilesInput } from "./components/ChatProfilesCard/SearchChatProfilesInput";
import { ChatProfilesList } from "./components/ChatProfilesCard/ChatProfilesList";
import { ChatMessagesCard } from "./components/ChatMessagesCard";
import { Avatar, Skeleton, Space } from "antd";
import { ChatMessagesList } from "./components/ChatMessagesCard/ChatMessagesList";
import {
  setLoadingMessages,
  setLoadingProfile,
  setLoadingProfiles,
  setSelectedProfile,
} from "../../redux/store";

const initialValues: SearchChatProfileValues = {
  name: "",
};

const USER_STATUS_COLOR_MAP = {
  ONLINE: "#00ff00",
  OFFLINE: "#ff0000",
  AWAY: "#ffcc00",
};

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

export const ChatPage: FC = () => {
  const socket = useChatSocket(); // Initialize the socket connection
  const chat = useAppState().chat;
  const dispatch = useAppDispatch();
  const params = useParams<{ receiverId: string }>();

  const onSubmit = async (values: SearchChatProfileValues) => {
    // TODO: Implement search chat profiles
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (socket) {
      dispatch(setLoadingProfiles(true));
      socket.emit("getChatProfiles");
      socket.emit("getActiveUsers");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (socket && chat.selectedProfile) {
      dispatch(setLoadingMessages(true));
      socket.emit("getChatHistory", chat.selectedProfile.user.id);
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
        dispatch(setLoadingProfile(true));
        socket?.emit("getUserProfile", params.receiverId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.receiverId, socket]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedProfile(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={sass.wrapper}>
        <>
          <div className={sass.top}>
            <h2 className={sass.title}>Messenger</h2>
            <div style={{ marginBottom: "16px" }}>
              <Divider />
            </div>
          </div>
          <div className={sass.chatBody}>
            <div className={sass.chatCard}>
              <ChatProfilesCard title="Chats">
                <SearchChatProfilesInput
                  placeholder="Search chats"
                  icon={<Search />}
                  label=""
                  formik={formik}
                />
                <Divider />
                {chat.isLoadingProfiles ? (
                  <div className={sass.chatProfilesSkeleton}>
                    <Skeleton.Button block active size="large" />
                    <Skeleton.Button block active size="large" />
                    <Skeleton.Button block active size="large" />
                    <Skeleton.Button block active size="large" />
                    <Skeleton.Button block active size="large" />
                  </div>
                ) : chat.chatProfiles.length ? (
                  <ChatProfilesList />
                ) : (
                  <p>No chats you did...</p>
                )}
              </ChatProfilesCard>
            </div>
            {!!chat.selectedProfile && (
              <div className={sass.chatCard}>
                <ChatMessagesCard
                  title={
                    chat.isLoadingProfile ? (
                      <Space style={{ padding: "5px 0" }}>
                        <Skeleton.Avatar active />
                        <Skeleton.Input active />
                      </Space>
                    ) : (
                      <div className={sass.chatSelected}>
                        <Avatar
                          size={50}
                          src={
                            chat.selectedProfile?.user.avatar
                              ? `${REACT_APP_IMAGE_BASIC_PATH}${chat.selectedProfile?.user.avatar}`
                              : "https://gravatar.com/avatar?s=300&d=mp"
                          }
                        />
                        <div className={sass.chatSelectedBody}>
                          <div className={sass.title}>
                            {chat.selectedProfile.user.name}
                          </div>
                          <div className={sass.chatSelectedStatus}>
                            <p
                              className={sass.chatSelectedIndicator}
                              style={{
                                backgroundColor:
                                  USER_STATUS_COLOR_MAP[
                                    chat.activeUsers[
                                      chat.selectedProfile.user.id
                                    ] || "OFFLINE"
                                  ],
                              }}
                            ></p>
                            {chat.activeUsers[chat.selectedProfile.user.id] ||
                              "OFFLINE"}
                          </div>
                        </div>
                      </div>
                    )
                  }
                >
                  {chat.isLoadingMessages ? (
                    <div className={sass.chatMessagesSkeleton}>
                      <Skeleton avatar active paragraph={{ rows: 1 }} />
                      <Skeleton avatar active paragraph={{ rows: 1 }} />
                      <Skeleton avatar active paragraph={{ rows: 1 }} />
                      <Skeleton avatar active paragraph={{ rows: 1 }} />
                    </div>
                  ) : (
                    <ChatMessagesList />
                  )}
                </ChatMessagesCard>
              </div>
            )}
          </div>
        </>
      </div>
    </>
  );
};
