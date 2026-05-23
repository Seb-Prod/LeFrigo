import styles from "./AuthTab.module.css";

type Props = {
  active: boolean;
  onToggle: () => void;
  activeLabel: string;
  inactiveLabel: string;
};

export function AuthTab({
  active,
  onToggle,
  activeLabel,
  inactiveLabel,
}: Props) {
  return (
    <header
      className={`${active ? styles.activeToggle : styles.inactiveToggle}`}
      onClick={onToggle}
    >
      {active ? activeLabel : inactiveLabel}
    </header>
  );
}
