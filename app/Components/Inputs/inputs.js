import { useState } from 'react';
import styles from './inputs.module.css';
import { ethers } from 'ethers';
import { ApproveBtn, ContractFunctionBtn } from '../Btns/btn';

const TokenInput = ({
  tokenContract,
  functionName,
  spenderAddress,
  callArgs,
  balance,
  ticker,
  decimals,
  buttonText,
}) => {
  const [inputValue, setInputValue] = useState('');
  const sanitizedValue = inputValue.replace(',', '.');

  const formattedValue = ethers.utils.parseUnits(
    sanitizedValue || '0',
    decimals
  );

  const handleInputChange = (e) => {
    const regex = /^[0-9]*[.,]?[0-9]*$/;
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.balance}>
        <span className={styles.span}>Balance: </span>
        <span className={styles.balanceValue}>
          {balance} {ticker || ''}
        </span>
      </div>
      <div className={styles.input}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="0.0"
          value={sanitizedValue}
          onChange={handleInputChange}
        />
        <button className={styles.max} onClick={() => setInputValue(String(balance))}>
          MAX
        </button>
      </div>
      <div className={styles.btn}>
        <ApproveBtn
          tokenContract={tokenContract}
          spenderAddress={spenderAddress}
          amount={formattedValue}
        >
        {ticker || ''}
        </ApproveBtn>
        <ContractFunctionBtn
          contract={tokenContract}
          functionName={functionName}
          callArgs={[...callArgs, formattedValue]}
          options={{ gasLimit: 1000000 }}
        >
            {buttonText}
        </ContractFunctionBtn>
      </div>
    </div>
  );
};

export { TokenInput };



const NativeTokenInput = ({
  contract,
  functionName,
  callArgs,
  balance,
  ticker,
  buttonText,
}) => {
  const [inputValue, setInputValue] = useState('');
  const sanitizedValue = inputValue.replace(',', '.');
  
  const formattedValue = ethers.utils.parseEther(
    sanitizedValue || '0',
  );

  const handleInputChange = (e) => {
    const regex = /^[0-9]*[.,]?[0-9]*$/;
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.balance}>
        <span className={styles.span}>Balance: </span>
        <span className={styles.balanceValue}>
          {balance} {ticker || ''}
        </span>
      </div>
      <div className={styles.input}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="0.0"
          value={sanitizedValue}
          onChange={handleInputChange}
        />
        <button className={styles.max} onClick={() => setInputValue(String(balance))}>
          MAX
        </button>
      </div>
      <div className={styles.btn}>
        <ContractFunctionBtn
          contract={contract}
          functionName={functionName}
          callArgs={[...callArgs, formattedValue]}
          options={{ gasLimit: 1000000, value: sanitizedValue }}
        >
          {buttonText}
        </ContractFunctionBtn>
      </div>
    </div>
  );
};

export { NativeTokenInput };

