import { Button } from "@chakra-ui/react";
import useUserContext from "hooks/useUserContext";
import React, { useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSigner,
  useSignMessage,
} from "wagmi";

export const Session = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const { data: signer } = useSigner();
  const { setWagmiUser, clearWagmiUser } = useUserContext();
  console.log("addy", accountData?.address);

  console.log({ signer });

  const handleDisconnect = () => {
    clearWagmiUser();
    disconnect();
  };

  useEffect(() => {
    const updateContext = async () => {
      const signerAddress = await signer?.getAddress();
      const wagmiData = {
        signer,
        address: signerAddress,
        chainID: activeChain?.id,
        connect,
        connectors,
        disconnect: handleDisconnect,
      };
      setWagmiUser(wagmiData);
    };
    updateContext();
  }, [signer, accountData, activeChain, connect, connectors, disconnect]);
  return <></>;
};
