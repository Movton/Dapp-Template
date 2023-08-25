import { useState } from 'react';
import { ethers } from 'ethers';

const useApprove = (tokenContract, spenderAddress) => {
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatHash = (hash) => {
    if (!hash) return '';
    return `${hash.substring(0, 5)}...${hash.substring(hash.length - 5)}`;
  };

  const formatError = (err) => {
    if (!err || typeof err !== 'object' || !err.code) return 'An unknown error occurred';
    return `Error: ${err.code}`;
  };

  const approve = async (amount) => {
    if (!tokenContract || !spenderAddress) return;

    setError(null);
    setTransactionHash(null);

    try {
      setLoading(true);
      const MAX_UINT_VALUE = ethers.constants.MaxUint256;
      const tx = await tokenContract.approve(spenderAddress, amount || MAX_UINT_VALUE);
      const receipt = await tx.wait();
      setTransactionHash(formatHash(receipt.transactionHash));
    } catch (err) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  return { approve, transactionHash, error, loading };
};

export default useApprove;
