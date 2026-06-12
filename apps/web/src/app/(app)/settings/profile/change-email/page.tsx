"use client";

import { FormCard } from "@/components/ui";
import { TbLockQuestion } from "react-icons/tb";

export default function ChangePasswordPage() {
  return (
    <FormCard
      title="Changer d'adresse e-mail"
      icon={<TbLockQuestion />}
    ></FormCard>
  );
}
