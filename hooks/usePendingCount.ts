import { useEffect, useState } from 'react';
import { getPendingCount } from '../services/applicationStore';

export function usePendingCount(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    const load = () => {
      void getPendingCount().then((n) => {
        if (active) setCount(n);
      });
    };
    load();
    const id = window.setInterval(load, 30_000);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, []);

  return count;
}
