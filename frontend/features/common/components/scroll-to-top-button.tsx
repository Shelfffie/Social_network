"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import useThrottle from "../hooks/use-throttle";
import { Button } from "@/components/ui/button";

export default function ScrollToTopButton({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = useThrottle(() => {
    if (scrollRef.current) {
      setIsVisible(scrollRef.current.scrollTop > 500);
    }
  }, 200);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener("scroll", handleScroll, true);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, scrollRef]);

  return (
    isVisible && (
      <Button
        className="fixed z-2000 bottom-10 right-75 rounded-full text-black bg-indigo-50 w-10 h-10 hover:bg-indigo-300 transition-all"
        onClick={() => {
          scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="m-auto" />
      </Button>
    )
  );
}
