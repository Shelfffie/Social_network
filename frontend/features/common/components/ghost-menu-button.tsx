import { Button } from "@/components/ui/button";

export default function ButtonGhostMenu({ text }: { text: string }) {
  return (
    <Button
      variant="ghost"
      className="w-full h-13 text-xl p-0 hover:bg-indigo-300 rounded-none"
    >
      {text}
    </Button>
  );
}
