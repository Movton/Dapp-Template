
import { useState, useEffect } from 'react';

const useETHPrice = (refreshTimestamp) => {
    const baseURL = `https://api.dexscreener.com/latest/dex/pairs/ethereum/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`;
    const [priceUsd, setPriceUsd] = useState(0);

    useEffect(() => {
            const fetchPrice = async () => {
                try {
                    const response = await fetch(`${baseURL}`);
                    const data = await response.json();
                    setPriceUsd(data.pair.priceUsd);
                } catch (error) {
                    console.error("An error occurred while fetching the token price:", error);
                }
            };

            fetchPrice();
    }, [refreshTimestamp]);

    return priceUsd;
};

export default useETHPrice;



