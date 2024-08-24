import { useAppState, useChatScroll } from "../../../../hooks";
import sass from "./ChatMessagesSection.module.scss";
import { FC, PropsWithChildren } from "react";

type ChatMessagesSectionProps = {
  title?: string;
  banner?: JSX.Element;
  action?: JSX.Element;
} & Required<PropsWithChildren>;

export const ChatMessagesSection: FC<ChatMessagesSectionProps> = ({
  children,
  title,
  banner,
  action,
}) => {
  const { messages } = useAppState().chat;
  const chatScrollRef = useChatScroll(messages);

  return (
    <>
      <div ref={chatScrollRef} className={sass.card}>
        <div ref={chatScrollRef} className={sass.cardTop}>
          {banner}
        </div>
        {children}
      </div>
    </>
  );
};
