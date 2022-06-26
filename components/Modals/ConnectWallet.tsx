import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
  Text,
  Image,
  StackDivider
} from "@chakra-ui/react";
import useUserContext from "hooks/useUserContext";
import { useEffect } from "react";
import { isClient } from "utils/ui";

type ConnectWeb3Props = {
  showButton?: boolean;
};
const ConnectWeb3 = ({ showButton }: ConnectWeb3Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (!showButton) {
      onOpen();
    }
  }, []);

  const {
    wagmi: { connectors, connect }
  } = useUserContext();

  return (
    <>
      {showButton && (
        <Button
          _focus={{ boxShadow: "none" }}
          bgGradient="linear(to-r, #52BD13, #026e47)"
          onClick={onOpen}
        >
          Connect
        </Button>
      )}

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          padding={"0px"}
          margin={"100px"}
          paddingLeft={"0px"}
          paddingRight={"0px"}
        >
          <ModalBody>
            <VStack spacing="8px">
              {connectors?.map((connector: any) => (
                <Button
                  disabled={!connector.ready && isClient()}
                  key={connector.id}
                  w="108%"
                  height="100px"
                  onClick={() => connect(connector)}
                  _focus={{ boxShadow: "none" }}
                  justifyContent="start"
                >
                  <VStack divider={<StackDivider borderColor="gray.200" />}>
                    <Image
                      height="40px"
                      width="40px"
                      marginLeft={"10px"}
                      src={`${connector.name.replace(/\s+/g, "")}.png`}
                      alt="Dan Abramov"
                    />
                  </VStack>
                  <Text fontSize={"30px"} padding={"5px"} marginLeft={"10px"}>
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                  </Text>
                </Button>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectWeb3;
