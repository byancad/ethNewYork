import useUserContext from "hooks/useUserContext";
import { useEffect, useState } from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useNetwork,
  useSigner
} from "wagmi";

export const Wagmi = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  const { connect, connectors, error, activeConnector } = useConnect();
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const { data: signer } = useSigner();
  const { setWagmiUser, wagmi } = useUserContext();
  console.log(wagmi);
  useEffect(() => {
    const wagmiData = {
      signer: signer,
      address: accountData?.address,
      chainID: activeChain?.id
    };
    setWagmiUser(wagmiData);
  }, [signer, accountData, activeChain]);
  return (
    <>
      {!isSSR && (
        <div>
          wagmi
          <div>
            {connectors.map(connector => {
              return (
                <button
                  onClick={() => {
                    connect(connector);
                  }}
                >
                  {connector.name}
                </button>
              );
            })}
          </div>
          <div>{accountData?.address}</div>
          <div>{activeChain?.id}</div>
        </div>
      )}
    </>
  );
};
