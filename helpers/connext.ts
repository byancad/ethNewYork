import { create, NxtpSdkConfig } from "@connext/nxtp-sdk";
import { Providers } from "constants/superFluid";
import { ethers, Signer } from "ethers";

const getConfig = (address: string) => {
  const nxtpConfig: NxtpSdkConfig = {
    logLevel: "info",
    signerAddress: address,
    chains: {
      "1111": {
        providers: [Providers[4]],
        assets: [
          {
            name: "TEST",
            address: "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C",
          },
        ],
      },
      "2221": {
        providers: [
          "https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX",
        ],
        assets: [
          {
            name: "TEST",
            address: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F",
          },
        ],
      },
      "3331": {
        providers: [Providers[5]],
        assets: [
          {
            name: "TEST",
            address: "0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9",
          },
        ],
      },
    },
  };

  return nxtpConfig;
};

export const transferTokens = async (signer: Signer) => {
  const address = await signer.getAddress();
  const nxtpConfig = getConfig(address);
  const { nxtpSdkBase } = await create(nxtpConfig);

  const callParams = {
    to: "0xE75906b48ed2C33e06BF6673340e0FdF20AAbb82", // the address that should receive the funds
    callData: "0x", // empty calldata for a simple transfer
    originDomain: "1111", // send from Rinkeby
    destinationDomain: "3331", // to Goerli
    recovery: "0xE75906b48ed2C33e06BF6673340e0FdF20AAbb82", // fallback address to send funds to if execution fails on destination side
    callback: ethers.constants.AddressZero, // zero address because we don't expect a callback for a simple transfer
    callbackFee: "0", // relayers on testnet don't take a fee
    forceSlow: false, // option that allows users to take the Nomad slow path (~30 mins) instead of paying routers a 0.05% fee on their transaction
    receiveLocal: false, // option for users to receive the local Nomad-flavored asset instead of the adopted asset on the destination side
  };

  const xCallArgs = {
    params: callParams,
    transactingAssetId: "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C", // the Kovan Test Token
    amount: "1000000000000000000", // amount to send (1 TEST)
    relayerFee: "0", // relayers on testnet don't take a fee
  };

  const approveTxReq = await nxtpSdkBase.approveIfNeeded(
    xCallArgs.params.originDomain,
    xCallArgs.transactingAssetId,
    xCallArgs.amount
  );
  if (approveTxReq) {
    const approveTxReceipt = await signer.sendTransaction(approveTxReq);
    await approveTxReceipt.wait();

    const xcallTxReq = await nxtpSdkBase.xcall(xCallArgs);
    xcallTxReq.gasLimit = ethers.BigNumber.from("30000000");
    const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
    console.log(xcallTxReceipt); // so we can see the transaction hash
    await xcallTxReceipt.wait();
    console.log("success!");
  } else {
    console.log("no approvals");
  }
};
