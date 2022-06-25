import React, { FC, useEffect, useState } from "react";
import { Session } from "./Session";

export const Wagmi: FC<WrapperProps> = ({ children }) => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <>
      {isSSR && <Session />}
      {children}
    </>
  );
};
