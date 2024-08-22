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
  return (
    <>
      <div className={sass.card}>
        <div className={sass.cardTop}>{banner}</div>
        {children}
      </div>
    </>
  );
};
