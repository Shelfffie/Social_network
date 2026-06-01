"use client";

import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver(
  options?: IntersectionObserverInit
) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const current = targetRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return { targetRef, isVisible };
}
