import { useEffect, useState } from "react";
// Using for: Search Input
export default function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 500);

    return () => clearTimeout(timer);
  }, []);
}
