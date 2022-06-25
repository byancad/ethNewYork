import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "contexts/userContext";
import { Wagmi } from "components/Wagmi/Wagmi";
import { WagmiConfig } from "wagmi";
import { client } from "configs/wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import { SpotifyUser } from "components/SpotifyUser/SpotifyUser";
import theme from "styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider>
        <SpotifyUser>
          <WagmiConfig client={client}>
            <Wagmi>
              <Component {...pageProps} />
            </Wagmi>
          </WagmiConfig>
        </SpotifyUser>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
