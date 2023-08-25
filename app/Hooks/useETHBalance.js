// useEtherBalance.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useEtherBalance = (provider, address) => {
    const [balance, setBalance] = useState("0.00");

    useEffect(() => {
        if (provider && ethers.utils.isAddress(address)) {
            const fetchBalance = async () => {
                try {
                    const rawBalance = await provider.getBalance(address);
                    const formattedBalance = ethers.utils.formatEther(rawBalance); // Convertit Wei en Ether
                    setBalance(parseFloat(formattedBalance).toFixed(2)); // Fixe la balance à deux décimales
                } catch (error) {
                    console.error("An error occurred while fetching the ether balance:", error);
                }
            };

            fetchBalance();
        }
    }, [provider, address]);

    return balance;
};

export default useEtherBalance;
