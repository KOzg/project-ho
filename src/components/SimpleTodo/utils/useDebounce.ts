import { useState, useEffect } from 'react';

export default function useDebounce(
  searchTerm?: string,
  delay?: number
): string | null {
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm) {
        setDebouncedValue(searchTerm);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [searchTerm, delay]);

  return debouncedValue;
}
