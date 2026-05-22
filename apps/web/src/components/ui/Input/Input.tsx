import styles from "./Input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return <input className={`${styles.input} ${className ?? ""}`} {...props} />;
}