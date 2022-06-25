import { Button } from "@chakra-ui/react";
import { serverRequest } from "configs/axios";

export const SpotifyConnectButton = () => {
  const handleOnClick = () => {
    serverRequest().get("api/spotify/user-auth");
  };
  return <Button onClick={handleOnClick}>Connect Spotify</Button>;
};
