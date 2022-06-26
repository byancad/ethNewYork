import { Framework } from "@superfluid-finance/sdk-core";
import { customHttpProvider } from "configs/superfluid";
import { Signer } from "ethers";

export const createNewFlow = async (
  recipient: string,
  flowRate: string,
  signer: Signer
) => {
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
    const createFlowOperation = sf.cfaV1.createFlow({
      flowRate: flowRate,
      receiver: recipient,
      superToken: ETHx,
    });
    console.log("Creating your stream...");
    const result = await createFlowOperation.exec(signer);
    console.log({ result });
    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: Goerli
    Super Token: ETHx
    Sender: ${signerAddress}
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
