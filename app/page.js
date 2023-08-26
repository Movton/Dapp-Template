'use client'
import styles from '@/app/Styles/page.module.css'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { erc20ABI } from 'wagmi'

import useAccount from './Hooks/useAccount'
import useContract from './Hooks/useContract'
import useTokenBalance from './Hooks/useTokenBalance'
import useETHBalance from './Hooks/useETHBalance'
import useTokenPrice from './Hooks/useTokenPrice'
import useETHPrice from './Hooks/useETHPrice'
import useFDV from './Hooks/useFDV'
import useContractRead from './Hooks/useContractRead'
import useMultiplyAndFix from './Hooks/useMultiplyAndFix'

import { ApproveBtn, ConnectBtn, ContractFunctionBtn } from './Components/Btns/btn'
import { NativeTokenInput, TokenInput } from './Components/Inputs/inputs'

export default function Home() {


  // Used in the following hooks : useTokenBalance, useTokenPrice, useFDV, useApprove, useContractWrite, useContractRead
  const contractAddress = '0x912CE59144191C1204E64559FE8253a0e49E6548'
  // Used in the following hooks : useTokenPrice, useFDV
  const pairAddress = '0xcDa53B1F66614552F834cEeF361A8D12a0B8DaD8'
  // Used in the following hooks : useTokenBalance
  const decimals = 18;
  // Used in the following hooks : useApprove, useContractWrite
  const spenderAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
  // Used in the following hooks : useTokenPrice, useFDV
  const chain = 'arbitrum'
  // Used in the following hook : useContractWrite
  const amount = ethers.utils.parseUnits('0.1', 18);

  const ticker = 'ARB'



  // This is the hook that we use to create an instance of the provider, signer and address
  const { provider, signer, address } = useAccount();

  // This is the hook that we use to create an instance of the contract
  const tokenContract = useContract(contractAddress, erc20ABI, signer);




  // This is the state that manages the refresh of the data
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now());

  // These are the hooks that we use to read data from the contract, and fetch price from dexscreener
  const tokenBalance = useTokenBalance(tokenContract, address, decimals, refreshTimestamp);
  const ethBalance = useETHBalance(provider, address, refreshTimestamp);
  const tokenPrice = useTokenPrice(pairAddress, chain, refreshTimestamp);
  const ethPrice = useETHPrice(refreshTimestamp);
  const FDV = useFDV(pairAddress, chain, refreshTimestamp);

  // This is the hook that we use to multiply values and fix the number of decimals
  const tokenBalanceinUsd = useMultiplyAndFix(tokenBalance, tokenPrice, 2);
  const ethBalanceinUsd = useMultiplyAndFix(ethBalance, ethPrice, 2);
  
  // This useEffect will refresh the data every minute
  useEffect(() => {
    const dataRefreshInterval = setInterval(() => {
      setRefreshTimestamp(Date.now());
    }, 60000);  
    return () => clearInterval(dataRefreshInterval);
  }, []);





  // This is the hook that we use to read data from the contract
  const { callFunction, data, error, loading } = useContractRead(tokenContract);

 // This useEffect will call the desired function every minute
  useEffect(() => {
    callFunction('decimals');

    const interval = setInterval(() => {
      callFunction('decimals');
    }
    , 60000);
    return () => clearInterval(interval);

  }, [address]);


  return (
    <main className={styles.main}>
      <div className={styles.infos}>
        <p>Token Balance: {tokenBalance}</p>
        <p>Token Balance in USD: ${tokenBalanceinUsd}</p>
        <p>ETH Balance: {ethBalance} $ETH</p>
        <p>ETH Balance in USD: ${ethBalanceinUsd}</p>
        <p>Token Price: ${tokenPrice}</p>
        <p>ETH Price: ${ethPrice}</p>
        <p>FDV: ${FDV}</p>
        <p>Token Info: {data}</p>
      </div>
      <div className={styles.btns}>
        <ApproveBtn
          tokenContract={tokenContract}
          spenderAddress={spenderAddress}
        >
          ARB
        </ApproveBtn>

        <ContractFunctionBtn
          contract={tokenContract}
          functionName="transfer"
          callArgs={[address, amount]}
          options={{ gasLimit: 1000000 }}
        >
          Transfer 1 ARB to self
        </ContractFunctionBtn>
      </div>
      <div className={styles.inputs}>
        <TokenInput
          tokenContract={tokenContract}
          spenderAddress={spenderAddress}
          functionName="transfer"
          callArgs={[address]}
          balance={tokenBalance}
          ticker={ticker}
          decimals={decimals}
          buttonText={`Send ${ticker}`}
        />
        <NativeTokenInput
          contract={''}
          functionName="buyTokens"
          callArgs={[]}
          balance={ethBalance}
          ticker={'ETH'}
          decimals={18}
          buttonText={`Send ETH`}
        />
          
      </div>
    </main>
  );
}
