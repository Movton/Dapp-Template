'use client'
import { useState, useEffect } from 'react';

const useTokenPrice = (pairAddress, chain, refreshTimestamp) => {
    const baseURL = `https://api.dexscreener.com/latest/dex/pairs/${chain}`;
    const [priceUsd, setPriceUsd] = useState(0);

    useEffect(() => {
        if (pairAddress) {
            const fetchPrice = async () => {
                try {
                    const response = await fetch(`${baseURL}/${pairAddress}`);
                    const data = await response.json();
                    setPriceUsd(data.pair.priceUsd);
                } catch (error) {
                    console.error("An error occurred while fetching the token price:", error);
                }
            };

            fetchPrice();
        }
    }, [pairAddress, refreshTimestamp]);

    return priceUsd;
};

export default useTokenPrice;



