import { Button } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import { AuthForm } from "@/features/auth";
import { useState } from "react";

export function Settings() {
  const { user, loading, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <>
      <div>
        <Button
          variant={user ? "danger" : "primary"}
          appearance="solid"
          onClick={handleAuthAction}
        >
          {user ? "Se déconnecter" : "Connexion"}
        </Button>
      </div>
      <AuthForm open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
