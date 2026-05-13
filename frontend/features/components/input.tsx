import { Input } from "@/components/ui/input";

export function InputBasic({ styles, text }: { styles: string; text: string }) {
  return (
    <Input
      placeholder={text}
      className={`h-11 rounded-full bg-white  focus-visible:border-indigo-300 focus-visible:ring-indigo-300! ${styles}`}
    />
  );
}
