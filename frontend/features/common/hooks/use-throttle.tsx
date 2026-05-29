"use client";

import { useCallback, useRef } from "react";

export default function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const lastCall = useRef(0);

  return useCallback(
    (...args: Parameters<T>): void => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
}
