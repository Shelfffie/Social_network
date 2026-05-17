import AuthForm from "@/features/auth/components/auth-form";

export default function SignInPage() {
  return (
    <div className="h-full w-full">
      <AuthForm mode="login" />
    </div>
  );
}
