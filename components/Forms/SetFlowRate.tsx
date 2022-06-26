import { Button, Center, Input } from "@chakra-ui/react";
import { Signer } from "ethers";
import useUserContext from "hooks/useUserContext";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { getListenerRate, setListenerRate } from "services/db";

type FormData = {
  flowRate: string | undefined;
};

type SetFlowRateProps = {
  userAddress: string;
  suggested: string;
  setRateSet: Dispatch<SetStateAction<boolean>>;
};

export const SetFlowRateForm = ({
  userAddress,
  suggested,
  setRateSet,
}: SetFlowRateProps) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormData>({
    flowRate: undefined,
  });

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    const { flowRate } = formValues;
    if (userAddress && flowRate) {
      await setListenerRate(userAddress, flowRate);
      const rate = await getListenerRate(userAddress);
      setRateSet(!!rate);
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
          placeholder={`Enter a flowRate in wei/second (i.e ${suggested}`}
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
