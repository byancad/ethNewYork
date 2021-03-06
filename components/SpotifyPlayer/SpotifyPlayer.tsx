import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Container,
  Image,
} from "@chakra-ui/react";
import ArtistEligible from "components/Modals/ArtistEligible";
import ConnectWallet from "components/Modals/ConnectWallet";
import SetFlowRate from "components/Modals/SetFlowRate";
import { TEMP_SPOTIFY_TOKEN } from "constants/spotify";
import { createNewFlow, deleteFlow } from "helpers/superfluid";
import useUserContext from "hooks/useUserContext";
import { useEffect, useRef, useState } from "react";
import { getArtistWallet, getListenerRate } from "services/db";
import { getAccessToken } from "utils/localStorage";
import React from "react";
import { Nav } from "components/Nav/Nav";
import { WrongChain } from "components/Notices/WrongChain";
import { Not8trac } from "components/Notices/Not8trac";
import { Signer } from "ethers";

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
  const [streaming, setStreaming] = useState<boolean>(false);
  const artistRef = useRef(null);
  const trackWindow = currentState?.track_window;

  // vars for modals
  const [validArtist, setValidArtist] = useState<boolean>(false);
  const [rateSet, setRateSet] = useState<boolean>(false);
  const [userDenied, setUserDenied] = useState<boolean>(false);
  const [wantsToStream, setWantsToStream] = useState<boolean>(false);
  const { wagmi } = useUserContext();
  const userAddress = wagmi?.address;

  console.log({ streaming });

  const showValidArtistModal = validArtist && !userDenied && !wantsToStream;

  const showConnectModal =
    validArtist && !userDenied && wantsToStream && !userAddress;

  const showSetFlowModal =
    validArtist && !userDenied && wantsToStream && userAddress && !rateSet;

  const showStartFlow =
    validArtist && !userDenied && wantsToStream && userAddress && rateSet;

  useEffect(() => {
    console.log({
      validArtist,
      userDenied,
      wantsToStream,
      userAddress,
      rateSet,
    });
  }, [validArtist, userDenied, wantsToStream, userAddress, rateSet]);

  useEffect(() => {
    const tempPause = async () => {
      await handleTogglePlay();
    };
    if (showValidArtistModal) {
      tempPause();
    }
  }, [showValidArtistModal]);

  useEffect(() => {
    const startFlow = async (id: string) => {
      const recipient = await getArtistWallet(id);
      const rate = await getListenerRate(userAddress);

      await createNewFlow(
        recipient,
        rate,
        wagmi?.signer,
        wagmi?.chainID,
        setStreaming
      );
    };
    if (showStartFlow) {
      const uriParts = artist.uri.split(":");
      startFlow(uriParts[2]);
    }
  }, [showStartFlow]);

  useEffect(() => {
    const checkIfRateIsSet = async (userAddress: string) => {
      const rate = await getListenerRate(userAddress);
      setRateSet(!!rate);
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

  const resetValues = () => {
    setValidArtist(false);
    setUserDenied(false);
    setWantsToStream(false);
  };

  useEffect(() => {
    const checkArtistLinked = async (id: string) => {
      const wallet = await getArtistWallet(id);
      setValidArtist(!!wallet);
    };

    const stopStream = async (
      currentArtist: any,
      newArtist: string,
      signer: Signer
    ) => {
      console.log({ currentArtist, newArtist, signer });
      const artistAddress = await getArtistWallet(currentArtist);
      await deleteFlow(artistAddress, signer, wagmi?.chainID, setStreaming);
      currentArtist = newArtist;
      await checkArtistLinked(newArtist);
    };

    if (artist) {
      const uriParts = artist.uri.split(":");
      const artistId = uriParts[2];
      if (artistId !== artistRef.current) {
        //artist changed
        resetValues();
        if (showStartFlow) {
          stopStream(artistRef.current, artistId, wagmi?.signer);
        } else {
          artistRef.current = artistId;
          checkArtistLinked(artistId);
        }
      }
    } else {
      resetValues();
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
    await window.playr.togglePlay();
  };

  const handleNext = async () => {
    await window.playr.nextTrack();
  };

  const handlePrevious = async () => {
    await window.playr.previousTrack();
  };

  if (!currentState) {
    return <Not8trac />;
  }
  const chainID = wagmi?.chainID;
  const supportedNetwork = [5, 4, 80001, 69, 100, 42];
  if (currentState && chainID && !supportedNetwork.includes(chainID)) {
    return <WrongChain />;
  }

  return (
    <>
      <div>
        <Nav />
        <Container centerContent marginTop="26">
          {streaming && (
            <Alert status="success" height="50px" mb={6}>
              <AlertIcon />
              <AlertDescription>
                Sick! Your currently streaming to this artists wallet
              </AlertDescription>
            </Alert>
          )}

          <Box alignItems="center" maxW="sm">
            <Image
              borderRadius="10px"
              src={trackWindow?.current_track?.album?.images[2]?.url}
            />
          </Box>
          <Box alignItems="center">
            <p>{trackWindow?.current_track.name}</p>
          </Box>
          <Box>
            <p>{trackWindow?.current_track.artists[0].name}</p>
          </Box>

          <Box display="flex" alignItems="center" marginTop="8">
            <Button
              onClick={handlePrevious}
              disabled={!playerLoaded}
              borderRadius="20px"
            >
              {`<`}
            </Button>
            <Button
              bgImage="/play_logo.png"
              variant="ghost"
              _hover={{ bg: "#ffffff00" }}
              onClick={handleTogglePlay}
              disabled={!playerLoaded}
            >
              <img src="/play_logo.png"></img>
            </Button>
            <Button
              onClick={handleNext}
              disabled={!playerLoaded}
              borderRadius="20px"
            >
              {`>`}
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

          {showSetFlowModal && (
            <SetFlowRate
              setRateSet={setRateSet}
              chainID={wagmi?.chainID}
              userAddress={userAddress}
            />
          )}
        </Container>
      </div>
    </>
  );
};
