"use client"

import { FormCard,Button } from "@/components/ui";
import { TbClockExclamation } from "react-icons/tb";
import Link from "next/link";

export default function SessionExpiredPage() {
  return (
    <FormCard
      icon={<TbClockExclamation />}
      title="Session expirée"
      description="Votre session a expiré ou a été révoquée. Veuillez vous reconnecter."
    >
      <Button>
        <Link href="/login">Se reconnecter</Link>
      </Button>
    </FormCard>
  );
}