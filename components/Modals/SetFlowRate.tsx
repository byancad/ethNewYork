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
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CreateFlow } from "components/Forms/CreateFlow";
import { SetFlowRateForm } from "components/Forms/SetFlowRate";
import useUserContext from "hooks/useUserContext";

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
        Set Flow
      </Button>
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
          <ModalHeader>Set Flow Rate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Sweet! You want to show your artist some love. Just gotta set a flow
            rate and you're good to go. Flow rate a limit on how much you want
            to spend per month supporting artists. Set a ceiling and start
            flowing.
          </ModalBody>
          <ModalBody>
            <SetFlowRateForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectWeb3;
