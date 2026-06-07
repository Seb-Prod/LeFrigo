import { VerifyEmail } from "@/features/auth";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }
  return <VerifyEmail token={token}  />;
}
