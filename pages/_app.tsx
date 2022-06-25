import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'contexts/userContext'
import { Wagmi } from 'components/Wagmi/Wagmi'
import { WagmiConfig } from 'wagmi'
import { client } from 'configs/wagmi'

function MyApp({ Component, pageProps }: AppProps) {
  return (  
  <Provider>
    <WagmiConfig client={client}>
    <Wagmi/>
    <Component {...pageProps} />
    </WagmiConfig>
    
 </Provider>
 )

 
}

export default MyApp
