"use client";

import { Avatar, Badge, Heading, Text } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";
import {
  FaCrown, FaShieldAlt, FaUser,
  FaCheckCircle, FaTimesCircle,
} from "react-icons/fa";
import styles from "./ProfileHero.module.css";

/** Config visuelle par rôle — icône + couleur + label affiché. */
const ROLE_CONFIG = {
  ADMIN:     { icon: <FaCrown />,     color: "warning" as const, label: "Admin" },
  MODERATOR: { icon: <FaShieldAlt />, color: "info" as const,    label: "Modérateur" },
  USER:      { icon: <FaUser />,      color: "default" as const, label: "Utilisateur" },
};

export function ProfileHero() {
  const { user } = useAuth();

  const role = ROLE_CONFIG[user?.role as keyof typeof ROLE_CONFIG] ?? ROLE_CONFIG.USER;
console.log(JSON.stringify(user?.role));
  return (
    <div className={styles.card}>
      <Avatar size="lg" username={user?.userName} />

      <Heading size="sm" align="center">{user?.userName}</Heading>
      <Text align="center">{user?.email}</Text>

      <div className={styles.badges}>
        <Badge color={role.color}>
          {role.icon} {role.label}
        </Badge>

        <Badge
          color={user?.emailVerified ? "success" : "danger"}
          
        >
          {user?.emailVerified ? <FaCheckCircle /> : <FaTimesCircle />}
          {user?.emailVerified ? "Email vérifié" : "Email non vérifié"}
        </Badge>
      </div>
    </div>
  );
}