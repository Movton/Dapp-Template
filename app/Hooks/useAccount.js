'use client'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useAccount = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (window.ethereum) {
            const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
            const signerInstance = providerInstance.getSigner();
            setProvider(providerInstance);
            setSigner(signerInstance);
            
            signerInstance.getAddress().then(resAddress => {
                setAddress(resAddress);
            });
        }
    }, []);

    return { provider, signer, address };
};

export default useAccount;
