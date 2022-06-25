import { Button, Input, Stack } from "@chakra-ui/react";
import { Framework } from "@superfluid-finance/sdk-core";
import { Signer } from "ethers";
import { ChangeEvent, useState } from "react";
import { customHttpProvider } from "configs/superfluid";

type FormData = {
  recipient: string;
  flowRate: string;
};

const createNewFlow = async (
  recipient: string,
  flowRate: string,
  signer: Signer
) => {
  const address = await signer.getAddress();
  const sf = await Framework.create({
    chainId: 5,
    provider: customHttpProvider,
    customSubgraphQueriesEndpoint:
      "https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-xdai",
    resolverAddress: "0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E",
  });

  const ETHxContract = await sf.loadSuperToken("ETHx");
  const ETHx = ETHxContract.address;
  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      flowRate: flowRate,
      receiver: recipient,
      superToken: ETHx,
    });
    console.log("Creating your stream...");
    const result = await createFlowOperation.exec(signer);
    console.log(result);
    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: Goerli
    Super Token: ETHx
    Sender: ${address}
    Receiver: ${recipient},
    FlowRate: ${flowRate}
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
};

export const CreateFlow = (signer: Signer) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormData>({
    recipient: "",
    flowRate: "",
  });
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    const { recipient, flowRate } = formValues;
    if (signer) {
      await createNewFlow(recipient, flowRate, signer);
    } else {
      console.log("sign in foo !");
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <>
      <div>
        Create
        <form onSubmit={handleOnSubmit}>
          <Stack spacing={3}>
            <Input
              onChange={handleOnChange}
              value={formValues.recipient}
              name="recipient"
              placeholder="Enter your Ethereum address"
              size="md"
            />
            <Input
              onChange={handleOnChange}
              value={formValues.flowRate}
              name="flowRate"
              placeholder="Enter a flowRate in wei/second"
              size="md"
            />
          </Stack>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={submitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};
