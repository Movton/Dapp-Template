import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useCheckAllowance = (
  address,
  tokenContract,
  spenderAddress,
  amount,
  decimals
) => {
  const [hasSufficientAllowance, setHasSufficientAllowance] = useState(false);

  useEffect(() => {
    const checkAllowance = async () => {
      try {
        if (!address || !tokenContract || !spenderAddress) return;

        const allowance = await tokenContract.allowance(
          address,
          spenderAddress
        );
        const formattedAllowance = ethers.utils.formatUnits(
          allowance,
          decimals
        );
        setHasSufficientAllowance(Number(amount) <= Number(formattedAllowance));
      } catch (error) {
        console.error("Error checking allowance", error);
      }
    };

    checkAllowance();

    // Rafraîchir la balance toutes les 10 secondes
    const refreshInterval = setInterval(checkAllowance, 10000);

    return () => clearInterval(refreshInterval); // Nettoyer l'intervalle lors du démontage du composant
  }, [address, tokenContract, spenderAddress, amount]);

  return hasSufficientAllowance;
};

export default useCheckAllowance;
