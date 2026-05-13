import PostComponent from "@/features/components/posts/post";

export default function Home() {
  return (
    <div className="flex flex-col">
      <PostComponent />
      <h1>MAIN PAGE</h1>
    </div>
  );
}
