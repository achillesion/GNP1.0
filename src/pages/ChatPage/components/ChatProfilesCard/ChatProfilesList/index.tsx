import sass from "./ChatProfileList.module.scss";
import { FC } from "react";
import { Avatar, List } from "antd";
import { FormatterDate } from "../../../../../utils";
import { DoubleTick } from "../../../../../icons/DoubleTick";
import { useAppDispatch, useAppState } from "../../../../../hooks";
import { setSelectedProfile } from "../../../../../redux/store";

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

export const ChatProfilesList: FC = () => {
  const dispatch = useAppDispatch();
  const { chatProfiles } = useAppState().chat;

  return (
    <div className={sass.listWrapper}>
      <List
        itemLayout="horizontal"
        dataSource={chatProfiles}
        renderItem={(item, index) => (
          <div style={{ cursor: "pointer" }}>
            <List.Item onClick={() => dispatch(setSelectedProfile(item))}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={50}
                    src={
                      item.user.avatar
                        ? `${REACT_APP_IMAGE_BASIC_PATH}${item.user.avatar}`
                        : "https://gravatar.com/avatar?s=300&d=mp"
                    }
                  />
                }
                title={
                  <div className={sass.itemRow}>
                    <span className={sass.title}>{item.user.name}</span>
                    <span>
                      {item.lastMessageDate
                        ? FormatterDate.formatDateForChatProfile(
                            item.lastMessageDate
                          )
                        : ""}
                    </span>
                  </div>
                }
                description={
                  <div className={sass.itemRow}>
                    <span>{item.lastMessage}</span>
                    <DoubleTick />
                  </div>
                }
              />
            </List.Item>
          </div>
        )}
      />
    </div>
  );
};
