import styles from "./Select.module.css";

type Props =
  React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select(props: Props) {
  return (
    <select
      {...props}
      className={styles.select}
    />
  );
}