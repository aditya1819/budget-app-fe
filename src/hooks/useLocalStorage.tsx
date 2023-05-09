import { useEffect, useState } from 'react';

export default function useLocalStorage(key: any, defaultValue: any) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue && jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }, [key, value]);

  return [value, setValue];
}
