"use client";

import { Surface } from "@/components/ui";
import { Profile } from "@/features/settings";



export default function ProfilePage() {
  return (
    <Surface title="Profile" backButton>
      <Profile/>
    </Surface>
  );
}
