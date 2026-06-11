import { Button, MenuGroup, Surface } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { AuthForm } from "@/features/auth";
import { useState } from "react";
import { ProfileCard } from "../ProfileCard";
import { GuestCard } from "../GuestCard";

export function Settings() {
  const { user, loading, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Surface>
        {user ? <ProfileCard/> : <GuestCard/>}
        <MenuGroup title="mes appreils">
          <span>d</span>
        </MenuGroup>
        <MenuGroup title="foyer">
          <span>d</span>
        </MenuGroup>
        <MenuGroup title="recette">
          <span>d</span>
        </MenuGroup>
        <MenuGroup title="apparence">
          <span>d</span>
        </MenuGroup>
        <MenuGroup title="compte">
          <Button variant="danger">Se déconnecter</Button>
        </MenuGroup>
      </Surface>
      <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
