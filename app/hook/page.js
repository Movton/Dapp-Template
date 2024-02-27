"use client";
import styles from "@/app/Styles/hooks.module.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { erc20Abi } from "viem";

import useAccount from "../Hooks/useAccount";
import useContract from "../Hooks/useContract";
import useTokenBalance from "../Hooks/useTokenBalance";
import useCheckAllowance from "../Hooks/useCheckAllowance";
import useETHBalance from "../Hooks/useETHBalance";
import useTokenPrice from "../Hooks/useTokenPrice";
import useETHPrice from "../Hooks/useETHPrice";
import useFDV from "../Hooks/useFDV";
import useContractRead from "../Hooks/useContractRead";
import useMultiplyAndFix from "../Hooks/useMultiplyAndFix";

import {
  ApproveAndExecuteBtn,
  ApproveBtn,
  ContractFunctionBtn,
} from "../Components/Btns/btn";
import { NativeTokenInput, TokenInput } from "../Components/Inputs/inputs";

export default function Hooks() {
  // Used in the following hooks: useTokenBalance, useTokenPrice, useFDV, useApprove, useContractWrite, useContractRead
  const contractAddress = "0x912ce59144191c1204e64559fe8253a0e49e6548";
  // Used in the following hooks: useTokenPrice, useFDV
  const pairAddress = "0xC6F780497A95e246EB9449f5e4770916DCd6396A";
  // Used in the following hooks: useTokenBalance
  const decimals = 18;
  // Used in the following hooks: useApprove, useContractWrite
  const spenderAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  // Used in the following hooks: useTokenPrice, useFDV
  const chain = "arbitrum";

  const amount = "1";
  const formattedAmount = ethers.utils.formatUnits(amount, 18);

  const ticker = "ARB";

  // This is the hook that we use to create an instance of the provider, signer and address
  const { provider, signer, address } = useAccount();

  // This is the hook that we use to create an instance of the contract
  const tokenContract = useContract(contractAddress, erc20Abi, signer);

  // This is the state that manages the refresh of the datas
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now());

  // These are the hooks that we use to read data from the contract, and fetch price from dexscreener
  const tokenBalance = useTokenBalance(
    tokenContract,
    address,
    decimals,
    refreshTimestamp
  );
  const hasSufficientAllowance = useCheckAllowance(
    address,
    tokenContract,
    spenderAddress,
    amount,
    decimals
  );

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
    }, 10000); // refresh data every 10 seconds
    return () => clearInterval(dataRefreshInterval);
  }, []);

  // This is the hook that we use to read data from the contract
  const { callFunction, data, error, loading } = useContractRead(tokenContract);

  // This useEffect will call the desired function every minute
  useEffect(() => {
    callFunction("decimals");

    const interval = setInterval(() => {
      callFunction("decimals");
    }, 10000);
    return () => clearInterval(interval);
  }, [address]);

  return (
    <main className={styles.main}>
      <h1>Movton Custom Hooks</h1>
      <div className={styles.infos}>
        <h2>Fetch Token Infos:</h2>
        <div className={styles.info}>
          <h3>Token Balance:</h3>
          <p>{tokenBalance}</p>
        </div>
        <div className={styles.info}>
          <h3>Token Balance in USD:</h3>
          <p>${tokenBalanceinUsd}</p>
        </div>
        <div className={styles.info}>
          <h3>Token Price:</h3>
          <p>${tokenPrice}</p>
        </div>
        <div className={styles.info}>
          <h3>ETH Balance:</h3>
          <p>{ethBalance} $ETH</p>
        </div>
        <div className={styles.info}>
          <h3>ETH Balance in USD:</h3>
          <p>${ethBalanceinUsd}</p>
        </div>
        <div className={styles.info}>
          <h3>ETH Price:</h3>
          <p>${ethPrice}</p>
        </div>
        <div className={styles.info}>
          <h3>FDV:</h3>
          <p>${FDV}</p>
        </div>
        <div className={styles.info}>
          <h3>Token Info:</h3>
          <p>{data}</p>
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <h2>Custom Buttons:</h2>
        <div className={styles.btns}>
          <div className={styles.btn}>
            <h3>Approve Button: </h3>
            <p>Easily approve spending for any token, to any contract.</p>
            <ApproveBtn
              tokenContract={tokenContract}
              spenderAddress={spenderAddress}
            >
              ARB
            </ApproveBtn>
          </div>
          <div className={styles.btn}>
            <h3>Contract Function Button: </h3>
            <p>Easily call any function of any contract.</p>
            <ContractFunctionBtn
              contract={tokenContract}
              functionName="transfer"
              callArgs={[address, formattedAmount]}
              options={{ gasLimit: 1000000 }}
            >
              Transfer 1 ARB to self
            </ContractFunctionBtn>
          </div>
          <div className={styles.btn}>
            <h3>Approve And Execute Button:</h3>
            <p>Easily approve and execute a function of any contract.</p>
            <ApproveAndExecuteBtn
              address={address}
              tokenContract={tokenContract}
              spenderAddress={spenderAddress}
              contract={tokenContract}
              functionName="transfer"
              callArgs={[address, formattedAmount]}
              options={{ gasLimit: 1000000 }}
              amount={formattedAmount}
              hasSufficientAllowance={hasSufficientAllowance}
            >
              Approve and Transfer 1 ARB to self
            </ApproveAndExecuteBtn>
          </div>
        </div>
      </div>
      <div className={styles.inputsContainer}>
        <h2>Custom Inputs:</h2>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <p>Easily customize the input to send any token to any contract:</p>

            <TokenInput
              address={address}
              tokenContract={tokenContract}
              spenderAddress={spenderAddress}
              functionName="transfer"
              callArgs={[address]}
              balance={tokenBalance}
              ticker={ticker}
              decimals={decimals}
              buttonText={`Send ${ticker}`}
            />
          </div>
          <div className={styles.input}>
            <p>
              Easily customize the input to send any native token to any
              contract:
            </p>

            <NativeTokenInput
              contract={""}
              functionName="buyTokens"
              callArgs={[]}
              balance={ethBalance}
              ticker={"ETH"}
              buttonText={`Send ETH`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
