"use client";
import { useState } from "react";
import { ethers } from "ethers";

const useContractRead = (contract, decimals) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatError = (err) => {
    if (!err || typeof err !== "object" || !err.code)
      return "An unknown error occurred";
    return `Error: ${err.code}`;
  };

  const isValidAddress = (address) => {
    try {
      ethers.utils.getAddress(address);
      return true;
    } catch (e) {
      return false;
    }
  };

  const processResult = (result) => {
    // BigNumber
    if (ethers.BigNumber.isBigNumber(result)) {
      return ethers.utils.formatUnits(result, decimals);
    }
    // Chaînes de caractères (incluant les adresses)
    if (typeof result === "string") {
      if (isValidAddress(result)) {
        return ethers.utils.getAddress(result); // normalize address
      }
      return result;
    }
    // Objets
    if (typeof result === "object" && !Array.isArray(result)) {
      return result; // For now, we return objects as is. Might need custom logic.
    }
    // Tableaux
    if (Array.isArray(result)) {
      return result.map((item) => processResult(item));
    }
    return result;
  };

  const callFunction = async (functionName, ...args) => {
    if (!contract) return;

    const func = contract[functionName];
    if (!func || typeof func !== "function") {
      setError(`Function ${functionName} does not exist on the contract.`);
      return;
    }

    try {
      setLoading(true);
      const result = await func(...args);
      setData(processResult(result));
    } catch (err) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  return { callFunction, data, error, loading };
};

export default useContractRead;
