import { useState, useEffect } from 'react';

/**
 *
 * @param {number} num1 - Le premier nombre à multiplier.
 * @param {number} num2 - Le deuxième nombre à multiplier.
 * @param {number} decimalPlaces - Le nombre de chiffres à fixer après la virgule.
 * @return {number} Le résultat de la multiplication, fixé au nombre de chiffres spécifié après la virgule.
 */
function useMultiplyAndFix(num1, num2, decimalPlaces) {
  const [result, setResult] = useState(0);

  useEffect(() => {
    const multiplied = num1 * num2;
    const fixed = parseFloat(multiplied.toFixed(decimalPlaces));
    setResult(fixed);
  }, [num1, num2, decimalPlaces]);

  return result;
}

export default useMultiplyAndFix;
