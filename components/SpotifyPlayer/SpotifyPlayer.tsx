import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAccessToken } from "utils/localStorage";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: Function;
    Spotify: any;
    playr: any;
  }
}
export const SpotifyPlayer = () => {
  const [playerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [handlePlay, setHandlePlay] = useState<any>();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();
      console.log(accessToken);
      setToken(accessToken);
    })();
  }, []);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spotify Web Player",
        getOAuthToken: (cb: any) => {
          const spotifyToken =
            "BQBeyJmn7qhNSO3LZF7XFVWNQMDe2Cp0yPQOcUUor5CVPJr2ctEIsR_IvlCQ3rr3Hrfck7J0g0oNuf1Qz23tlHuPyXTYAnShIYZjMi9De2Rqss-LntLmrIrY8E0k6kc8pyTHg0un1K5gsYYbWWL3CR9OOgqChXi-duV54zoqkolGVJ1eoGamPzLwqpPSP--IHHWf";
          cb(spotifyToken);
        },
      });
      initializePlayer(player);
    };
  }, [token]);

  const initializePlayer = (player: any) => {
    player.addListener("initialization_error", (res: any) =>
      console.error(res.message)
    );
    player.addListener("authentication_error", (res: any) =>
      console.error(res.message)
    );
    player.addListener("account_error", (res: any) =>
      console.error(res.message)
    );
    player.addListener("playback_error", (res: any) =>
      console.error(res.message)
    );
    player.addListener("player_state_changed", (state: any) => {
      console.log(state);
      const {
        position,
        duration,
        track_window: { current_track },
      } = state || { track_window: {} };

      console.log({ state });

      console.log("Currently Playing", current_track);
      console.log("Position in Song", position);
      console.log("Duration of Song", duration);
    });

    player.addListener("ready", (p: any) =>
      console.log("Ready with Device ID", p.device_id)
    );
    player.addListener("not_ready", (p: any) =>
      console.log("Device ID has gone offline", p.device_id)
    );
    player.connect().then((success: any) => {
      if (success) setPlayerLoaded(true);
    });

    player.setName("8trac").then(() => {
      console.log("Player name updated!");
    });

    player.pause().then(() => {
      console.log("Paused!");
    });

    player.resume().then(() => {
      console.log("Resumed!");
    });

    // let el = document.getElementById("togglePlay");
    // if (el) {
    //   el.onclick = () => {
    //     console.log("toggling playback");
    //     player.togglePlay();
    //   };
    // }
    // setHandlePlay(player.togglePlay);

    window.playr = player;
  };

  const handleClick = async () => {
    console.log("doing stuff");
    window.playr.togglePlay();
  };

  return (
    <>
      <div>
        <div>Player</div>
        {token && <div>Player Ready: {playerLoaded.toString()}</div>}

        <Button onClick={handleClick} disabled={!playerLoaded}>
          Play
        </Button>
      </div>
    </>
  );
};
