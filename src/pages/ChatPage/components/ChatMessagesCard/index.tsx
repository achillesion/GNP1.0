import sass from "./ChatMessagesCard.module.scss";
import { FC, PropsWithChildren } from "react";
import { Divider } from "../../../../components";

type ChatMessagesCardProps = {
  title: JSX.Element;
  action?: JSX.Element;
} & Required<PropsWithChildren>;

export const ChatMessagesCard: FC<ChatMessagesCardProps> = ({
  children,
  title,
  action,
}) => {
  return (
    <>
      <div className={sass.card}>
        <div className={sass.cardTop}>
          <p className={sass.title}>{title}</p>
          {action !== undefined && action}
        </div>
        <div className={sass.divider_mini}>
          <Divider />
        </div>
        {children}
      </div>
    </>
  );
};
