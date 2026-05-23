import styles from "./Checkbox.module.css";

type Props = {
  label: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ label, className, ...props }: Props) {
  return (
    <label className={`${styles.checkbox} ${className ?? ""}`}>
      <input
        className={styles.input}
        type="checkbox"
        {...props}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}