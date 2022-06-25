import { Button, Input } from "@chakra-ui/react";
import { Framework } from "@superfluid-finance/sdk-core";
import { customHttpProvider } from "configs/superfluid";
import { Signer } from "ethers";
import useUserContext from "hooks/useUserContext";
import { ChangeEvent, useState } from "react";

type FormData = {
  recipient: string;
};

const deleteFlow = async (recipient: string, signer: Signer) => {
  const signerAddress = await signer.getAddress();
  const sf = await Framework.create({
    chainId: 5,
    provider: customHttpProvider,
    customSubgraphQueriesEndpoint:
      "https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-goerli",
    resolverAddress: "0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E",
  });

  const ETHxContract = await sf.loadSuperToken("ETHx");
  const ETHx = ETHxContract.address;

  try {
    const deleteFlowOperation = sf.cfaV1.deleteFlow({
      sender: signerAddress,
      receiver: recipient,
      superToken: ETHx,
    });

    console.log("Deleting your stream...");

    const tx = await deleteFlowOperation.exec(signer);
    console.log(tx);

    console.log(
      `Congrats - you've just deleted your money stream!
       Network: Kovan
       Super Token: DAIx
       Sender: ${signerAddress}
       Receiver: ${recipient}
    `
    );
  } catch (error) {
    console.error(error);
  }
};

export const DeleteFlow = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormData>({
    recipient: "0x25a1735D2490F8f6a72874B8d1084E0745DC01f2",
  });

  const {
    wagmi: { signer },
  } = useUserContext();

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    const { recipient } = formValues;
    if (signer) {
      await deleteFlow(recipient, signer);
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
      <div>Delete Flow</div>
      <form onSubmit={handleOnSubmit}>
        <Input
          onChange={handleOnChange}
          value={formValues.recipient}
          name="recipient"
          placeholder="Enter your Ethereum address"
          size="md"
        />

        <Button mt={4} colorScheme="teal" isLoading={submitting} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};
