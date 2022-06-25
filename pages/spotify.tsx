import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { serverRequest } from "configs/axios";

const Spotify: NextPage = () => {
  const router = useRouter();
  const { code, state } = router.query;
  useEffect(() => {
    const getAccessToken = async () => {
      const res = await serverRequest().get(
        `api/spotify/access-token?code=${code}&state=${state}`
      );
      console.log(res.data);
      const { access_token, refresh_token } = res.data;
      localStorage.setItem("spotify_access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    };
    if (code && state) {
      getAccessToken();
    }
  }, [code, state]);
  return <div>Spotify Page</div>;
};

export default Spotify;
