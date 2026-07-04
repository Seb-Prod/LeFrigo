import clsx from "clsx";
import styles from "./Badge.module.css";

type BadgeColor = "default" | "success" | "warning" | "danger" | "info" | "neutral";

type Props = {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "xl"
  color?: BadgeColor;
  className?: string;
};

export function Badge({ children, color = "default", className, size ="md" }: Props) {
  return (
    <span className={clsx(styles.badge, styles[color], className)}>
      {children}
    </span>
  );
}