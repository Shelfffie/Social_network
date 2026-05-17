import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";

interface InputBasicProps extends ComponentProps<"input"> {
  styles?: string;
  placeholder: string;
}

export function InputBasic({ styles, placeholder, ...props }: InputBasicProps) {
  return (
    <Input
      placeholder={placeholder}
      className={`h-11 rounded-full bg-white  focus-visible:border-indigo-300 !focus-visible:ring-indigo-300 ${styles}`}
      {...props}
    />
  );
}
