import { Box, Container, Text } from "@chakra-ui/react";

export const WrongChain = () => {
  return (
    <Container centerContent>
      <Box
        padding="4"
        marginTop="100px"
        alignContent="center"
        fontWeight="semibold"
        as="h4"
      >
        <Text fontSize="3xl">
          You are connected to the wrong chain!
          <br />
          Switch to one of our supported networks to continue.
        </Text>
      </Box>
    </Container>
  );
};
