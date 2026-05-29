"use client";

import { Avatar, Badge, Card, Heading, Text } from "@/components/ui";
import { DeviceType } from "@/contexts/device.context";
import { SafeUser } from "@lefrigo/shared";
import { FiMonitor, FiSmartphone, FiTablet } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import styles from "./UserProfileCard.module.css";

type Props = {
  user: SafeUser;
  device: DeviceType;
};

const deviceIcon: Record<DeviceType, React.ReactNode> = {
  desktop: <FiMonitor size={16} />,
  mobile: <FiSmartphone size={16} />,
  tablet: <FiTablet size={16} />,
};

export function UserProfileCard({ user, device }: Props) {
  return (
    <Card variant="accent" className={styles.card}>
      <Avatar username={user.userName} size="lg" />

      <div className={styles.user}>
        <div className={styles.header}>
          <Heading>{user.userName}</Heading>
          <Text>
            {deviceIcon[device]}
            {device}
          </Text>
        </div>

        <Text variant="muted" size="sm">{user.email}</Text>

        <div className={styles.badges}>
          <Badge variant="info">{user.role}</Badge>
          <Badge variant={user.status === "ACTIVE" ? "success" : "danger"}>
            {user.status}
          </Badge>
          {user.emailVerified && (
            <Badge variant="success">
              <MdOutlineVerified />
              Email vérifié
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
