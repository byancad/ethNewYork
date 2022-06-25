import type { NextPage } from "next";
import Script from "next/script";
import { SpotifyPlayer } from "components/SpotifyPlayer/SpotifyPlayer";
import { useEffect, useState } from "react";
import SetFlowRate from "components/Modals/SetFlowRate";
import ArtistEligible from "components/Modals/ArtistEligible";

const Player: NextPage = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <div>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
      {!isSSR && <SpotifyPlayer />}
    </div>
  );
};

export default Player;
