import styles from "./Toggle.module.css";

type Props = {
  onToggle: () => void;
  label: string;
  variant: "login" | "register";
  active:boolean
};

export function Toggle({ onToggle, label, variant,active }: Props) {
  return (
    <header
      className={`${styles.toggle} ${styles[variant]} ${active ? styles.active :""}`}
      onClick={onToggle}
    >
      {label}
    </header>
  );
}
