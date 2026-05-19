import styles from "./Button.module.css";

type Props =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(
  props: Props
) {
  return (
    <button
      className={styles.button}
      {...props}
    />
  );
}