import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SetFlowRateForm } from "components/Forms/SetFlowRate";
import { useEffect } from "react";

type SetFlowRateProps = {
  userAddress: string;
};

const SetFlowRate = ({ userAddress }: SetFlowRateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => onOpen(), []);

  return (
    <>
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
            <SetFlowRateForm userAddress={userAddress} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SetFlowRate;
