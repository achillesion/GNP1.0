import sass from "./ChatPageMobile.module.scss";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppState, useChatSocket } from "../../hooks";
import { LeftChevron, Search } from "../../icons";
import { Divider } from "../../components";
import { ChatProfilesSection } from "./components/ChatProfilesCard";
import { SearchChatProfileValues } from "../../d";
import { validationSchema } from "./components/ChatProfilesCard/SearchChatProfilesInput/validationSchema";
import { SearchChatProfilesInput } from "./components/ChatProfilesCard/SearchChatProfilesInput";
import { ChatProfilesList } from "./components/ChatProfilesCard/ChatProfilesList";
import { ChatMessagesSection } from "./components/ChatMessagesCard";
import { Avatar, Skeleton, Space } from "antd";
import { ChatMessagesList } from "./components/ChatMessagesCard/ChatMessagesList";
import {
  setLoadingMessages,
  setLoadingProfile,
  setLoadingProfiles,
  setSelectedProfile,
} from "../../redux/store";
import { AccountNavigation } from "../AccountPage/components";

const initialValues: SearchChatProfileValues = {
  name: "",
};

const USER_STATUS_COLOR_MAP = {
  ONLINE: "#00ff00",
  OFFLINE: "#ff0000",
  AWAY: "#ffcc00",
};

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

export const ChatPageMobile: FC = () => {
  const socket = useChatSocket();
  const chat = useAppState().chat;
  const dispatch = useAppDispatch();
  const params = useParams<{ receiverId: string }>();
  const navigate = useNavigate();

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
      {!chat.selectedProfile && (
        <ChatProfilesSection
          title="Chats"
          banner={
            <>
              <SearchChatProfilesInput
                placeholder="Search chats"
                icon={<Search />}
                label=""
                formik={formik}
              />
              <Divider />
            </>
          }
        >
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
        </ChatProfilesSection>
      )}
      {!!chat.selectedProfile && (
        <ChatMessagesSection
          banner={
            chat.isLoadingProfile ? (
              <Space style={{ padding: "5px 0" }}>
                <Skeleton.Avatar active />
                <Skeleton.Input active />
              </Space>
            ) : (
              <>
                <div className={sass.chatSelected}>
                  <button
                    onClick={() => {
                      dispatch(setSelectedProfile(null));
                      navigate("/account/chat");
                    }}
                  >
                    <LeftChevron />
                  </button>
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
                      <div
                        className={sass.chatSelectedIndicator}
                        style={{
                          backgroundColor:
                            USER_STATUS_COLOR_MAP[
                              chat.activeUsers[chat.selectedProfile.user.id] ||
                                "OFFLINE"
                            ],
                        }}
                      ></div>
                      {chat.activeUsers[chat.selectedProfile.user.id] ||
                        "OFFLINE"}
                    </div>
                  </div>
                </div>
              </>
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
        </ChatMessagesSection>
      )}
      {!chat.selectedProfile && (
        <div className={sass.navigationActive}>
          <AccountNavigation />
        </div>
      )}
    </>
  );
};
