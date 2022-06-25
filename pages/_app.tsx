import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "contexts/userContext";
import { Wagmi } from "components/Wagmi/Wagmi";
import { WagmiConfig } from "wagmi";
import { client } from "configs/wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import { SpotifyUser } from "components/SpotifyUser/SpotifyUser";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <SpotifyUser>
      <WagmiConfig client={client}>
        <Wagmi>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Wagmi>
      </WagmiConfig>
      </SpotifyUser>
    </Provider>
  );
}

export default MyApp;
