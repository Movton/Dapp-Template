'use client'
import '@/app/Styles/globals.css'
import localFont from 'next/font/local'
import Header from './Components/Header/header';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';



// ADD A CUSTOM THEME HERE, then pass it to RainbowKitProvider

/* import merge from 'lodash.merge';
import {
  RainbowKitProvider,
  darkTheme,
  Theme,
} from '@rainbow-me/rainbowkit';



const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#07296d',
  },
});
 */





  // ADD A CUSTOM CHAIN HERE, then pass it to configureChains in the array
 
/* export const shibarium = {
  id: 109,
  name: 'Shibarium',
  network: 'shibarium',
  nativeCurrency: {
    decimals: 18,
    name: 'Shibarium',
    symbol: 'BONE',
  },
  rpcUrls: {
    public: { http: ['https://www.shibrpc.com'] },
    default: { http: ['https://www.shibrpc.com'] },
  },
  blockExplorers: {
    etherscan: { name: 'ShibariumScan', url: 'https://shibariumscan.io' },
    default: { name: 'ShibariumScan', url: 'https://shibariumscan.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
}
 */





import {
  arbitrum,
  mainnet
} from 'wagmi/chains';



const { chains, publicClient } = configureChains(
  [arbitrum],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'My_Project_ID',
  chains
});



const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})





const myFont = localFont({ src: '../public/fonts/Roboto/Roboto-Regular.ttf' })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Template</title>
        <meta name="description" content="" />
      </head>
      <body className={myFont.className}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Header />
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
        </body>
    </html>
  )
}
