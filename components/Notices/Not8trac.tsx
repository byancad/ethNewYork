import { Box, Container } from "@chakra-ui/react";

export const Not8trac = () => {
  return (
    <div>
      <Container centerContent>
        <Box>
          {" "}
          You are connected to Spotify but you have not chosen 8trac as your
          playback device.
          <br />
          Change now in Spotify to start streaming.{" "}
        </Box>
      </Container>
    </div>
  );
};
