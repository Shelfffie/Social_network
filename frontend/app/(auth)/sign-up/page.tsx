import AuthForm from "@/features/auth/components/auth-form";

export default function SignUpPage() {
  return (
    <div className="h-full w-full">
      <AuthForm mode="signup" />
    </div>
  );
}
