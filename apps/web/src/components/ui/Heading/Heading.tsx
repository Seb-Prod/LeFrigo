import clsx from "clsx";
import styles from "./Heading.module.css";

type Props = {
  as?: "h2" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "muted";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  className?: string;
};

export function Heading({
  as: Tag = "h2",
  size = "md",
  variant = "default",
  align = "left",
  children,
  className,
}: Props) {
  return (
    <Tag
      className={clsx(
        styles.heading,
        styles[size],
        styles[variant],
        styles[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
