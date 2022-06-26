import { Box, Container, Text } from "@chakra-ui/react";

export const Not8trac = () => {
  return (
    <div>
      <Container centerContent>
        <Box
          padding="4"
          marginTop="100px"
          alignContent="center"
          fontWeight="semibold"
          as="h4"
        >
          <Text fontSize="3xl">
            You are connected to Spotify but have not chosen 8trac as your
            playback device.
            <br />
            Change your device in Spotify to start streaming!
          </Text>
        </Box>
      </Container>
    </div>
  );
};
