import clsx from "clsx";
import styles from "./Highlight.module.css";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "success";
};

export function Highlight({
  children,
  variant = "primary",
}: Props) {
  return (
    <span className={clsx(styles.highlight, styles[variant])}>
      {children}
    </span>
  );
}