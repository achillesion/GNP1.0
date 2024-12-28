import React from "react";

export const useChatScroll = <T>(
  dep: T
): React.MutableRefObject<HTMLDivElement | null> => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [dep]);
  return ref;
};
