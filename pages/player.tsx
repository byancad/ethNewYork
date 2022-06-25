import type { NextPage } from "next";
import Script from "next/script";
import { SpotifyPlayer } from "components/SpotifyPlayer/SpotifyPlayer";

const Player: NextPage = () => {
  return (
    <div>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
      <div>Player</div>
      {typeof window !== undefined && <SpotifyPlayer />}
    </div>
  );
};

export default Player;
