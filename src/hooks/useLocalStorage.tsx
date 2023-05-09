import { useEffect, useState } from 'react';

export default function useLocalStorage(key: any, defaultValue: any) {
  console.log(key, defaultValue);

  console.log(typeof defaultValue);

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    console.log(jsonValue);
    if (jsonValue && jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    console.log(key, defaultValue);
    console.log(key, value);

    console.log(typeof defaultValue);
    console.log(typeof value);

    localStorage.setItem(key, JSON.stringify(defaultValue));
  }, [key, value]);

  return [value, setValue];
}
