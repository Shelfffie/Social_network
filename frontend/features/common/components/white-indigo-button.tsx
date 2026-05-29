import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

interface WhiteButtonProps extends ComponentProps<"button"> {
  text: string;
}

export default function WhiteButton({ text, ...props }: WhiteButtonProps) {
  return (
    <Button className="bg-white w-30 text-black border-2 border-indigo-50 hover:bg-indigo-300 transition-all">
      {text}
    </Button>
  );
}
