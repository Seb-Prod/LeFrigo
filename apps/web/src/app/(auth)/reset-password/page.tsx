import { notFound } from "next/navigation";
import { ResetPassword } from "@/features/auth/components/ResetPassword";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  return <ResetPassword token={token} />;
}