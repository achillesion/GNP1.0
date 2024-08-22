import sass from "./ChatProfilesCard.module.scss";
import { FC, PropsWithChildren } from "react";
import { Divider } from "../../../../components";

type ChatProfilesCardProps = {
  title: string;
  action?: JSX.Element;
} & Required<PropsWithChildren>;

export const ChatProfilesCard: FC<ChatProfilesCardProps> = ({
  children,
  title,
  action,
}) => {
  return (
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
  );
};
