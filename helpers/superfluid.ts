import { Framework } from "@superfluid-finance/sdk-core";
import { customHttpProvider } from "configs/superfluid";
import {
  Networks,
  Providers,
  Resolvers,
  Subgraphs,
  Tokens,
} from "constants/superFluid";
import { Signer } from "ethers";
import { Dispatch, SetStateAction } from "react";

export const createNewFlow = async (
  recipient: string,
  flowRate: string,
  signer: Signer,
  chainId: number,
  setStreaming: Dispatch<SetStateAction<boolean>>
) => {
  const signerAddress = await signer.getAddress();
  const sf = await Framework.create({
    chainId: chainId,
    provider: Providers[chainId],
    customSubgraphQueriesEndpoint: Subgraphs[chainId],
    resolverAddress: Resolvers[chainId],
  });

  const tokenContract = await sf.loadSuperToken(Tokens[chainId]);
  const tokenAddress = tokenContract.address;
  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      flowRate: flowRate,
      receiver: recipient,
      superToken: tokenAddress,
    });
    console.log("Creating your stream...");
    const tx = await createFlowOperation.exec(signer);
    await tx.wait(1);
    setStreaming(true);

    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${signerAddress}
    Network: ${Networks[chainId]}
    Super Token: ${Tokens[chainId]}
    Sender: ${signerAddress}
    Receiver: ${recipient}
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

export const deleteFlow = async (
  recipient: string,
  signer: Signer,
  chainId: number,
  setStreaming: Dispatch<SetStateAction<boolean>>
) => {
  const signerAddress = await signer.getAddress();
  const sf = await Framework.create({
    chainId: chainId,
    provider: Providers[chainId],
    customSubgraphQueriesEndpoint: Subgraphs[chainId],
    resolverAddress: Resolvers[chainId],
  });

  const tokenContract = await sf.loadSuperToken(Tokens[chainId]);
  const tokenAddress = tokenContract.address;

  try {
    const deleteFlowOperation = sf.cfaV1.deleteFlow({
      sender: signerAddress,
      receiver: recipient,
      superToken: tokenAddress,
    });

    console.log("Deleting your stream...");

    const tx = await deleteFlowOperation.exec(signer);
    await tx.wait(1);
    setStreaming(false);

    console.log(
      `Congrats - you've just deleted your money stream!
       Network: ${Networks[chainId]}
       Super Token: ${Tokens[chainId]}
       Sender: ${signerAddress}
       Receiver: ${recipient}
    `
    );
  } catch (error) {
    console.error(error);
  }
};
