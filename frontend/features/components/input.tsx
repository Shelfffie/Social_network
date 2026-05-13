import { Input } from "@/components/ui/input";

export function InputBasic({
  styles,
  placeholder,
}: {
  styles: string;
  placeholder: string;
}) {
  return (
    <Input
      placeholder={placeholder}
      className={`h-11 rounded-full bg-white  focus-visible:border-indigo-300 focus-visible:ring-indigo-300! ${styles}`}
    />
  );
}
