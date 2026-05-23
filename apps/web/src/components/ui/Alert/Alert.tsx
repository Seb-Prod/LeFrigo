import styles from "./Alert.module.css";

type Props = {
  children: React.ReactNode;
  variant?: "error" | "success" | "warning" | "info";
};

export function Alert({
  children,
  variant = "info",
}: Props) {
  return (
    <div
      role="alert"
      className={`${styles.alert} ${styles[variant]}`}
    >
      {children}
    </div>
  );
}