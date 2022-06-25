import { useEffect } from "react";
import { serverRequest } from "../../configs/axios";
import { getAccessToken } from "../../utils/localStorage";
import async from "../../pages/api/spotify/user";

export const SpotifyUser = (children: React.ReactNode) => {
  useEffect(() => {
    const getSpotifyData = async () => {
      const token = await getAccessToken();
      const res = await serverRequest().get("/api/spotify/user?token=" + token);
      console.log(res.data);
    };

    getSpotifyData();
  }, []);

  return <>{children}</>;
};
