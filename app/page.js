'use client'
import Image from 'next/image'
import styles from '@/app/Styles/page.module.css'

import { erc20ABI } from 'wagmi'
import useAccount from './Hooks/useAccount'
import useContract from './Hooks/useContract'
import useTokenBalance from './Hooks/useTokenBalance'
import useETHBalance from './Hooks/useETHBalance'
import useTokenPrice from './Hooks/useTokenPrice'
import useFDV from './Hooks/useFDV'
import { ApproveBtn, ConnectBtn } from './Components/Btns/btn'

export default function Home() {

  const contractAddress = '0x912ce59144191c1204e64559fe8253a0e49e6548'
  const pairAddress = '0xC6F780497A95e246EB9449f5e4770916DCd6396A'
  const decimals = 18;
  const spenderAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
  const chain = 'arbitrum'


  const { provider, signer, address } = useAccount();
  const tokenContract = useContract(contractAddress, erc20ABI, signer);
  const tokenBalance = useTokenBalance(tokenContract, address, decimals);
  const ethBalance = useETHBalance(provider, address);
  const tokenPrice = useTokenPrice(pairAddress, chain);
  const FDV = useFDV(pairAddress, chain);




  return (
    <main className={styles.main}>
     <ConnectBtn />
     <div className={styles.infos}>
      <p>Token Balance: {tokenBalance}</p>
      <p>ETH Balance: {ethBalance}</p>
      <p>Token Price: {tokenPrice}</p>
      <p>FDV: {FDV}</p>
     </div>
     <ApproveBtn tokenContract={tokenContract} spenderAddress={spenderAddress}>
        ARB
      </ApproveBtn>
    </main>
  )
}
