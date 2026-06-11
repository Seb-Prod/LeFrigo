import { Button, MenuGroup, MenuItem, Surface } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { AuthForm } from "@/features/auth";
import { useState } from "react";
import { ProfileCard } from "../ProfileCard";
import { GuestCard } from "../GuestCard";
import { TbDevicesQuestion } from "react-icons/tb";

export function Settings() {
  const { user, loading, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Surface>
        {user ? <ProfileCard /> : <GuestCard />}
        <MenuGroup title="mes appreils">
          <MenuItem
            label="Aucun appareil connecté"
            description="Connecte-toi pour voir tes sessions"
            icon={<TbDevicesQuestion />}
            locked
          />
        </MenuGroup>
        <MenuGroup title="foyer">
          <MenuItem label="Membres" icon={<TbDevicesQuestion />} locked />
          <MenuItem
            label="Inviter quelqu'un"
            icon={<TbDevicesQuestion />}
            locked
          />
          <MenuItem
            label="Gérer le foyer"
            icon={<TbDevicesQuestion />}
            locked
          />
        </MenuGroup>
        <MenuGroup title="recette">
          <MenuItem
            label="Partager une recette"
            icon={<TbDevicesQuestion />}
            locked
          />
          <MenuItem
            label="Mes recettes partagées"
            icon={<TbDevicesQuestion />}
            locked
          />
          <MenuItem
            label="Ma liste de recettes"
            icon={<TbDevicesQuestion />}
            locked
          />
        </MenuGroup>
        <MenuGroup title="apparence">
          <span>d</span>
        </MenuGroup>
        {user && (
          <MenuGroup title="compte">
            <Button variant="danger">Se déconnecter</Button>
          </MenuGroup>
        )}
      </Surface>
      <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
