import { Button, Center, Input } from "@chakra-ui/react";
import { Signer } from "ethers";
import useUserContext from "hooks/useUserContext";
import { ChangeEvent, useState } from "react";

type FormData = {
  flowRate: number | undefined;
};

export const SetFlowRateForm = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormData>({
    flowRate: undefined,
  });

  const {
    wagmi: { signer },
  } = useUserContext();

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    const { flowRate } = formValues;
    if (signer) {
      //   await saveFlowRate(flowRate, signer);
    } else {
      console.log("sign in foo !");
    }
    setSubmitting(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <Input
          mt={10}
          onChange={handleOnChange}
          value={formValues.flowRate}
          name="flowRate"
          placeholder="Enter a flowRate in wei/second"
          size="md"
        />

        <Center>
          <Button
            mt={8}
            mb={8}
            colorScheme="teal"
            isLoading={submitting}
            type="submit"
          >
            Save
          </Button>
        </Center>
      </form>
    </>
  );
};
