import { useState, useEffect } from 'react';

const useFDV = (pairAddress, chain) => {
    const baseURL = `https://api.dexscreener.com/latest/dex/pairs/${chain}`;
    const [FDV, setFDV] = useState("0");

    useEffect(() => {
        if (pairAddress) {
            const fetchFDV = async () => {
                try {
                    const response = await fetch(`${baseURL}/${pairAddress}`);
                    const data = await response.json();
                    const formattedFDV = formatFDV(data.pair.fdv);
                    setFDV(formattedFDV);
                } catch (error) {
                    console.error("An error occurred while fetching the FDV:", error);
                }
            };

            fetchFDV();
        }
    }, [pairAddress]);

    const formatFDV = (value) => {
        let finalValue;
        if (value >= 1e9) {
            finalValue = (value / 1e9).toFixed(2) + "B";
        } else if (value >= 1e6) {
            finalValue = (value / 1e6).toFixed(2) + "M";
        } else if (value >= 1e3) {
            finalValue = (value / 1e3).toFixed(2) + "K";
        } else {
            finalValue = value.toFixed(2);
        }
        return finalValue;
    };

    return FDV;
};

export default useFDV;
