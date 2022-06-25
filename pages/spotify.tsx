import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { serverRequest } from "configs/axios";
import { setRefreshToken, setAccessToken } from "utils/localStorage";

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

      setAccessToken(access_token);
      setRefreshToken(refresh_token);

      router.push("/player");
    };
    if (code && state) {
      getAccessToken();
    }
  }, [code, state]);
  return <div>Spotify Page</div>;
};

export default Spotify;
