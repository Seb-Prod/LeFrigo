import styles from "./Alert.module.css";

type Props = {
  children: React.ReactNode;
  color?: "error" | "success" | "warning" | "info";
};

export function Alert({
  children,
  color = "info",
}: Props) {
  return (
    <div
      role="alert"
      className={`${styles.alert} ${styles[color]}`}
    >
      {children}
    </div>
  );
}