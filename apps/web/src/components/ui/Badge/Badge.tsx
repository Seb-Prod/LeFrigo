import clsx from "clsx";
import styles from "./Badge.module.css";

type BadgeColor = "default" | "success" | "warning" | "danger" | "info";

type Props = {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
};

export function Badge({ children, color = "default", className }: Props) {
  return (
    <span className={clsx(styles.badge, styles[color], className)}>
      {children}
    </span>
  );
}