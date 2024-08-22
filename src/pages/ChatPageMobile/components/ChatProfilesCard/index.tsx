import sass from "./ChatProfilesSection.module.scss";
import { FC, PropsWithChildren } from "react";
import { Divider } from "../../../../components";

type ChatProfilesSectionProps = {
  title: string;
  action?: JSX.Element;
  banner?: JSX.Element;
} & Required<PropsWithChildren>;

export const ChatProfilesSection: FC<ChatProfilesSectionProps> = ({
  children,
  title,
  banner,
  action,
}) => {
  return (
    <div className={sass.card}>
      <div className={sass.cardTop}>
        <p className={sass.title}>{title}</p>
        {action !== undefined && action}
        <div className={sass.divider_mini}>
          <Divider />
        </div>
        {banner}
      </div>
      {children}
    </div>
  );
};
