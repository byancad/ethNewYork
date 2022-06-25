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
  StackDivider,
} from "@chakra-ui/react";
import useUserContext from "hooks/useUserContext";
import { isClient } from "utils/ui";

const ConnectWeb3 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    wagmi: { connectors, connect },
  } = useUserContext();

  return (
    <>
      <Button
        _focus={{ boxShadow: "none" }}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        onClick={onOpen}
      >
        Connect
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
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
