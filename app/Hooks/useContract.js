'use client'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useContract = (contractAddress, abi, signer) => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (ethers.utils.isAddress(contractAddress) && abi && signer) {
            const contractInstance = new ethers.Contract(contractAddress, abi, signer);
            setContract(contractInstance);
        }
    }, [contractAddress, abi, signer]);

    return contract;
};

export default useContract;
