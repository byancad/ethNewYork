import type { NextPage } from "next";
import Script from "next/script";
import { SpotifyPlayer } from "components/SpotifyPlayer/SpotifyPlayer";
import { isClient } from "utils/ui";

const Player: NextPage = () => {
  return (
    <div>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
      {isClient() && <SpotifyPlayer />}
    </div>
  );
};

export default Player;
