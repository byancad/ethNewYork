import { Box, Button, Container, Image } from "@chakra-ui/react";
import ArtistEligible from "components/Modals/ArtistEligible";
import ConnectWallet from "components/Modals/ConnectWallet";
import SetFlowRate from "components/Modals/SetFlowRate";
import { TEMP_SPOTIFY_TOKEN } from "constants/spotify";
import useUserContext from "hooks/useUserContext";
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
  const [currentState, setCurrentState] = useState<any>();
  const [playerError, setPlayerError] = useState<any>();
  const trackWindow = currentState?.track_window;

  // vars for modals
  const [validArtist, setValidArtist] = useState<boolean>(false);
  const [rateSet, setRateSet] = useState<boolean>(false);
  const [userDenied, setUserDenied] = useState<boolean>(false);
  const [wantsToStream, setWantsToStream] = useState<boolean>(false);
  const { wagmi } = useUserContext();
  const userAddress = wagmi?.address;
  console.log(wagmi);

  const showValidArtistModal = validArtist && !userDenied && !wantsToStream;

  const showConnectModal =
    validArtist && !userDenied && wantsToStream && !userAddress;

  const showSetFlowModal =
    validArtist && !userDenied && wantsToStream && userAddress && !rateSet;

  const showStartFlow =
    validArtist && !userDenied && wantsToStream && userAddress && rateSet;

  useEffect(() => {
    const checkIfRateIsSet = async (userAddress: string) => {
      // const res = await getIsRateSet(userAddress);
      // setRateSet(res);
    };

    checkIfRateIsSet(userAddress);
  }, [userAddress]);

  const artist = currentState?.track_window?.current_track?.artists[0];

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();
      setToken(accessToken);
    })();
  }, []);

  useEffect(() => {
    const checkArtistLinked = async (id: string) => {
      const isValid = true;
      setValidArtist(isValid);
    };
    if (artist) {
      const uriParts = artist.uri.split(":");
      // setUserDenied(false);
      checkArtistLinked(uriParts[2]);
    } else {
      setValidArtist(false);
      setUserDenied(false);
    }
  }, [artist]);

  useEffect(() => {
    if (token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "8trac Web Player",
          getOAuthToken: (cb: any) => {
            cb(TEMP_SPOTIFY_TOKEN);
          },
          volume: 0.5,
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
    console.log("Oh no! Error during playback: ", res.message);
    setPlayerError(res.message);
  };

  const handleStateChange = (state: any) => {
    setCurrentState({ ...state });
  };

  const handleTogglePlay = async () => {
    console.log("toggling play");
    if (showStartFlow) {
      console.log("gonna start flow");
      // await the create flow transaction modal
    }

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
          {showValidArtistModal && (
            <ArtistEligible
              setUserDenied={setUserDenied}
              handleTogglePlay={handleTogglePlay}
              setWantsToStream={setWantsToStream}
            />
          )}

          {showConnectModal && <ConnectWallet />}

          {showSetFlowModal && <SetFlowRate userAddress={userAddress} />}
        </Container>
      </div>
    </>
  );
};
