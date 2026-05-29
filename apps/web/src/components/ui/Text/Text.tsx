import clsx from "clsx";
import styles from "./Text.module.css";

type Props = {
  as?: "p" | "span" | "label";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "muted" | "danger";
  children: React.ReactNode;
  className?: string;
};

export function Text({
  as: Tag = "p",
  size = "md",
  variant = "default",
  children,
  className,
}: Props) {
  return (
    <Tag
      className={clsx(styles.text, styles[size], styles[variant], className)}
    >
      {children}
    </Tag>
  );
}
