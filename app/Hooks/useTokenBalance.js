'use client'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useTokenBalance = (contract, address, decimals) => {
    
    const [balance, setBalance] = useState("0.00");

    useEffect(() => {
        if (contract && ethers.utils.isAddress(address)) {
            const fetchBalance = async () => {
                try {
                    const rawBalance = await contract.balanceOf(address); 
                    const formattedBalance = ethers.utils.formatUnits(rawBalance, decimals);
                    setBalance(parseFloat(formattedBalance).toFixed(2)); 
                } catch (error) {
                    console.error("An error occurred while fetching the token balance:", error);
                }
            };

            fetchBalance();
        }
    }, [contract, address]);

    return balance;
};

export default useTokenBalance;
