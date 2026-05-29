import clsx from "clsx";
import styles from "./Heading.module.css";

type Props = {
  as?: "h2" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "muted";
  children: React.ReactNode;
  className?: string;
};

export function Heading({
  as: Tag = "h2",
  size = "md",
  variant = "default",
  children,
  className,
}: Props) {
  return (
    <Tag
      className={clsx(styles.heading, styles[size], styles[variant], className)}
    >
      {children}
    </Tag>
  );
}
