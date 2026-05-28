import styles from "./Badge.module.css";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

type Props = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className = "" }: Props) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}