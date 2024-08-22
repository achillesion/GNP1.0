import sass from './Container.module.scss';
import { FC, PropsWithChildren } from "react";

export const Container: FC<Required<PropsWithChildren>> = ({ children }) => {
  return <div className={sass.container}>{children}</div>
}
