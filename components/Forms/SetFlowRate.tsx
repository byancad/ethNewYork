import { Button, Center, Input } from "@chakra-ui/react";
import { Signer } from "ethers";
import useUserContext from "hooks/useUserContext";
import { ChangeEvent, useState } from "react";

type FormData = {
  flowRate: number | undefined;
};

type SetFlowRateProps = {
  userAddress: string;
};

export const SetFlowRateForm = ({ userAddress }: SetFlowRateProps) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormData>({
    flowRate: undefined
  });

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    const { flowRate } = formValues;
    if (userAddress) {
      //   await saveFlowRate(flowRate, userAddress);
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
            bgGradient="linear(to-r, #52BD13, #026e47)"
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
