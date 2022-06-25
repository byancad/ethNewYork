import { FC, useEffect } from "react";
import { serverRequest } from "../../configs/axios";
import { getAccessToken } from "../../utils/localStorage";
import useUserContext from "hooks/useUserContext";

export const SpotifyUser: FC<WrapperProps> = ({ children }) => {
  const { setSpotifyUser } = useUserContext();
  useEffect(() => {
    const getSpotifyData = async () => {
      const token = await getAccessToken();
      const res = await serverRequest().get("/api/spotify/user?token=" + token);
      setSpotifyUser(res.data);
    };
    getSpotifyData();
  }, []);

  return <>{children}</>;
};
