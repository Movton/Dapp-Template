"use client";
import "@/app/Styles/globals.css";
import localFont from "next/font/local";
import Header from "./Components/Header/header";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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

/* export const avalanche = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
}
 */

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const myFont = localFont({ src: "../public/fonts/Roboto/Roboto-Regular.ttf" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Template</title>
        <meta name="description" content="" />
      </head>
      <body className={myFont.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Header />
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
