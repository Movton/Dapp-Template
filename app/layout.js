'use client'
import '@/app/Styles/globals.css'


import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  mainnet
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient } = configureChains(
  [arbitrum],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'cf7b1910e6ca99317ec768f586c56f02',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

import localFont from 'next/font/local'

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
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
        </body>
    </html>
  )
}
