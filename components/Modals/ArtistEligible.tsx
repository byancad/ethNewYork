import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  VStack,
} from "@chakra-ui/react";

const ArtistEligible = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* <Button
        _focus={{ boxShadow: "none" }}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        onClick={onOpen}
      >
        Notice
      </Button> */}
      <Modal
        isCentered
        isOpen={true}
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
          <ModalHeader>Artist Linked</ModalHeader>
          <ModalBody>
            Yooo! Good news, this artist has a wallet linked. This means you can
            start streaming them moneyz directly from your wallet to theres.
            Wanna to start streaming?
          </ModalBody>
          <ModalFooter mt={6}>
            <VStack width="100%" spacing="14px">
              <Button
                width="100%"
                height={16}
                _focus={{ boxShadow: "none" }}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                onClick={onOpen}
              >
                Hell yeah!
              </Button>
              <Button
                width="100%"
                height={16}
                _focus={{ boxShadow: "none" }}
                onClick={onOpen}
              >
                Maybe Later
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ArtistEligible;
