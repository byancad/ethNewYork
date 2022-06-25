import { Box, Button, Container, Image } from "@chakra-ui/react";
import { TEMP_SPOTIFY_TOKEN } from "constants/spotify";
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
  const [currentState, setCurrentState] = useState<any>();
  const [playerError, setPlayerError] = useState<any>();
  console.log(currentState);
  const trackWindow = currentState?.track_window;
  console.log(trackWindow);

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();
      setToken(accessToken);
    })();
  }, []);

  useEffect(() => {
    if (token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "8trac Web Player",
          getOAuthToken: (cb: any) => {
            cb(TEMP_SPOTIFY_TOKEN);
          },
          volume: 0.5
        });
        player.setName("8trac");
        player.addListener("player_state_changed", handleStateChange);
        player.addListener("initialization_error", handleError);
        player.addListener("authentication_error", handleError);
        player.addListener("account_error", handleError);
        player.addListener("playback_error", handleError);
        player.addListener("ready", (p: any) =>
          console.log("Ready with Device ID", p.device_id)
        );
        player.addListener("not_ready", (p: any) =>
          console.log("Device ID has gone offline", p.device_id)
        );
        player.connect().then((success: any) => {
          if (success) setPlayerLoaded(true);
        });
        player.pause().then(() => {
          console.log("Paused!");
        });
        player.resume().then(() => {
          console.log("Resumed!");
        });
        window.playr = player;
      };
    } else {
      console.log("Invalid spotify Tokin");
    }
  }, [token]);

  const handleError = (res: any) => {
    setPlayerError(res.message);
  };

  const handleStateChange = (state: any) => {
    console.log(state);
    const {
      position,
      duration,
      track_window: { current_track }
    } = state || { track_window: {} };

    setCurrentState({ ...state });
  };

  const handleTogglePlay = async () => {
    console.log("toggling play");
    await window.playr.togglePlay();
  };

  const handleNext = async () => {
    console.log("next track");
    await window.playr.nextTrack();
  };

  const handlePrevious = async () => {
    console.log("previous track");
    await window.playr.previousTrack();
  };

  return (
    <>
      <div>
        <Container centerContent marginTop="40">
          <Box alignItems="center" maxW="sm">
            <Image src={trackWindow?.current_track.album.images[2].url} />
          </Box>
          {trackWindow?.current_track.name}
          <br />
          {trackWindow?.current_track.artists[0].name}

          {}
          <Box display="flex" alignItems="center" marginTop="10">
            <Button onClick={handlePrevious} disabled={!playerLoaded}>
              {`<<`}
            </Button>
            <Button onClick={handleTogglePlay} disabled={!playerLoaded}>
              Play
            </Button>
            <Button onClick={handleNext} disabled={!playerLoaded}>
              {`>>`}
            </Button>
          </Box>
        </Container>
      </div>
    </>
  );
};
