import { useState, useEffect } from 'react';

/**
 *
 * @param {number} value - La valeur à formater.
 * @return {string} La valeur formatée avec K, M, B, etc.
 */
function useFormatNumber(value) {
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    let newValue = value;
    if (value ) {
    if (value >= 1e9) {
      newValue = (value / 1e9).toFixed(1) + 'B';
    } else if (value >= 1e6) {
      newValue = (value / 1e6).toFixed(1) + 'M';
    } else if (value >= 1e3) {
      newValue = (value / 1e3).toFixed(1) + 'K';
    } else {
      newValue = value.toString();
    }
  }

    setFormattedValue(newValue);
  }, [value]);

  return formattedValue;
}

export default useFormatNumber;
