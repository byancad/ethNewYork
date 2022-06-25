import useUserContext from "hooks/useUserContext";
import React, { useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSigner,
} from "wagmi";

export const Session = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const { data: signer } = useSigner();
  const { setWagmiUser, clearWagmiUser } = useUserContext();
  console.log({ signer });

  const handleDisconnect = () => {
    clearWagmiUser();
    disconnect();
  };

  useEffect(() => {
    const wagmiData = {
      signer,
      address: accountData?.address,
      chainID: activeChain?.id,
      connect,
      connectors,
      disconnect: handleDisconnect,
    };
    setWagmiUser(wagmiData);
  }, [signer, accountData, activeChain, connect, connectors, disconnect]);
  return <></>;
};
