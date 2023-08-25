'use client'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useEtherBalance = (provider, address, refreshTimestamp) => {
    const [balance, setBalance] = useState("0.00");

    useEffect(() => {
        if (provider && ethers.utils.isAddress(address)) {
            const fetchBalance = async () => {
                try {
                    const rawBalance = await provider.getBalance(address);
                    const formattedBalance = ethers.utils.formatEther(rawBalance); // Convertit Wei en Ether
                    setBalance(Math.floor(formattedBalance * 1000) / 1000);
                } catch (error) {
                    console.error("An error occurred while fetching the ether balance:", error);
                }
            };

            fetchBalance();
        }
    }, [provider, address, refreshTimestamp]);

    return balance;
};

export default useEtherBalance;
