import { useState } from 'react';
import { ethers } from 'ethers';

const useContractWrite = (contract, functionName, options = {}) => {
    const [loading, setLoading] = useState(false);
    const [transactionHash, setTransactionHash] = useState(null);
    const [error, setError] = useState(null);


    const formatHash = (hash) => {
        if (!hash) return '';
        return `${hash.substring(0, 5)}...${hash.substring(hash.length - 5)}`;
      };
    
      const formatError = (err) => {
        if (!err || typeof err !== 'object' || !err.code) return 'An unknown error occurred';
        return `Error: ${err.code}`;
      };
    

    const callFunction = async (...args) => {
        if (!contract) return;

        const func = contract[functionName];
        if (!func || typeof func !== 'function') {
            setError(`Function ${functionName} does not exist on the contract.`);
            return;
        }

        setError(null);
        setTransactionHash(null);

        try {
            setLoading(true);

            // Construction des overrides (si existants)
            const overrides = {};
            if (options.gasLimit) overrides.gasLimit = options.gasLimit;
            if (options.value) overrides.value = ethers.utils.parseEther(options.value); // Conversion d'Ether à Wei

            const tx = await func(...args, overrides);

            const receipt = await tx.wait();

            setTransactionHash(formatHash(receipt.transactionHash));
        } catch (err) {
            setError(formatError(err));
        } finally {
            setLoading(false);
        }
    };

    return { callFunction, loading, transactionHash, error };
};

export default useContractWrite;
