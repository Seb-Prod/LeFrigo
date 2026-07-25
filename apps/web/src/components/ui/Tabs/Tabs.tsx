import styles from "./Tabs.module.css";

type Props<T extends string> = {
  tabs: { key: T; label: string }[];
  active: T;
  onChange: (key: T) => void;
};

export function Tabs<T extends string>({ tabs, active, onChange }: Props<T>) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          role="tab"
          data-active={key === active}
          aria-selected={key === active}
          onClick={() => onChange(key)}
          className={styles.tab}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
